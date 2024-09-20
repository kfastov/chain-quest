'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useAccount } from '@starknet-react/core';
import { useSignTypedData } from "@starknet-react/core";
import { shortString } from "starknet";

const RegistrationForm: React.FC = () => {
    const [challengeData, setChallengeData] = useState(null);

    const { address: userAddress } = useAccount();

    const { signTypedData: signChallenge, error: signError } = useSignTypedData({
        params: challengeData as any
    });

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

            // Next steps: Sign the challenge and verify the signature
            // This will be implemented in the next part of the registration process

        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div>
            <button onClick={handleRegistration}>Register</button>
            {challengeData && <p>Challenge received. Ready for signature.</p>}
        </div>
    );
};

export default RegistrationForm;
