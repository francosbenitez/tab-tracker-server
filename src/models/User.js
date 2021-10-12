module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: Sequelize.STRING
    })
    return User
}
