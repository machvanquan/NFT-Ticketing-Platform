import React, { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Mint from "./components/Mint";
import Marketplace from "./components/Marketplace";
import History from "./components/History";
import Customer from "./components/Customer";
import Stats from "./components/Stats";
import DetailsCustomer from "./components/DetailsCustomer";
import QRCodeGenerator from "./components/QRCodeGenerator";

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
              <Route path="/home" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/mint" element={<Mint />} />
              <Route path="/listall" element={<ListAll />} />
              <Route path="/history" element={<History />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/get-details" element={<ReadNFT />} />
              <Route path="/profile" element={<DetailsCustomer />} />
              <Route path="/qrcode" element={<QRCodeGenerator />} />
            </Routes>
              <Newsletter />
              <Footer />
          </BrowserRouter>
          <div className="body-bg-shape"></div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
