"use strict";

module.exports = (sequelize, DataTypes) => {
  let FileTag = sequelize.define('FileTag', {
  }, {
      timestamps: false,
      underscored: true,
      freezeTableName: false,
      tableName: 'file_tag',
      version: false
    });

  return FileTag;
};