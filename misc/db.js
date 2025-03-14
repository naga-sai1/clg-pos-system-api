const mysql = require("mysql2");
const sequilize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const categoryModel = require("../models/categories.model");
const productModel = require("../models/products.model");
const customerModel = require("../models/customers.model");
const eploeeModel = require("../models/employees.model");
const orderModel = require("../models/orders.model");
const orderItemModel = require("../models/order_items.model");
const supplierModel = require("../models/suppliers.model");
const userModel = require("../models/users.model");
const brandModel = require("../models/brands.model");
const unitModel = require("../models/units.model");
const subCategoryModel = require("../models/sub_categories.model");

const sequelizeDatabase = new sequilize.Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: false,
  }
);

// const sequelizeDatabase = new sequilize.Sequelize(
//   "kk_mart_devdb",
//   "root",
//   "123@Apple",
//   {
//     host: "127.0.0.1",
//     dialect: "mysql",
//     port: 3306,
//     logging: false,
//   }
// );

const Category = categoryModel(sequelizeDatabase, sequilize);
const Product = productModel(sequelizeDatabase, sequilize);
const Customer = customerModel(sequelizeDatabase, sequilize);
const Employee = eploeeModel(sequelizeDatabase, sequilize);
const Order = orderModel(sequelizeDatabase, sequilize);
const OrderItem = orderItemModel(sequelizeDatabase, sequilize);
const Supplier = supplierModel(sequelizeDatabase, sequilize);
const User = userModel(sequelizeDatabase, sequilize);
const Brand = brandModel(sequelizeDatabase, sequilize);
const Unit = unitModel(sequelizeDatabase, sequilize);
const SubCategory = subCategoryModel(sequelizeDatabase, sequilize);

// Define associations
Product.belongsTo(Category, {
  foreignKey: "category_id",
  targetKey: "category_id",
  onDelete: "CASCADE",
});

Product.belongsTo(Supplier, {
  foreignKey: "supplier_id",
  targetKey: "suppliers_id",
  onDelete: "CASCADE",
});

Product.belongsTo(Brand, {
  foreignKey: "brand_id",
  targetKey: "brand_id",
});

Product.belongsTo(User, {
  foreignKey: "created_by",
  targetKey: "user_id",
  as: "creator",
});

Product.belongsTo(Unit, {
  foreignKey: "unit_id",
  targetKey: "unit_id",
});

User.hasMany(Product, {
  foreignKey: "created_by",
  sourceKey: "user_id",
  as: "created_products",
});

Category.hasMany(Product, {
  foreignKey: "category_id",
  sourceKey: "category_id",
});

Supplier.hasMany(Product, {
  foreignKey: "supplier_id",
  sourceKey: "suppliers_id",
});

Brand.hasMany(Product, {
  foreignKey: "brand_id",
  sourceKey: "brand_id",
});

Product.hasMany(OrderItem, {
  foreignKey: "product_id",
  sourceKey: "products_id",
  onDelete: "CASCADE",
});

OrderItem.belongsTo(Product, {
  foreignKey: "product_id",
  targetKey: "products_id",
});

Order.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "user_id"
});

User.hasMany(Order, {
  foreignKey: "user_id",
  sourceKey: "user_id"
});

Unit.hasMany(Product, {
  foreignKey: "unit_id",
  sourceKey: "unit_id",
});

SubCategory.belongsTo(Category, {
  foreignKey: "category_id",
  targetKey: "category_id",
  onDelete: "CASCADE",
});

SubCategory.belongsTo(User, {
  foreignKey: "created_by",
  targetKey: "user_id",
  as: "creator",
});

// Add Order <-> OrderItem association
Order.hasMany(OrderItem, {
  foreignKey: "order_id",
  sourceKey: "orders_id",
  onDelete: "CASCADE"
});

OrderItem.belongsTo(Order, {
  foreignKey: "order_id",
  targetKey: "orders_id"
});

// Add Order <-> Customer association
Order.belongsTo(Customer, {
  foreignKey: "customer_id",
  targetKey: "customers_id"
});

Customer.hasMany(Order, {
  foreignKey: "customer_id",
  sourceKey: "customers_id"
});

const Models = {
  Category,
  Product,
  Customer,
  Employee,
  Order,
  OrderItem,
  Supplier,
  User,
  Brand,
  Unit,
  SubCategory,
};

const connection = {};

const connectToDatabase = async () => {
  try {
    if (connection.isConnected) {
      console.log("=> Using existing connection.");
      return { ...Models, sequelizeDatabase };
    }
    await sequelizeDatabase.authenticate();
    await sequelizeDatabase.sync();
    connection.isConnected = true;
    console.log("=> Created a new connection.");
    return { ...Models, sequelizeDatabase };
  } catch (error) {
    console.error("=> Connection error: ", error);
    throw error;
  }
};

module.exports = connectToDatabase;
