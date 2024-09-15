"use strict";

var _require = require('sequelize'),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var sequelize = new Sequelize('sqlite::memory:'); // Определение модели мастеров

var Master = sequelize.define('Master', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}); // Определение модели услуг

var Service = sequelize.define('Service', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}); // Определение таблицы связи между мастерами и услугами

var MasterService = sequelize.define('MasterService', {}); // Связь между мастерами и услугами

Master.belongsToMany(Service, {
  through: MasterService
});
Service.belongsToMany(Master, {
  through: MasterService
});
module.exports = {
  sequelize: sequelize,
  Master: Master,
  Service: Service,
  MasterService: MasterService
};