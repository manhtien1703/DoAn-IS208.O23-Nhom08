import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/DBConfig.js";

class CrossDepartmentRequest extends Model {}

CrossDepartmentRequest.init(
  {
    RequestID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    FromEmployeeID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ToDepartmentID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    RequestContent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Status: {
      type: DataTypes.ENUM(
        "Pending",
        "ForwardedTo",
        "RejectedByManager",
        "ForwardedToHR",
        "ForwardedToAnotherDepartment",
        "Completed"
      ),
      defaultValue: "Pending",
    },
    ProcessedBy: {
      type: DataTypes.INTEGER,
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
  },
  {
    sequelize,
    modelName: "CrossDepartmentRequest",
    tableName: "crossdepartmentrequests",
    timestamps: false,
  }
);

export default CrossDepartmentRequest;
