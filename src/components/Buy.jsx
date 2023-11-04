import React from "react";

import { useState } from "react";
import axios from "axios";
import '../assets/css/custom2.css';
import '../assets/css/custom3.css';
import { signAndConfirmTransactionFe } from "./utilityfunc";

import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

const Buy = () => {

  const xKey = "PczduUU_nB0jwN8e";
  const [wallID, setWallID] = useState("");
  const [network, setNetwork] = useState("devnet");
  const [isLoaded, setLoaded] = useState(false);
  const [connStatus, setConnStatus] = useState(false);
  const [isLoadedMarketPlaceNFTs, setIsLoadedMarketPlaceNFTs] = useState(false);
  const [dataFetched, setDataFetched] = useState();
  const [nfts, setNfts] = useState();
  const [loading, setLoading] = useState(false);
  const [ownerId, setOwnerId] = useState("");

  // Phantom Adaptor
  const solanaConnect = async () => {
    console.log("Clicked solana connect");
    const { solana } = window;
    if (!solana) {
      alert("Please Install Solana");
    }

    try {
      //const network = "devnet";
      const phantom = new PhantomWalletAdapter();
      await phantom.connect();
      const rpcUrl = clusterApiUrl(network);
      const connection = new Connection(rpcUrl, "confirmed");
      const wallet = {
        address: phantom.publicKey.toString(),
      };

      if (wallet.address) {
        console.log(wallet.address);
        setWallID(wallet.address);
        const accountInfo = await connection.getAccountInfo(
          new PublicKey(wallet.address),
          "confirmed"
        );
        console.log(accountInfo);
        setConnStatus(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
     <section className="section hero" aria-label="home">
        <div className="container">
          <h1 className="headline-lg hero-title">
            <span className="span">Marketplace</span>
          </h1>
        </div>
      </section>
      
    </>
  );
}

export default Buy;
