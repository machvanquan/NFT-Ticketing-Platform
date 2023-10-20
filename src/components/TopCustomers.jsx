import React from "react";
import { customers } from "../data";


const TopCustomers = () => {
  return (
    <>
      <section className="section hero " aria-label="home">
        <div className="container">
          <h1 className="headline-lg hero-title">
            <span className="span">NFTick</span>{" "}Top Customers
          </h1>
        </div>
      </section>

      <section>
        <div className="container">
          <ul className="grid-list">
            {customers.map((card, index) => (
              <li key={index}>
                <div className="discover-card card">
                  <div className="card-banner img-holder">
                    <img
                      src={card?.avatar}
                      width="500"
                      height="500"
                      loading="lazy"
                      alt="Windchime #768/"
                      className="img-cover"
                    />


                  </div>

                  <div className="card-profile">
                    <img
                      src={card?.avatar}
                      width="32"
                      height="32"
                      loading="lazy"
                      alt="CutieGirl profile/"
                      className="img"
                    />

                    <a href="#" className="link:hover">
                      {card?.creator}
                    </a>
                  </div>

                  <h3 className="title-sm card-title">
                    <a href="#" className="link:hover">
                      {card?.title}
                    </a>
                  </h3>

                  <div className="card-meta">
                    <div>
                      <p>Total</p>

                      <div className="card-price">
                        <img
                          src="./assets/images/solana.svg"
                          width="16"
                          height="24"
                          loading="lazy"
                          alt="ethereum icon"
                        />&nbsp;

                        <span className="span"> 1 SOL</span>
                      </div>
                    </div>

                    <div>
                      <p>Highest Bid</p>

                      <div className="card-price">
                        <img
                          src="./assets/images/solana.svg"
                          width="16"
                          height="24"
                          loading="lazy"
                          alt="ethereum icon"
                        />

                        <span className="span">1.55 SOL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <a href="#" className="btn-link link:hover">
            <span className="span">Explore More</span>
            <ion-icon name="arrow-forward"></ion-icon>
          </a>
        </div>
      </section>
    </>
  );
};

export default TopCustomers;
