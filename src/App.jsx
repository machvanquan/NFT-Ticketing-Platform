import React, { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/CreateEvent";
import Buy from "./pages/BuyNFT";

import ListAll from "./pages/ListAll";
import ReadNFT from "./pages/ReadNFT";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  AlphaWalletAdapter,
  BitKeepWalletAdapter,
  CensoWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  NekoWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";

function App() {
  const solNetwork = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
  // initialise all the wallets you want to use
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new AlphaWalletAdapter(),
      new BitKeepWalletAdapter(),
      new CensoWalletAdapter(),
      new Coin98WalletAdapter(),
      new NekoWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new CloverWalletAdapter(),
    ],
    [solNetwork]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/buy" element={<Buy />} />
              <Route path="/create" element={<Create />} />
              <Route path="/listall" element={<ListAll />} />
              <Route path="/get-details" element={<ReadNFT />} />
            </Routes>
          </BrowserRouter>
          <div className="body-bg-shape"></div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
