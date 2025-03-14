const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandNames,
} = require("../controllers/brand.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

router.get("/get_all_brands", getAllBrands);
router.get("/get_brand/:id", getBrandById);
router.post("/create_brand", upload.single("logo"), createBrand);
router.put("/update_brand/:id", upload.single("logo"), updateBrand);
router.delete("/delete_brand/:id", deleteBrand);
router.get("/brand_names", getBrandNames);

module.exports = router;
