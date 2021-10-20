const {DataTypes} = require('sequelize'); //1
const db = require('../db'); //2

const Pie = db.define('pie', { //3
    nameOfPie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    baseOfPie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    crust: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timeToBake: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
})

module.exports = Pie;