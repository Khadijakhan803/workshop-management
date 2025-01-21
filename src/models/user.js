module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      role: { type: DataTypes.ENUM('mentor', 'learner'), allowNull: false },
    });
    return User;
  };
  