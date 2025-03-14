const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

const productRoute = require("./routes/products.route");
const orderRoute = require("./routes/orders.route");
const authRoute = require("./routes/auth.route");
const categoryRoute = require("./routes/categories.route");
const brandRoute = require("./routes/brand.route");
const unitRoute = require("./routes/unit.route");
const subCategoryRoute = require("./routes/sub_categories.route");
const supplierRoute = require("./routes/suppliers.route");
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello this is server API for the Apple Pharmacy!.");
});

app.use(productRoute);
app.use(orderRoute);
app.use(authRoute);
app.use(categoryRoute);
app.use(brandRoute);
app.use(unitRoute);
app.use(subCategoryRoute);
app.use(supplierRoute);

app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
