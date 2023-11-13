import React from 'react'
import { creator_data } from "../data";
import axios from 'axios';
import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from 'react';
export default function Customer() {
    const [network, setNetwork] = useState("devnet");
    const {publickey} = useWallet();
    const xKey = "PczduUU_nB0jwN8e";
    const [data, setData] = useState();
    const [leg, setLeg ] = useState(0);
    const [ownerId, setOwnerId] = useState("");
    const [dataFetched, setDataFetched] = useState();
    const [isLoaded, setLoaded] = useState(false);
    const fetchData= () =>{
        let Url1 =`https://api.shyft.to/sol/v1/marketplace/active_sellers?network=devnet&marketplace_address=3y4rUzcCRZH4TstRJGYmUUKuod8hd4Rvu2Fnf2FhQoY4`;
        axios({
            url: Url1,
            method: 'GET',
            headers:{
                "x-api-key": xKey,
            }

        }).then((res) => {
            console.log(res.data);
            setLeg(res.data.result.length);
            setData(res.data.result);
            
        }) .catch((err) => {
            console.warn(err);
          });
    }
    useEffect(() => {
        fetchData();
    }, [network, publickey]); 

    const findOwner = (seller_address) => {
        let nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=${network}&address=${seller_address}`;
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
            setOwnerId(seller_address);
            setLoaded(true);
          })
          .catch((err) => {
            console.warn(err);
          });
      };
    return (
        <>
            <section className="section hero" aria-label="home">
                <div className="container">
                
                    <h1 className="headline-lg hero-title">
                        <span className="span">CUSTOMER ({leg})</span>
                    </h1>
                </div>
            </section>
            <section className="section sellers" aria-labelledby="sellers-label">

                <div className="container">

                    <ul className="grid-list">
                        {data && data.map((index) => (
                            <li key={index}>
                                <div className="seller-card card">
                                    <figure className="card-banner">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw32hfMGruE7CI9vvirzcJP9czXjECV7l-ww&usqp=CAU"
                                            width="64"
                                            height="64"
                                            loading="lazy"
                                            alt="Steven Townsend profile"
                                        />
                                        <ion-icon name="checkmark-circle"></ion-icon>
                                    </figure>

                                    <div className="card-title-wrapper">
                                        <h3 className="title-sm">
                                            <a href="#" className="link:hover" style={{fontSize:12}}>
                                                {index}
                                            </a>
                                        </h3>

                                        <p className="user-name label-md"></p>
                                    </div>

                                    <button
                                        className="btn-icon outline"
                                        aria-label="Hire Steven Townsend"
                                        onClick={() => findOwner(index)}
                                    >
                                        <ion-icon name="eye-outline"></ion-icon>
                                    </button>
                                    
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section className='container row'>
            {isLoaded &&
              dataFetched.result.map((item) => (
                <div className="col-xs-12 col-sm-4 mb-5" key={item.mint}>
                  <div className="card bg-light">
                    <div className="card-header text-dark text-center">
                      <h2>{item.name}</h2>
                    </div>
                    <div className="card-body" >
                      <a
                        // href={`/get-details?token_address=${item.mint}`}
                        // target="_blank"
                        // rel="noreferrer"
                      >
                        <img
                          className="img-fluid"
                          src={item.image_uri}
                          alt="img" style={{width:300, height:250}}
                        />
                      </a>
                    
                    </div>
                    <div className="card-body">
                      <a
                        href={`/get-details?token_address=${item.mint}`}                 
                      >
                      {item.mint}
                      </a>                   
                    </div>
                  </div>
                </div>
              ))}
            </section>
        </>
    )
}