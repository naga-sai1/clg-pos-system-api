const connectToDatabase = require("../misc/db.js");

// create supplier
const createSupplier = async (req, res) => {
    try{
        const { Supplier } = await connectToDatabase();
        // check if supplier already exists
        const existingSupplier = await Supplier.findOne({ where: { email: req.body.email, suppliers_name: req.body.suppliers_name } });
        if (existingSupplier && existingSupplier.is_active) {
            return res.status(400).json({ message: "Supplier already exists" });
        }
        // check if supplier is exists but is_active is false then update is_active to true and also update other fields
        if (existingSupplier && !existingSupplier.is_active) {
            const updated_by = req.body.created_by;
            await existingSupplier.update({ is_active: true, updated_by: updated_by, updated_on: new Date() });
            return res.status(200).json({ message: "Supplier updated successfully" });
        }
        const supplier = await Supplier.create(req.body);
        res.status(201).json({supplier, message: "Supplier created successfully"});

    }catch(err){
        res.status(500).json({ message: "Error creating supplier", error: err.message });
    }
}

// get all suppliers
const getAllSuppliers = async (req, res) => {
    try{

    }catch(err){    
        res.status(500).json({ message: "Error getting all suppliers", error: err.message });
    }
};


// get supplier by id
const getSupplierById = async (req, res) => {
    const { Supplier } = await connectToDatabase();
    const supplier = await Supplier.findByPk(req.params.id);
    res.status(200).json(supplier);
};

// update supplier
const updateSupplier = async (req, res) => {
    const { Supplier } = await connectToDatabase();
    const supplier = await Supplier.findByPk(req.params.id);
    res.status(200).json(supplier);
};

// delete supplier
const deleteSupplier = async (req, res) => {
    const { Supplier } = await connectToDatabase();
    const supplier = await Supplier.findByPk(req.params.id);
    res.status(200).json(supplier);
};

module.exports = {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
};
