import React from "react";
import { items } from "../data";

function Buy() {
  return (
    <>
     <section className="section hero" aria-label="home">
        <div className="container">
          <h1 className="headline-lg hero-title">
            <span className="span">Marketplace</span>
          </h1>
        </div>
      </section>
      <section className="section discover" aria-labelledby="discover-label">
        <div className="container">       
          <ul className="grid-list">
            {items.map((card, index) => (
              <li key={index}>
                <div className="discover-card card">
                  <div className="card-banner img-holder">
                    <img
                      src={card?.banner}
                      width="500"
                      height="500"
                      loading="lazy"
                      alt="Windchime #768/"
                      className="img-cover"
                    />

                    <button className="btn btn-primary">
                      <ion-icon name="flash"></ion-icon>

                      <span className="span">Buy now</span>
                    </button>
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
                      @{card?.artist}
                    </a>
                  </div>

                  <h3 className="title-sm card-title">
                    <a href="#" className="link:hover">
                      {card?.title}
                    </a>
                  </h3>

                  <div className="card-meta">
                    <div>
                      <p>Price</p>

                      <div className="card-price">
                        <img
                          src="./assets/images/solana.svg"
                          width="16"
                          height="24"
                          loading="lazy"
                          alt="ethereum icon"
                        />
                        &nbsp;
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
}

export default Buy;
