import { DataTypes, Model } from "sequelize";
import MeetingRoom from "./MeetingRoom.js"; // Import the MeetingRoom model
import Employee from "./Employee.js"; // Import the Employee model
import { sequelize } from "../configs/DBConfig.js";

class MeetingSchedule extends Model {}

MeetingSchedule.init(
  {
    ScheduleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    RoomID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: MeetingRoom, // Reference to the MeetingRoom model
        key: "RoomID",
      },
    },
    OrganizerID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Employee, // Reference to the Employee model
        key: "EmployeeID",
      },
    },
    StartTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    EndTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
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
    modelName: "MeetingSchedule",
    tableName: "MeetingSchedule",
    timestamps: false,
  }
);

// Define associations if necessary
MeetingSchedule.belongsTo(MeetingRoom, { foreignKey: "RoomID" });
MeetingSchedule.belongsTo(Employee, { foreignKey: "OrganizerID" });

export default MeetingSchedule;
