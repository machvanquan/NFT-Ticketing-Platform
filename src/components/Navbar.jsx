import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';


const Navbar = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [wallID, setWallID] = useState("");
  const [connStatus, setConnStatus] = useState(false);
  const [network, setNetwork] = useState("devnet");
  const [nav, setNav] = useState("");

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
          <div>
            <h1 className="headline-sm hero-title" 
            style={{             
              fontFamily: "fantasy",
              fontSize: 37,
              letterSpacing: 1,
              marginTop:6,
              }}>
              <span className="span">&nbsp;NFTicK</span>
            </h1>
          </div>
          <nav className={`navbar ${nav}`}>
            <ul className="navbar-list">
              <li>
                <Link to="/" className="navbar-link label-lg link:hover">
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/buy" className="navbar-link label-lg link:hover">
                MARKETPLACE
                </Link>
              </li>
              <li>
                <Link to="/create" className="navbar-link label-lg link:hover">
                  MINT NFT
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
          
            <WalletMultiButton />   

            <Link to="#"
              className="btn-icon profil-btn"
              aria-label="Metalink account: Fiona doe">
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
    </>
  );
};

export default Navbar;
