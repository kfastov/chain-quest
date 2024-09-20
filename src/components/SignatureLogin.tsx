'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useAccount } from '@starknet-react/core';
import { useSignTypedData } from "@starknet-react/core";
import { shortString } from "starknet";
import { useRouter } from 'next/navigation';

const SignatureLogin: React.FC = () => {
    const [challengeData, setChallengeData] = useState(null);
    const [token, setToken] = useState<string | null>(null);

    const { address: userAddress, isConnected } = useAccount();

    const { signTypedDataAsync: signChallenge, data: signedChallenge, error: signError } = useSignTypedData({});

    const router = useRouter();

    const handleRegistration = async () => {
        try {
            // Assuming the user's wallet address is available
            console.log('User address:', userAddress);
            if (!userAddress) {
                console.error('User address is not available');
                return;
            }

            // Request challenge from the server
            const response = await axios.post('http://localhost:3001/api/auth/challenge', {
                wallet_address: userAddress
            });

            
            setChallengeData(response.data.challengeData);

            let challengeData = JSON.parse(JSON.stringify(response.data.challengeData));

            console.log('Challenge received:', challengeData);
            const signature = await signChallenge(
                 challengeData
            );
            console.log('Signature:', signature);

            // Send signature to server
            const verificationResponse = await axios.post('http://localhost:3001/api/auth/verify', {
                wallet_address: userAddress,
                signature: signature
            });

            console.log('Verification response:', verificationResponse.data);

            // Handle the server response (e.g., show success message, redirect, etc.)
            if (verificationResponse.data.success) {
                console.log('Login successful');
                setToken(verificationResponse.data.token);
                localStorage.setItem('jwtToken', verificationResponse.data.token);
                router.push('/dashboard'); // Redirect to dashboard or protected route
            } else {
                console.error('Login failed:', verificationResponse.data.message);
                // Handle failure (e.g., show error message to user)
            }

        } catch (error) {
            console.error('Error during login:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleRegistration}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                disabled={!isConnected}
            >
                {isConnected ? "Login" : "Please Connect Wallet"}
            </button>
            {challengeData && <p className="mt-2 text-green-600">Challenge received. Ready for signature.</p>}
            {signError && <p className="mt-2 text-red-600">Error signing challenge: {signError.message}</p>}
        </div>
    );
};

export default SignatureLogin;
