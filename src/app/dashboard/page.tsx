'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import SetNicknameForm from '@/components/SetNicknameForm';
import WalletBar from '@/components/WalletBar';
import AdminGameForm from '@/components/AdminGameForm';
import { ABI } from "@/abi/ChainQuestRoot";
import { type Abi } from "starknet";

interface Game {
  id: number;
  contractAddress: string;
  name: string;
}

export default function Dashboard() {
  const [nickname, setNickname] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<Game[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      router.push('/');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNickname(response.data.user.nickname || null);
        console.log('Is Admin:', response.data.user.is_admin);
        setIsAdmin(response.data.user.is_admin || false);
        fetchGames();
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

  const fetchGames = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get('http://localhost:3001/api/games', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGames(response.data.games);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const handleNicknameSet = (newNickname: string) => {
    setNickname(newNickname);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="w-full p-4 bg-gray-100">
        <WalletBar />
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : nickname ? (
          <>
            <p className="text-xl mb-4">Hello, {nickname}!</p>
            <h2 className="text-2xl font-bold mb-2">Available Games</h2>
            <ul className="mb-4">
              {games.map((game) => (
                <li key={game.id} className="mb-2">
                  {game.name} - {game.contractAddress}
                </li>
              ))}
            </ul>
            {isAdmin && (
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Admin Panel</h3>
                <AdminGameForm onGameAdded={fetchGames} />
              </div>
            )}
          </>
        ) : (
          <SetNicknameForm onNicknameSet={handleNicknameSet} />
        )}
      </main>
    </div>
  );
}