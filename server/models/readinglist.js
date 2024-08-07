'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReadingList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReadingList.belongsTo(models.User)
      ReadingList.belongsTo(models.Book)
    }
  }
  ReadingList.init({
    UserId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: "to read"
    },
    notes: {
      type: DataTypes.TEXT,
      defaultValue: "you havent added any notes"
    }
  }, {
    sequelize,
    modelName: 'ReadingList',
  });
  return ReadingList;
};