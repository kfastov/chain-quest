import dynamic from 'next/dynamic';
const WalletBar = dynamic(() => import('../components/WalletBar'), { ssr: false })
const RegistrationForm = dynamic(() => import('../components/RegistrationForm'), { ssr: false });

import Image from "next/image";

export default function Home() {  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="bg-white p-4 border-black border">
            <h2 className="text-xl font-bold mb-2">Wallet Connection</h2>
          <WalletBar />
          <RegistrationForm />
        </div>
      </main>
    </div>
  );
}
