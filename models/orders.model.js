module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders",
        {
            orders_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            customer_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },

            order_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            total_amount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            payment_method: {
                type: Sequelize.ENUM('Cash', 'Online', 'Card'),
                allowNull: false,
                defaultValue: 'Cash'
            },
            notes: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        },
        {
        timestamps: false,
        tableName: 'orders',
        engine: 'InnoDB',
    });

    return Order;
}   