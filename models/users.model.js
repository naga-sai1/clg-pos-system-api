module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            type: Sequelize.ENUM('admin', 'manager', 'cashier'),
            defaultValue: 'cashier'
        },
        last_login: {
            type: Sequelize.DATE
        }
    }, {
        timestamps: true,
        tableName: 'users',
        engine: 'InnoDB'
    });

    return User;
};
