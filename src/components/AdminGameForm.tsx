import React, { useState } from 'react';
import axios from 'axios';

interface AdminGameFormProps {
  onGameAdded: () => void;
}

const AdminGameForm: React.FC<AdminGameFormProps> = ({ onGameAdded }) => {
  const [contractAddress, setContractAddress] = useState('');
  const [gameName, setGameName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!contractAddress.trim() || !gameName.trim()) {
      setError('Both contract address and game name are required');
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      await axios.post(
        'http://localhost:3001/api/games',
        { contractAddress, name: gameName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContractAddress('');
      setGameName('');
      onGameAdded();
    } catch (error) {
      console.error('Error adding game:', error);
      setError('Failed to add game. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
        placeholder="Contract Address"
        className="px-3 py-2 border rounded-md mr-2 text-gray-800 placeholder-gray-500"
      />
      <input
        type="text"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
        placeholder="Game Name"
        className="px-3 py-2 border rounded-md mr-2 text-gray-800 placeholder-gray-500"
      />
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
        Add Game
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default AdminGameForm;