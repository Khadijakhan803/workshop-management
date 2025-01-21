const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Workshop = require('./workshop')(sequelize, Sequelize.DataTypes);
const Activity = require('./activity')(sequelize, Sequelize.DataTypes);

User.hasMany(Workshop, { foreignKey: 'mentorId' });
Workshop.belongsTo(User, { foreignKey: 'mentorId' });

Workshop.hasMany(Activity, { foreignKey: 'workshopId' });
Activity.belongsTo(Workshop, { foreignKey: 'workshopId' });

module.exports = { sequelize, User, Workshop, Activity };
