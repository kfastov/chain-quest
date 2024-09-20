import express from 'express';
import cors from 'cors';
import prisma from './services/db';
import { stark, hash, typedData, Account, RpcProvider } from 'starknet';
import crypto from 'crypto';


const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const provider = new RpcProvider({
  nodeUrl: process.env.RPC_ENDPOINT,
});

// initialize existing predeployed account
console.log("ACCOUNT_ADDRESS:", process.env.DEPLOYER_ADDRESS);
const privateKey = process.env.DEPLOYER_PRIVATE_KEY ?? "";
const accountAddress: string = process.env.DEPLOYER_ADDRESS ?? "";
const account = new Account(provider, accountAddress, privateKey);

import challengeTypedData from './data/typedData.json';

// Generate a random challenge
function generateChallenge() {
  return crypto.randomBytes(31).toString('base64').slice(0, 31);
}

// Generate a typed data to sign from the challenge
function generateTypedData(challenge: string) {
    // create a copy of the typedData and replace the challenge with the new one
    const typedDataCopy = JSON.parse(JSON.stringify(challengeTypedData));
    typedDataCopy.message.challenge = challenge;
    return typedDataCopy;
}

// Store challenges temporarily (in production, use a database or cache)
const challenges = new Map();

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.post('/api/users', async (req, res) => {
  const { wallet_address, nickname, starknet_id } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        wallet_address,
        nickname,
        starknet_id,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.get('/api/users/:wallet_address', async (req, res) => {
  const { wallet_address } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { wallet_address },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

app.post('/api/auth/challenge', async (req, res) => {
    console.log('challenge request received');
  const { wallet_address } = req.body;
  if (!wallet_address) {
    return res.status(400).json({ error: 'Wallet address is required' });
  }

  const challenge = generateChallenge();
  challenges.set(wallet_address, challenge);

  const challengeData = generateTypedData(challenge);
  console.log('sending challengeData:', challengeData);
  res.json({ challengeData });
});

app.post('/api/auth/verify', async (req, res) => {
  const { wallet_address, signature } = req.body;
  if (!wallet_address || !signature) {
    return res.status(400).json({ error: 'Wallet address and signature are required' });
  }

  const challenge = challenges.get(wallet_address);
  if (!challenge) {
    return res.status(400).json({ error: 'Challenge not found or expired' });
  }

  try {
    const challengeData = generateTypedData(challenge);
    const isCorrect = await account.verifyMessage(challengeData, signature);
    if (!isCorrect) {
        console.log('challenge:', challenge);
        console.log('challengeData:', challengeData);
        console.log('signature:', signature);
        console.log('Invalid signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Authentication successful
    // Here you can generate a JWT token or session for the user
    res.json({ message: 'Authentication successful', success: true });

    // Clean up the challenge
    challenges.delete(wallet_address);
  } catch (error) {
    console.log('Error during verification:', error);
    res.status(401).json({ error: 'Invalid signature' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});