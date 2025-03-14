# KK Mart API

A robust backend API for a retail management system built with Node.js, Express, and MySQL.

## 🚀 Features

- Product Management
  - Add, update, and retrieve products
  - Barcode-based product lookup
  - Category and supplier management
  - Inventory tracking

- Order Processing
  - Shopping cart functionality
  - Real-time inventory updates
  - Multiple payment methods
  - Tax calculation
  - Order history

- Customer & Employee Management
  - Customer profiles
  - Employee records
  - Role-based access

## 🛠️ Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Other Tools:**
  - cors: Cross-Origin Resource Sharing
  - dotenv: Environment Variables
  - nodemon: Development Server
  - body-parser: Request Parsing

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/naga-sai1/kk_mart_api.git
```

2. Install dependencies:
```bash
cd kk_mart_api
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password
DB_HOST=your_database_host
DB_PORT=your_database_port
PORT=5000
```

4. Start the server:
```bash
npm run dev
```

## 🔗 API Endpoints

### Products
- `POST /add_products` - Add a new product
- `GET /get_all_products` - Retrieve all products
- `GET /get_product_barcode_details/:barcode` - Get product by barcode
- `PUT /update_product/:barcode` - Update product by barcode

### Orders
- `POST /checkout` - Process order checkout

## 📊 Database Schema

### Products Table
- products_id (Primary Key)
- products_name
- products_description
- products_price
- category_id (Foreign Key)
- supplier_id (Foreign Key)
- barcode
- quantity

### Orders Table
- orders_id (Primary Key)
- customer_id (Foreign Key)
- employee_id (Foreign Key)
- order_date
- total_amount
- payment_method (Cash/Online/Card)
- notes

[Additional tables documentation...]

## 🔒 Environment Variables

Required environment variables:
```env
DB_NAME     - Database name
DB_USER     - Database user
DB_PASS     - Database password
DB_HOST     - Database host
DB_PORT     - Database port
PORT        - Application port (default: 5000)
```

## 🚀 Usage Examples

### Adding a Product
```javascript
POST /add_products
{
    "products_name": "Sample Product",
    "products_description": "Product description",
    "products_price": 99.99,
    "category": "Electronics",
    "supplier_name": "Sample Supplier",
    "barcode": "123456789",
    "quantity": 100
}
```

### Processing Checkout
```javascript
POST /checkout
{
    "items": [
        {
            "barcode": "123456789",
            "quantity": 2,
            "price": 99.99
        }
    ],
    "payment_method": "Cash",
    "customer_id": 1,
    "employee_id": 1
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [naga-sai1](https://github.com/naga-sai1)

## 🙏 Acknowledgments

- Express.js team
- Sequelize team
- MySQL team
