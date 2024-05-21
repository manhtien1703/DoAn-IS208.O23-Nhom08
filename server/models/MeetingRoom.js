import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/DBConfig.js";

class MeetingRoom extends Model {}

MeetingRoom.init(
  {
    RoomID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    RoomName: {
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
  },
  {
    sequelize,
    modelName: "MeetingRoom",
    tableName: "MeetingRooms",
    timestamps: false,
  }
);

export default MeetingRoom;
