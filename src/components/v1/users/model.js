'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    freezeTableName: true
  })

  // Associations to Order
  User.associate = function (models) {
    User.hasMany(models.Order, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    })
  }

  return User
}