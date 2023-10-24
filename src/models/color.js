const { DataTypes } = require('sequelize');
const db = require('../database/dbConnection');

const Color = db.define('Color', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  color: {
      type: DataTypes.CHAR(6),
      allowNull: false
  },
  pantone: {
      type: DataTypes.STRING(7),
      allowNull: true
  },
  year: {
      type: DataTypes.INTEGER,
      allowNull: true
  }
});

Color.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.createdAt;
    delete values.updatedAt;

    return values;
}

module.exports = Color;
