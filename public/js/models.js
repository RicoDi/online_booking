const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

// Определение модели мастеров
const Master = sequelize.define('Master', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Определение модели услуг
const Service = sequelize.define('Service', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
});

// Определение таблицы связи между мастерами и услугами
const MasterService = sequelize.define('MasterService', {});

// Связь между мастерами и услугами
Master.belongsToMany(Service, { through: MasterService });
Service.belongsToMany(Master, { through: MasterService });

module.exports = { sequelize, Master, Service, MasterService };
