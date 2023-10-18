import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState("");
  const navbarHandler = () => {
    if (nav) {
      setNav("");
    } else {
      setNav("active");
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
          <a href="#">NFTick</a>
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
                  CREATE EVENT NOW
                </Link>
              </li>
              <li>
                <Link to="/customers" className="navbar-link label-lg link:hover">
                  TOP CUSTOMERS
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-action">
            <button className="btn-icon primary" aria-label="wallet">
              <ion-icon name="wallet-outline"></ion-icon>
            </button>
            
            <button
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
            </button>
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
