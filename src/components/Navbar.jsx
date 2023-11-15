import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const Navbar = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [wallID, setWallID] = useState("");
  const [connStatus, setConnStatus] = useState(false);
  const [network, setNetwork] = useState("devnet");
  const [nav, setNav] = useState("");

  return (
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
        <div>
          <h1
            className="headline-sm hero-title"
            style={{
              fontFamily: "fantasy",
              fontSize: 37,
              letterSpacing: 1,
              marginTop: 6,
            }}
          >
            <span className="span">&nbsp;NFTicK</span>
          </h1>
        </div>
        <nav className={`navbar ${nav}`}>
          <ul className="navbar-list">
            <li>
              <Link to="/home" className="navbar-link label-lg link:hover">
                Home
              </Link>
            </li>
            <li>
              <Link to="/marketplace" className="navbar-link label-lg link:hover">
                Marketplace
              </Link>
            </li>
            <li>
              <Link to="/mint" className="navbar-link label-lg link:hover">
                Mint NFT
              </Link>
            </li>
            <li>
              <Link to="/listall" className="navbar-link label-lg link:hover">
                My NFTs
              </Link>
            </li>
            <li>
              <Link to="/customer" className="navbar-link label-lg link:hover">
                Top Customer
              </Link>
            </li>
            <li>
              <Link to="/stats" className="navbar-link label-lg link:hover">
                STATS
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-action">
          <WalletMultiButton />

          <Link
            to="/history"
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;
