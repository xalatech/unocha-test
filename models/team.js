module.exports = (sequelize, DataTypes) => {
    return sequelize.define('team', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      leader: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  };