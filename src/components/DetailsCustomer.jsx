import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import queryString from 'query-string';

const DetailsCustomer = () => {
  const [ownerId, setOwnerId] = useState("");
  const xKey = "PczduUU_nB0jwN8e";
  const [dataFetched, setDataFetched] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [network, setNetwork] = useState("devnet");

  const href = window.location.href;
  const parsed = queryString.parseUrl(href);
  const sellerAddress = parsed.query.seller_address;


  const findOwner = () => {
    let nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=${network}&address=${sellerAddress}`;
    axios({
      url: nftUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
      },
    })
      .then((res) => {
        console.log(res.data);
        setDataFetched(res.data);
        setOwnerId(sellerAddress);
        setLoaded(true);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  useEffect(() => {
    findOwner();
    console.log(sellerAddress);
  }, []);

  return (
    <>
        <section className="section hero" aria-label="home">
        <div className="container">                           
                    <div className="seller-card card"  style={{
                        backgroundImage: `url("https://pbs.twimg.com/media/E_BBs7FVgAQFjng?format=jpg&name=large")`,
                      }}>                  
                    <figure className="card-banner">
                      <img
                        src="https://i.redd.it/7432hkvv8os71.gif"
                        width="200"
                        height="200"
                        loading="lazy"
                        alt="Steven Townsend profile"
                      />
                      <ion-icon name="checkmark-circle"></ion-icon>
                    </figure>                                                                              
                  </div>    
                  <h1 className="hero-title text-center mt-5" style={{fontWeight:"bold"}}>
                      <span className="span m-3">OWNER : {ownerId}</span>      
                  </h1>                                                        
        </div>
      </section>
    
      <section>
          <div className="container">            
            <div className="cards-section py-4">
              <ul className="grid-list">
                {isLoaded &&
                  dataFetched.result
                    .sort(
                      (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    )
                    .map((item) => (
                      <li key={item.mint} style={{ height: 400, width: 340 }} >
                        <div
                      className="discover-card card ml-4"
                      style={{
                        width: 320, 
                        backgroundImage: `url("https://www.nftically.com/blog/wp-content/uploads/2022/09/How-Can-NFT-Ticketing-Disrupt-the-Ticketing-Industry_.jpg")`,
                      }}

                    >
                           <div
                        className="card-banner img-holder"
                        style={{
                          height: 250,
                          border: "1px solid gray"
                        }}
                      >
                            <img
                              src={item.image_uri}
                              loading="lazy"
                              alt="Windchime #768/"
                              className="img-cover"
                            />
                           
                          </div>
                  
                          <h1 className="hero-title text-center mt-4" style={{fontWeight:"bold"}}>
                            <span className="span">{item.name}</span>
                          </h1>
                     
                        <div className="text-center text-light mb-4 mt-3">                           
                              <a
                                href={`/get-details?token_address=${item.mint}`}
                                style={{ fontSize: 11 }}>
                                {item.mint}
                              </a>
                            </div>
                        </div>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </section>

    </>
  )
}

export default DetailsCustomer