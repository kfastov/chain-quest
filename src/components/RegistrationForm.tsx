'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useAccount } from '@starknet-react/core';
import { useSignTypedData } from "@starknet-react/core";
import { shortString } from "starknet";

const RegistrationForm: React.FC = () => {
    const [challengeData, setChallengeData] = useState(null);

    const { address: userAddress } = useAccount();

    const { signTypedDataAsync: signChallenge, data: signedChallenge, error: signError } = useSignTypedData({});

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
                console.log('Registration successful');
                // Add your logic here (e.g., update UI, redirect, etc.)
            } else {
                console.error('Registration failed:', verificationResponse.data.message);
                // Handle failure (e.g., show error message to user)
            }

        } catch (error) {
            console.error('Error during registration:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <div>
            <button onClick={handleRegistration}>Register</button>
            {challengeData && <p>Challenge received. Ready for signature.</p>}
            {signError && <p>Error signing challenge: {signError.message}</p>}
        </div>
    );
};

export default RegistrationForm;
