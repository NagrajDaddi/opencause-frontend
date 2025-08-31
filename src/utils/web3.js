import { ethers } from "ethers";

// Connect MetaMask
export const connectWallet = async () => {
  if (!window.ethereum) {
    alert("MetaMask not found! Please install it.");
    return null;
  }
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0]; // return first account
  } catch (err) {
    console.error("Wallet connection failed:", err);
    return null;
  }
};

// Get Ethereum provider
export const getProvider = () => {
  if (!window.ethereum) {
    console.error("MetaMask not found!");
    return null;
  }
  return new ethers.BrowserProvider(window.ethereum);
};

// Example: Get contract instance
export const getContract = (contractAddress, abi) => {
  const provider = getProvider();
  if (!provider) return null;
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, abi, signer);
};
