import React, { useState } from "react";

const requestFakeData = [
  {
    RequestID: 1,
    EmployeeID: 101,
    StartDate: "2024-05-01",
    EndDate: "2024-05-05",
    Reason: "Vacation",
    Status: "Approved",
  },
  {
    RequestID: 2,
    EmployeeID: 102,
    StartDate: "2024-05-10",
    EndDate: "2024-05-15",
    Reason: "Medical Leave",
    Status: "Pending",
  },
  {
    RequestID: 3,
    EmployeeID: 103,
    StartDate: "2024-05-20",
    EndDate: "2024-05-22",
    Reason: "Personal Leave",
    Status: "Rejected",
  },
  {
    RequestID: 4,
    EmployeeID: 104,
    StartDate: "2024-06-01",
    EndDate: "2024-06-10",
    Reason: "Vacation",
    Status: "Approved",
  },
  {
    RequestID: 5,
    EmployeeID: 105,
    StartDate: "2024-06-15",
    EndDate: "2024-06-20",
    Reason: "Conference",
    Status: "Approved",
  },
  {
    RequestID: 6,
    EmployeeID: 106,
    StartDate: "2024-07-01",
    EndDate: "2024-07-05",
    Reason: "Medical Leave",
    Status: "Pending",
  },
  {
    RequestID: 7,
    EmployeeID: 107,
    StartDate: "2024-07-10",
    EndDate: "2024-07-12",
    Reason: "Personal Leave",
    Status: "Approved",
  },
  {
    RequestID: 8,
    EmployeeID: 108,
    StartDate: "2024-07-15",
    EndDate: "2024-07-20",
    Reason: "Training",
    Status: "Pending",
  },
  {
    RequestID: 9,
    EmployeeID: 109,
    StartDate: "2024-07-25",
    EndDate: "2024-07-30",
    Reason: "Vacation",
    Status: "Approved",
  },
  {
    RequestID: 10,
    EmployeeID: 110,
    StartDate: "2024-08-01",
    EndDate: "2024-08-05",
    Reason: "Medical Leave",
    Status: "Rejected",
  },
];

const EmployeesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate the indices of the first and last items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requestFakeData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(requestFakeData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Tên
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Chức vụ
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Số điện thoại
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="text-black">{user.name}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.position}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.email}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.phone}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeesTable;
