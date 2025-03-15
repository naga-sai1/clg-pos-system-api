const connectToDatabase = require("../misc/db.js");

// create supplier
const createSupplier = async (req, res) => {
  try {
    const { Supplier } = await connectToDatabase();
    // check if supplier already exists
    const existingSupplier = await Supplier.findOne({
      where: { email: req.body.email, suppliers_name: req.body.suppliers_name },
    });
    if (existingSupplier && existingSupplier.is_active) {
      return res.status(400).json({ message: "Supplier already exists" });
    }
    // check if supplier is exists but is_active is false then update is_active to true and also update other fields
    if (existingSupplier && !existingSupplier.is_active) {
      const updated_by = req.body.created_by;
      await existingSupplier.update({
        is_active: true,
        updated_by: updated_by,
        updated_on: new Date(),
      });
      return res.status(200).json({ message: "Supplier updated successfully" });
    }
    const supplier = await Supplier.create(req.body);
    res
      .status(201)
      .json({ supplier, message: "Supplier created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating supplier", error: err.message });
  }
};

// get all suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const { Supplier } = await connectToDatabase();
    const suppliers = await Supplier.findAll({
      where: { is_active: true },
    });
    res.status(200).json(suppliers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting all suppliers", error: err.message });
  }
};

// get supplier by id
const getSupplierById = async (req, res) => {
  try {
    const { Supplier } = await connectToDatabase();
    const supplier = await Supplier.findOne({
      where: {
        suppliers_id: req.params.id,
        is_active: true,
      },
    });
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json(supplier);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting supplier by id", error: err.message });
  }
};

// update supplier
const updateSupplier = async (req, res) => {
  try {
    const { Supplier } = await connectToDatabase();
    const supplier = await Supplier.findOne({
      where: {
        suppliers_id: req.params.id,
        is_active: true,
      },
    });
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    const updated_by = req.body.updated_by;
    await supplier.update({
      ...req.body,
      updated_by: updated_by,
      updated_on: new Date(),
    });
    res.status(200).json({ message: "Supplier updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating supplier", error: err.message });
  }
};

// delete supplier
const deleteSupplier = async (req, res) => {
  try {
    const { Supplier, Product, sequelizeDatabase } = await connectToDatabase();
    const transaction = await sequelizeDatabase.transaction();
    const supplier = await Supplier.findOne({
      where: {
        suppliers_id: req.params.id,
        is_active: true,
      },
      transaction,
    });
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    await supplier.update({ is_active: false }, { transaction });
    await Product.update(
      {
        is_active: false,
        suppliers_id: null,
      },
      {
        where: {
          suppliers_id: req.params.id,
        },
        transaction,
      }
    );
    await transaction.commit();
    return res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (err) {
    await transaction.rollback();
    res
      .status(500)
      .json({ message: "Error deleting supplier", error: err.message });
  }
};




module.exports = {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};
