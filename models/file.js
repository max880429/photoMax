"use strict";
let fileUtils = require('../modules/fileUtils');

module.exports = (sequelize, DataTypes) => {
  var File = sequelize.define("File", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'path',
      get() {
        return fileUtils.getPublicURL(this.getDataValue('path'));
      }
    },
    mime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: DataTypes.INTEGER.UNSIGNED
  }, {
      tableName: 'file',
      freezeTableName: true,
      underscored: false
    });

  File.associate = models => {
    File.belongsToMany(models.Tag, {
      as: 'Tags',
      through: models.FileTag,
      foreignKey: 'file'
    });
  };

  return File;
};