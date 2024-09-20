'use client'

import { useState } from 'react';
import axios from 'axios';

interface SetNicknameFormProps {
  onNicknameSet: (newNickname: string) => void;
}

export default function SetNicknameForm({ onNicknameSet }: SetNicknameFormProps) {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nickname.trim()) {
      setError('Nickname cannot be empty');
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.put(
        'http://localhost:3001/api/users/update/self',
        { nickname },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onNicknameSet(response.data.user.nickname);
    } catch (error) {
      console.error('Error setting nickname:', error);
      setError('Failed to set nickname. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Enter new nickname"
        className="px-3 py-2 border rounded-md mr-2"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Set Nickname
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}