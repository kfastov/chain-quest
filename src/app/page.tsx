import dynamic from 'next/dynamic';
const WalletBar = dynamic(() => import('../components/WalletBar'), { ssr: false })
const SignatureLogin = dynamic(() => import('../components/SignatureLogin'), { ssr: false });

import Image from "next/image";

export default function Home() {  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="p-4 bg-white shadow-md">
        <WalletBar />
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Login or Signup</h2>
          <SignatureLogin />
        </div>
      </main>
    </div>
  );
}
