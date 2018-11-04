module.exports = (sequelize, DataTypes) => {
    return sequelize.define('teamMembers', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      employeeId: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  };