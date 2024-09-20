"use client";

import { useConnect, useDisconnect, useAccount } from '@starknet-react/core';

const WalletBar: React.FC = () => {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  return (
    <div className="flex justify-end items-center">
      {!address ? (
        <div className="flex gap-2">
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
              className="border border-black text-black font-regular py-1 px-2 text-sm bg-yellow-300 hover:bg-yellow-500"
            >
              Connect {connector.id}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="text-sm bg-gray-200 px-2 py-1 text-black">
            {address.slice(0, 6)}...{address.slice(-4)}
          </div>
          <button
            onClick={() => disconnect()}
            className="border border-black text-black font-regular py-1 px-2 text-sm bg-yellow-300 hover:bg-yellow-500"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletBar;
