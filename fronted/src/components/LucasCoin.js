import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import contractabi from "../../LucasCoin.json";

export default function LucasCoin({ accounts }) {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const abi = contractabi.abi;
  const [balance, setBalance] = useState(null);
  const [mintAmount, setMintAmount] = useState(1);

  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const mintAmountInETH = ethers.utils.parseUnits(
          mintAmount.toString(),
          18
        );
        const response = await contract.mint(mintAmountInETH);
        console.log("Minting response", response);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function fetchBalance() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, provider);
      try {
        const userBalance = await contract.balanceOf(accounts[0]);
        const formattedBalance = parseFloat(
          ethers.utils.formatUnits(userBalance, 18)
        ).toFixed(2);
        setBalance(formattedBalance);
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    if (isConnected) {
      fetchBalance();
      const interval = setInterval(fetchBalance, 1000);
      return () => clearInterval(interval);
    }
  }, [accounts, isConnected]);

  return (
    <div>
      <div className="flex flex-col flex-grow justify-center items-center mt-20 mb-12">
        <p className="font-bold text-5xl">Mint Coin</p>
        {isConnected ? (
          <>
            <p className="mt-10 font-semibold text-3xl">
              Start minting your first token.
            </p>
            <Input
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              type="number"
              min="0"
              placeholder="Mint your LucasCoin"
              className="w-80 h-10 mt-12 mb-4"
            />
            <Button onClick={handleMint} className="w-80">
              Mint LucasCoin
            </Button>
            <p className="mt-10 font-medium">
              Current LucasCoin token balance:
              {balance !== null ? `${balance} ETH` : "正在加载中..."}
            </p>
          </>
        ) : (
          <p className="text-black-500 text-3xl font-bold py-32">
            Please connect your wallet to mint LucasCoin.
          </p>
        )}
      </div>
    </div>
  );
}
