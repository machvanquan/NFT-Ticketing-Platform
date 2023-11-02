import React, { useState } from "react";
import { Link } from "react-router-dom";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

const Navbar = () => {
  
  const [wallID, setWallID] = useState("");
  const [connStatus, setConnStatus] = useState(false);
  const [network, setNetwork] = useState("devnet");
  const [nav, setNav] = useState("");
  
  const navbarHandler = () => {
    if (nav) {
      setNav("");
    } else {
      setNav("active");
    }
  };

  // Phantom Adaptor
  const solanaConnect = async () => {
    console.log("Solana Connect !");
    const { solana } = window;
    if (!solana) {
      alert("Please Install Solana");
    }

    try {
      const network = "devnet";
      const phantom = new PhantomWalletAdapter();
      await phantom.connect();
      const rpcUrl = clusterApiUrl(network);
      const connection = new Connection(rpcUrl, "confirmed");
      const wallet = {
        address: phantom.publicKey.toBase58(),
      };

      if (wallet.address) {
        console.log(wallet.address);
        setWallID(wallet.address);
        const accountInfo = await connection.getAccountInfo(
          new PublicKey(wallet.address),
          "Confirmed"
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
      <header className="header" data-header>
        <div className="container">
          <Link to="/">
            <img
              src="/assets/images/logo-small.svg"
              width="40"
              height="40"
              alt="home"
              className="logo-small"
            />
          </Link>
         <Link to="/">
         <h1 className="headline-sm hero-title">
            <span className="span">&nbsp;NFTick</span>
          </h1>
         </Link>
          <nav className={`navbar ${nav}`}>
            <ul className="navbar-list">
              <li>
                <Link to="/" className="navbar-link label-lg link:hover">
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/buy" className="navbar-link label-lg link:hover">
                  BUY TICKET
                </Link>
              </li>
              <li>
                <Link to="/create" className="navbar-link label-lg link:hover">
                  CREATE EVENT
                </Link>
              </li>
              <li>
                <Link
                  to="/listall"
                  className="navbar-link label-lg link:hover">
                  MY NFT
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-action">
            <button
              className="btn-icon primary"
              aria-label="wallet"
              onClick={solanaConnect}
            >
              <ion-icon name="wallet-outline"></ion-icon>
            </button>

            <Link to="#"
              className="btn-icon profil-btn"
              aria-label="Metalink account: Fiona doe"
            >
              <img
                src="/assets/images/profile.jpg"
                width="50"
                height="50"
                alt="Fiona doe"
                className="img-cover"
              />
            </Link>
            <button className={`nav-toggle-btn ${nav}`} onClick={navbarHandler}>
              {!nav ? (
                <ion-icon
                  name="menu-outline"
                  className="default-icon"
                ></ion-icon>
              ) : (
                <ion-icon
                  name="close-outline"
                  aria-hidden="true"
                  className="active-icon"
                ></ion-icon>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
