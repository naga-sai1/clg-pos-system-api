module.exports = (sequelize, Sequelize) => {
    const OrserItem = sequelize.define("order_items",
        {
            order_items_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            order_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
        },
        {
        timestamps: false,
        tableName: 'order_items',
        engine: 'InnoDB',
    });

    return OrserItem;
}   