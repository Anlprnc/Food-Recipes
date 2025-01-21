import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminDashboard from "@/components/AdminDashboard";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      This is admin dashboard
      {JSON.stringify(session)}
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
