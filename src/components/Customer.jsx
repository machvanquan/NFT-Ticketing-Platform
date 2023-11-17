import React from "react";
import { creator_data } from "../data";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
export default function Customer() {
  const [network, setNetwork] = useState("devnet");
  const { publickey } = useWallet();
  const xKey = "PczduUU_nB0jwN8e";
  const [data, setData] = useState();
  const [leg, setLeg] = useState(0);

  const fetchData = () => {
    let Url1 = `https://api.shyft.to/sol/v1/marketplace/active_sellers?network=devnet&marketplace_address=3y4rUzcCRZH4TstRJGYmUUKuod8hd4Rvu2Fnf2FhQoY4`;
    axios({
      url: Url1,
      method: "GET",
      headers: {
        "x-api-key": xKey,
      },
    })
      .then((res) => {
        console.log(res.data);
        setLeg(res.data.result.length);
        setData(res.data.result);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, [network, publickey]);


  return (
    <>
      <section className="section hero" aria-label="home">
        <div className="container">
          <h1 className="headline-lg hero-title  ml-5">
            <span className="span  ml-5">CUSTOMER ({leg})</span>
          </h1>
        </div>
      </section>
      <section className="section sellers" aria-labelledby="sellers-label">
        <div className="container">
          <ul className="grid-list row col-12">
            {data &&
              data.map((index) => (
                <li key={index}>
                  <div className="seller-card card">
                    <figure className="card-banner">
                      <img
                        src="https://i.redd.it/7432hkvv8os71.gif"
                        width="90"
                        height="90"
                        loading="lazy"
                        alt="Steven Townsend profile"
                      />
                      <ion-icon name="checkmark-circle"></ion-icon>
                    </figure>
                    <h1 className="hero-title" style={{fontWeight:"bold"}}>
                      <span className="span">OWNER</span>
                    </h1>
                    <div className="card-title-wrapper">
                      <h3 className="title-sm text-light">
                        <a
                          href={`/profile?seller_address=${index}`}                        
                          className="link:hover"
                          style={{ fontSize: 12.5 }}
                        >
                          {index}
                        </a>
                      </h3>

                      <p className="user-name label-md"></p>
                    </div>

                    <a
                      className="btn-icon outline"
                      aria-label="Hire Steven Townsend"
                      href={`/profile?seller_address=${index}`}
                    >
                      <ion-icon name="eye-outline"></ion-icon>
                    </a>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </section>

    </>
  );
}
