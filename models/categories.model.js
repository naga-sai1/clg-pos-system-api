module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category",
        {
            category_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            category: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            category_slug: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            created_on: {
                type: Sequelize.DATE,
                default: Date.now()
            },
            status: {
                type: Sequelize.BOOLEAN,
                default: 1
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                comment: 'true for active, false for inactive'
            }
        },
        {
        timestamps: false,
        tableName: 'category',
        engine: 'InnoDB',
    });

    return Category;
}   