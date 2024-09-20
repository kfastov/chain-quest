'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import SetNicknameForm from '@/components/SetNicknameForm';

export default function Dashboard() {
  const [nickname, setNickname] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
        setNickname(response.data.user.nickname || null);
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('jwtToken');
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleNicknameSet = (newNickname: string) => {
    setNickname(newNickname);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : nickname ? (
        <p className="text-xl">Hello, {nickname}!</p>
      ) : (
        <SetNicknameForm onNicknameSet={handleNicknameSet} />
      )}
    </div>
  );
}