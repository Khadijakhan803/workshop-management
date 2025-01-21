module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define('Activity', {
      title: { type: DataTypes.STRING, allowNull: false },
      startTime: { type: DataTypes.DATE, allowNull: false },
      endTime: { type: DataTypes.DATE, allowNull: false },
    });
    return Activity;
  };
  