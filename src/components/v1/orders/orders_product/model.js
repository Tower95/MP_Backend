'use strict'
module.exports = (sequelize, DataTypes) => {
  const Orders_Product = sequelize.define('Orders_Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    freezeTableName: true
  })

  // Associations to user
  Orders_Product.associate = function (models) {
    Orders_Product.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order'
    })

    Orders_Product.belongsToMany(models.Product, {
      foreignKey: 'product_id',
      as: 'products',
    })
  }
  return Orders_Product
}
