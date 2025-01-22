import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import AdminDashboard from '@/components/AdminDashboard';
import BackButton from '@/components/BackButton';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Unauthorized. Please log in.</div>;
  }

  return (
    <div>
      <BackButton />
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
