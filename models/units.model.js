module.exports = (sequelize, Sequelize) => {
  const Unit = sequelize.define(
    "units",
    {
      unit_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      short_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      no_of_products: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0,
      },
      created_on: {
        type: Sequelize.DATE,
        default: new Date(),
      },
      status: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
    },
    {
      timestamps: false,
      tableName: "units",
      engine: "InnoDB",
    }
  );

  return Unit;
};
