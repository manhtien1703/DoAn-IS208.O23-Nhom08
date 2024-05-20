import { DataTypes, Model } from "sequelize";
import Employee from "./Employee"; // Import the Employee model
import connectDatabase from "../configs/DBConfig";

const sequelize = connectDatabase();

class Department extends Model {}

Department.init(
  {
    DepartmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    DepartmentName: {
      type: DataTypes.STRING,
      allowNull: false,
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
    ManagerID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Employee,
        key: "EmployeeID",
      },
    },
  },
  {
    sequelize,
    modelName: "Department",
    tableName: "departments",
    timestamps: false,
  }
);

export default Department;
