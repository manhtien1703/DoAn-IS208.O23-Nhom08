import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/DBConfig.js";

class Employee extends Model {}

Employee.init(
  {
    EmployeeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    FullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DepartmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Role: {
      type: DataTypes.ENUM("Nhan vien", "Truong phong", "Phong nhan su"),
      defaultValue: "Nhan vien",
    },
    Avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
    CCCD: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    DateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Employee",
    tableName: "employees",
    timestamps: false,
  }
);

export default Employee;
