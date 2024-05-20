import { DataTypes, Model } from "sequelize";
import connectDatabase from "../configs/DBConfig";

const sequelize = connectDatabase();

class Announcement extends Model {}

Announcement.init(
  {
    AnnouncementID: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    },
    IsGeneral: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
