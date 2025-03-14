module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customers",
        {
            customers_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            customer_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            customer_email: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            customer_phone: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            doctor_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            discount: {
                type: Sequelize.STRING,
                allowNull: true,
            }
        },
        {
        timestamps: false,
        tableName: 'customers',
        engine: 'InnoDB',
    });

    return Customer;
}   