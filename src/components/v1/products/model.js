'use strict'
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
  }, {
    freezeTableName: true
  })

  // Associations to user
  Product.associate = function (models) {
    Product.belongsTo(models.User, {
      through: 'id',
      foreignKey: 'user_id',
      as: 'user'
    })

    Product.belongsToMany(models.Order, {
      through: 'Orders_Product',
      as: 'orders',
    })
  }

  return Product
}