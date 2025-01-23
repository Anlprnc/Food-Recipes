import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Image from 'next/image';
import BackButton from '@/components/BackButton';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <BackButton />
      <div className="flex flex-col items-center justify-center mt-5">
        <Image src={session?.user.image ?? ''} alt="user-picture" className="rounded-full" width={150} height={150} />
        <div className="flex items-center justify-center">
          <div className="p-2 rounded shadow grid grid-cols-2 mt-9 gap-y-5 font-semibold">
            <p>Name:</p>
            <p>{session?.user.name}</p>
            <p>Email:</p>
            <p>{session?.user.email}</p>
            <p>Role:</p>
            <p>{session?.user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
