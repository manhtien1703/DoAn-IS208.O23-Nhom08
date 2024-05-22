import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/DBConfig.js";
import Announcement from "./Announcement.js";
import Employee from "./Employee.js";

class AnnouncementRecipient extends Model {}

AnnouncementRecipient.init(
  {
    AnnouncementID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Đặt cột AnnouncementID làm phần của khóa chính
    },
    RecipientID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Đặt cột RecipientID làm phần của khóa chính
    },
    Status: {
      type: DataTypes.ENUM("Seen", "Not seen"),
      defaultValue: "Not seen",
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
    modelName: "AnnouncementRecipient",
    tableName: "announcementrecipient",
    timestamps: false, // assuming timestamps are managed manually
  }
);

// Tạo quan hệ giữa AnnouncementRecipient và Announcement
AnnouncementRecipient.belongsTo(Announcement, {
  foreignKey: "AnnouncementID",
});

// Tạo quan hệ giữa AnnouncementRecipient và Employee
AnnouncementRecipient.belongsTo(Employee, {
  foreignKey: "RecipientID",
});

// Tạo quan hệ khóa ngoại từ AnnouncementRecipient đến Employee
Employee.hasMany(AnnouncementRecipient, {
  foreignKey: "RecipientID",
});

// Tạo quan hệ khóa ngoại từ AnnouncementRecipient đến Employee
Announcement.hasMany(AnnouncementRecipient, {
  foreignKey: "AnnouncementID",
});

export default AnnouncementRecipient;
