'use strict'
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    freezeTableName: true
  })

  // Associations to user
  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
    })

    Order.belongsToMany(models.Product, {
      through: 'Orders_Product',
      as: 'products',
    })
  }
  return Order
}
