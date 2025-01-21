module.exports = (sequelize, DataTypes) => {
    const Workshop = sequelize.define('Workshop', {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      location: { type: DataTypes.STRING },
    });
    return Workshop;
  };
  