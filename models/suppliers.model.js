module.exports = (sequelize, Sequelize) => {
    const Supplier = sequelize.define("suppliers",
        {
            suppliers_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            suppliers_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true,
            },

           phone: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            country: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            created_by: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },

            updated_by: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            created_on: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updated_on: {
                type: Sequelize.DATE,
                allowNull: true,
            }
        },
        {
        timestamps: false,
        tableName: 'suppliers',
        engine: 'InnoDB',



    });

    return Supplier;
}   