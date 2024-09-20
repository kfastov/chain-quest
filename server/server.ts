import express from 'express';
import cors from 'cors';
import prisma from './services/db';
import { stark, hash, typedData, Account, RpcProvider, SignerInterface } from 'starknet';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const provider = new RpcProvider({
  nodeUrl: process.env.RPC_ENDPOINT,
});

function generateToken(user: { id: number, wallet_address: string }): string {
    return jwt.sign({ id: user.id, wallet_address: user.wallet_address }, JWT_SECRET, { expiresIn: '1d' });
}

// Add this import at the top of the file
import { Request as ExpressRequest } from 'express';

// Add this type declaration
interface Request extends ExpressRequest {
  user?: jwt.JwtPayload;
}

// Update the authenticateToken function signature
function authenticateToken(req: Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, JWT_SECRET as string, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user as jwt.JwtPayload;
      next();
    });
}

// initialize existing predeployed account
console.log("ACCOUNT_ADDRESS:", process.env.DEPLOYER_ADDRESS);
const privateKey = process.env.DEPLOYER_PRIVATE_KEY ?? "";
const accountAddress: string = process.env.DEPLOYER_ADDRESS ?? "";
const signer = new Account(provider, accountAddress, privateKey);

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

// Update the route handler signature
app.get('/api/users/me', authenticateToken, async (req: Request, res) => {
    try {
      console.log('Fetching user data for wallet address:', req.user?.wallet_address);
      const user = await prisma.user.findUnique({
        where: { wallet_address: req.user?.wallet_address },
        select: { id: true, wallet_address: true, nickname: true }
      });
      res.json({ message: 'This is a protected route', user });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Error fetching user data' });
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
    const account = new Account(provider, wallet_address, null as unknown as SignerInterface);
    const isCorrect = await account.verifyMessage(challengeData, signature);
    if (!isCorrect) {
        console.log('Invalid signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Authentication successful
    // Add user to the database
    try {
      const user = await prisma.user.upsert({
        where: { wallet_address },
        update: {}, // Update nothing if user exists
        create: { wallet_address }, // Create new user if not exists
      });

      // Generate a JWT token or session for the user (implementation depends on your auth strategy)
      const token = generateToken(user);

      res.json({ 
        message: 'Authentication successful', 
        success: true,
        user: { id: user.id, wallet_address: user.wallet_address },
        token: token, // Uncomment if using JWT
      });
    } catch (dbError) {
      console.error('Error adding user to database:', dbError);
      return res.status(500).json({ error: 'Error adding user to database' });
    }

    // Clean up the challenge
    challenges.delete(wallet_address);
  } catch (error) {
    console.log('Error during verification:', error);
    res.status(401).json({ error: 'Invalid signature' });
  }
});

// Add this new endpoint
app.put('/api/users/update/self', authenticateToken, async (req: Request, res) => {
  if (!req.user || !req.user.wallet_address) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { nickname, starknet_id } = req.body;
  
  try {
    const updatedUser = await prisma.user.update({
      where: { wallet_address: req.user.wallet_address },
      data: {
        nickname: nickname || undefined,
        starknet_id: starknet_id || undefined,
      },
    });

    res.json({
      message: 'User updated successfully',
      user: {
        id: updatedUser.id,
        wallet_address: updatedUser.wallet_address,
        nickname: updatedUser.nickname,
        starknet_id: updatedUser.starknet_id,
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});