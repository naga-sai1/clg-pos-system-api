module.exports = (sequelize, Sequelize) => {
  const products = sequelize.define(
    "products",
    {
      products_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      products_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      products_description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      products_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "categories",
          key: "category_id",
        },
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "suppliers",
          key: "supplier_id",
        },
      },
      barcode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "units",
          key: "unit_id",
        },
      },
      batch_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      manufacturing_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      expiry_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      qty_alert: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("active", "inactive", "discontinued"),
        defaultValue: "active",
      },
      brand_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "brands",
          key: "brand_id",
        },
      },
      created_on: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_on: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      gst: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      shedule: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "products",
      engine: "InnoDB",
    }
  );

  return products;
};
