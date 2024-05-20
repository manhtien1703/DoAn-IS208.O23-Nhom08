import { DataTypes, Model } from "sequelize";
import connectDatabase from "../configs/DBConfig";

const sequelize = connectDatabase();

class AnnouncementRecipient extends Model {}

AnnouncementRecipient.init(
  {
    AnnouncementID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RecipientID: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

export default AnnouncementRecipient;
