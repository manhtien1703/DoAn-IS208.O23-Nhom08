import { DataTypes, Model } from "sequelize";
import Employee from "./Employee.js"; // Import Employee model
import { sequelize } from "../configs/DBConfig.js";

class News extends Model {}

News.init(
  {
    NewsID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Thumb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Content: {
      type: DataTypes.TEXT,
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
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Employee, // Tham chiếu đến model Employee
        key: "EmployeeID", // Tham chiếu đến cột EmployeeID trong bảng employees
      },
    },
  },
  {
    sequelize,
    modelName: "News",
    tableName: "news",
    timestamps: false,
  }
);

export default News;
