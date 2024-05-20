import { DataTypes, Model } from "sequelize";
import connectDatabase from "../configs/DBConfig";

const sequelize = connectDatabase();

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
