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

    const { address: userAddress } = useAccount();

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
            console.log('Challenge received:', response.data.challengeData);

            const signature = await signChallenge(response.data.challengeData as any);
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

    // Add a function to make authenticated requests
    const makeAuthenticatedRequest = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Protected data:', response.data);
        } catch (error) {
            console.error('Error fetching protected data:', error);
        }
    };

    return (
        <div>
            <button onClick={handleRegistration}>Register</button>
            {challengeData && <p>Challenge received. Ready for signature.</p>}
            {signError && <p>Error signing challenge: {signError.message}</p>}
            {token && <button onClick={makeAuthenticatedRequest}>Fetch Protected Data</button>}
        </div>
    );
};

export default SignatureLogin;
