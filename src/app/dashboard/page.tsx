'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Dashboard() {
  const [nickname, setNickname] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      router.push('/');
      return;
    }

    const fetchUserData = async () => {
      try {
        console.log('Fetching user data with token:', token);
        const response = await axios.get('http://localhost:3001/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNickname(response.data.user.nickname || 'User');
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('jwtToken');
        router.push('/');
      }
    };

    fetchUserData();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
      {nickname && <p className="text-xl">Hello, {nickname}!</p>}
    </div>
  );
}