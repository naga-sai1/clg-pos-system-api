const connectToDatabase = require("../misc/db");

const checkout = async (req, res) => {
  let transaction;
  try {
    const { Order, OrderItem, Product, User, Customer, sequelizeDatabase } =
      await connectToDatabase();

    // Start transaction
    transaction = await sequelizeDatabase.transaction();

    // Validate request body
    if (
      !req.body.cart ||
      !Array.isArray(req.body.cart) ||
      req.body.cart.length === 0
    ) {
      return res.status(400).json({
        message: "Order items are required",
      });
    }

    // check user id is exists
    const user = await User.findOne({
      where: { user_id: req.body.user_id },
      transaction,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize customer_id outside the if block
    let customer_id = null;

    // Create order first to get the order ID
    const order = await Order.create(
      {
        customer_id: null, 
        user_id: req.body.user_id,
        order_date: new Date(),
        total_amount: req.body.total,
        payment_method: req.body.paymentMethod || "Cash",
        notes: req.body.notes || null,
      },
      { transaction }
    );

    // Now handle customer details if provided
    if (req.body.customerDetails && 
        (req.body.customerDetails.customerName || 
         req.body.customerDetails.customerMobile || 
         req.body.customerDetails.doctorName)) {
      let customer_name = req.body.customerDetails.customerName || null;
      let customer_phone = req.body.customerDetails.customerMobile || null;
      let customer_email = req.body.customerDetails.customerEmail || null;
      let doctor_name = req.body.customerDetails.doctorName || null;
      let discount = req.body.discount_percentage || null;

      // check if customer already exists
      const existingCustomer = await Customer.findOne({
        where: {
          customer_phone: customer_phone,
        },
        transaction,
      });

      if (existingCustomer) {
        customer_id = existingCustomer.customers_id;
        await existingCustomer.update(
          {
            bill_number: `ACE-${order.orders_id}`
          },
          { transaction }
        );
      } else {
        // create new customer
        const newCustomer = await Customer.create(
          {
            customer_name: customer_name,
            customer_phone: customer_phone,
            customer_email: customer_email,
            doctor_name: doctor_name,
            discount: discount,
          },
          { transaction }
        );
        customer_id = newCustomer.customers_id;
      }
    }

    // Update order with customer_id (will be null if no customer details were provided)
    await order.update({ customer_id }, { transaction });

    // Rest of the existing checkout logic remains the same
    // Create order items and update product quantities
    const orderItems = [];
    for (const item of req.body.cart) {
      const product = await Product.findOne({
        where: { barcode: item.barcode },
        transaction,
        lock: true,
      });

      if (!product) {
        throw new Error(`Product with barcode ${item.barcode} not found`);
      }

      if (product.quantity < item.quantity) {
        throw new Error(
          `Insufficient quantity for product ${product.products_name}`
        );
      }

      await product.update(
        {
          quantity: product.quantity - item.quantity,
        },
        { transaction }
      );

      const orderItem = await OrderItem.create(
        {
          order_id: order.orders_id,
          product_id: product.products_id,
          quantity: item.quantity,
          price: parseFloat(item.price),
        },
        { transaction }
      );

      orderItems.push({
        ...orderItem.toJSON(),
        product_name: product.products_name,
        barcode: product.barcode,
      });
    }

    const subTotal = parseFloat(req.body.subTotal || req.body.total);
    const tax = parseFloat(req.body.tax || 0);

    await transaction.commit();

    res.status(201).json({
      message: "Order created successfully",
      data: {
        invoice_number: `ACE-${order.orders_id}`,
        order_date: order.order_date.toLocaleDateString('en-IN'),
        order_time: order.order_date.toLocaleString('en-IN', { 
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true 
        })
      }
    });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }
    console.error("Error in checkout:", error);
    res.status(500).json({
      message: error.message,
      error: "Failed to process checkout",
    });
  }
};

// get all orders
const getAllOrders = async (req, res) => {
  try {
    const { Order, OrderItem, Product, User, Customer, Brand, Unit } = await connectToDatabase();

    const orders = await Order.findAll({
      include: [
        { 
          model: OrderItem,
          attributes: ["product_id", "quantity", "price"],
          include: [{ 
            model: Product,
            attributes: [
              "products_name", 
              "barcode", 
              "products_description",
              "batch_number",
              "manufacturing_date",
              "expiry_date",
              "gst",
              "brand_id",
              "unit_id",
              "shedule"
            ],
            include: [
              {

                model: Brand,
                attributes: ["brand"]
              },
              {
                model: Unit,
                attributes: ["unit"]
              }
            ]
          }]
        },
        { 
          model: Customer,
          attributes: ["customer_name", "customer_phone", "doctor_name", "discount"]
        },
        { 
          model: User,
          attributes: ["username", "user_id"]
        }
      ],
      attributes: [
        'orders_id',
        'order_date',
        'total_amount',
        'payment_method',
        'notes'
      ]
    });

    // Transform the response
    const transformedOrders = orders.map(order => {
      // Ensure order_date is a valid Date object
      const orderDate = new Date(order.order_date);
      
      const cart = order.order_items.map(item => {
        const gst = parseFloat(item.product.gst || 0);
        return {
          barcode: item.product.barcode,
          name: item.product.products_name,
          description: item.product.products_description || "",
          price: parseFloat(item.price),
          quantity: item.quantity,
          batch_number: item.product.batch_number,
          manufacturing_date: item.product.manufacturing_date ? new Date(item.product.manufacturing_date).toISOString().split('T')[0] : null,
          expiry_date: item.product.expiry_date ? new Date(item.product.expiry_date).toISOString().split('T')[0] : null,
          brand: item.product.brand?.brand || "",
          unit: item.product.unit?.unit || "",
          shedule: item.product.shedule || "",
          sgst: gst / 2,
          cgst: gst / 2
        };
      });

      return {
        cart,
        total: parseFloat(order.total_amount),
        paymentMethod: order.payment_method.toLowerCase(),
        customerDetails: order.customer ? {
          doctorName: order.customer.doctor_name || "",
          customerName: order.customer.customer_name,
          customerMobile: order.customer.customer_phone?.toString()
        } : null,
        discount_percentage: order.customer?.discount ? parseFloat(order.customer.discount) : 0,
        user_id: order.user?.user_id || null,
        order_id: order.orders_id,
        order_date: orderDate.toLocaleDateString('en-IN'),
        invoice_number: `ACE-${order.orders_id}`,
        order_time: orderDate.toLocaleString('en-IN', { 
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true 
        })
      };
    });

    res.status(200).json({
      message: "Orders fetched successfully",
      orders: transformedOrders
    });
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message
    });
  }
};


module.exports = {
  checkout,
  getAllOrders,
};



