import { useState } from "react";

export default function WalletConnect() {
  const [account, setAccount] = useState(null);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (err) {
        console.error("User rejected request:", err);
      }
    } else {
      alert("MetaMask not found. Please install it.");
    }
  }

  return (
    <div>
      {account ? (
        <p className="text-green-600 font-semibold">Connected: {account}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
