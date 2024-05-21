import React from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import EmployeesTable from "./EmployeesTable";

export default function ManagerDasboard() {
  return (
    <>
      <AdminLayout>
        <EmployeesTable />
      </AdminLayout>
    </>
  );
}
