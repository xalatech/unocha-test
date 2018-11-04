module.exports = (sequelize, DataTypes) => {
    return sequelize.define('teamMember', {
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