import { DataTypes, Model } from "sequelize";
import Employee from "./Employee.js"; // Import the Employee model
import { sequelize } from "../configs/DBConfig.js";

class Announcement extends Model {}

Announcement.init(
  {
    AnnouncementID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Title: {
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
        model: Employee, // Reference to the Employee model
        key: "EmployeeID", // The column in the Employee model to which CreatedBy is referring to
      },
    },
    IsGeneral: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      get() {
        // Xử lý giá trị trường IsGeneral để trả về giá trị boolean thay vì số
        const rawValue = this.getDataValue("IsGeneral");
        return !!rawValue; // Chuyển đổi giá trị sang boolean
      },
    },
  },
  {
    sequelize,
    modelName: "Announcement",
    tableName: "announcements",
    timestamps: false,
  }
);

export default Announcement;
