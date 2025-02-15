import Link from "next/link";
import React from "react";
import github from "../public/assets/github.png";
import Image from "next/image";
import { ethers } from "ethers";
import { Button } from "./ui/button";

export default function Navbar({ accounts, setAccounts }) {
  const isConnected = Boolean(accounts[0]);

  async function connectWallet() {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccounts(accounts);
      } else {
        alert("Please install MetaMask");
      }
    } catch (error) {
      console.error("Failed to connect to accounts", error);
    }
  }

  return (
    <div className="flex justify-between text-xl items-center px-6 py-3">
      <Link href={"https://github.com/LucasHayess"} target="_blank">
        <div className="flex items-center space-x-1">
          <Image src={github} alt="github" width={36} height={36} />
          <span>@LucasHayess</span>
        </div>
      </Link>
      {isConnected ? (
        <Button variant="default">Connected</Button>
      ) : (
        <Button variant="default" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
