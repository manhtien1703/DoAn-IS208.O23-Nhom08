import { Sequelize } from "sequelize";
import Employee from "../models/Employee.js";
import { createAnnouncementService } from "../services/announcementService.js";

const createBirthDayWishes = async () => {
  console.log(1);
  const today = new Date();

  const usersWithBirthday = await Employee.findAll({
    where: {
      // Sử dụng [Op.and] để xác định điều kiện AND
      [Sequelize.Op.and]: [
        // Sử dụng toán tử $month và $day của sequelize để trích xuất tháng và ngày từ DateOfBirth
        Sequelize.where(
          Sequelize.fn("MONTH", Sequelize.col("DateOfBirth")),
          today.getMonth() + 1
        ),
        Sequelize.where(
          Sequelize.fn("DAY", Sequelize.col("DateOfBirth")),
          today.getDate()
        ),
      ],
    },
  });

  usersWithBirthday.forEach((user) => {
    console.log(user);
    const title = `Hôm nay là sinh nhật của bạn đó ${user.FullName}`;

    const content = `<h1 style="text-align: center; margin-bottom: 10px">Chúc mùng sinh nhật</h1>
                      <h3 style="text-align: center;">${user.FullName}</h3>
                      <img src = http://localhost:5000/uploads/birthday-cards.png />
                      `;
    createAnnouncementService(title, content, [user]);
  });
};
export default createBirthDayWishes;
