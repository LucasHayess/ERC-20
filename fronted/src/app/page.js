"use client";
import LucasCoin from "@/components/LucasCoin";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Home() {
  const [accounts, setAccounts] = useState([]);
  return (
    <div>
      <Navbar accounts={accounts} setAccounts={setAccounts} />
      <LucasCoin accounts={accounts} />
    </div>
  );
}
