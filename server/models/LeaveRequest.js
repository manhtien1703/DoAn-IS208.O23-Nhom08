import { DataTypes, Model } from "sequelize";
import Employee from "./Employee.js";
import { sequelize } from "../configs/DBConfig.js";

class LeaveRequest extends Model {}

LeaveRequest.init(
  {
    RequestID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    EmployeeID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Employee, // Reference to the Employee model
        key: "EmployeeID", // The column in the Employee model to which EmployeeID is referring to
      },
    },
    StartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    EndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Status: {
      type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
      defaultValue: "Pending",
    },
    ManagerID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Employee, // Reference to the Employee model
        key: "EmployeeID", // The column in the Employee model to which ManagerID is referring to
      },
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
  },
  {
    sequelize,
    modelName: "LeaveRequest",
    tableName: "leaverequest",
    timestamps: false,
  }
);

export default LeaveRequest;
