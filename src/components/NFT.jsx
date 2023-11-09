import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { signAndConfirmTransactionFe } from "../service/Utilityfunc";

import { Link } from "react-router-dom";

import "../assets/css/custom2.css";
import "../assets/css/custom3.css";

import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { useWallet } from "@solana/wallet-adapter-react";

const ListAll = () => {
  const xKey = "PczduUU_nB0jwN8e";
  const { publicKey } = useWallet();
  const [wallID, setWallID] = useState("");
  const [network, setNetwork] = useState("devnet");
  const [isLoaded, setLoaded] = useState(false);
  const [dataFetched, setDataFetched] = useState();
  const [nfts, setNfts] = useState();
  const [price, setPrice] = useState(1);
  const [loading, setLoading] = useState(false);
  const [connStatus, setConnStatus] = useState(false);
  const [isLoadedMarketPlaceNFTs, setIsLoadedMarketPlaceNFTs] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setConnStatus(true);
        await getNFTsFromMarketPlace(isLoadedMarketPlaceNFTs);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const delayFetch = () => {
      setTimeout(() => {
        fetchData();
      }, 500);
    };

    delayFetch();

    return () => {
      // Logic dọn dẹp ở đây, nếu cần
    };
  }, []);




  const getNFTsFromMarketPlace = () => {
    const marketplaceAddress = "3y4rUzcCRZH4TstRJGYmUUKuod8hd4Rvu2Fnf2FhQoY4";

    let nftUrl = `https://api.shyft.to/sol/v1/marketplace/active_listings?network=devnet&marketplace_address=${marketplaceAddress}`;

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
        if (res.data.success === true) {
          setNfts(res.data);
          setIsLoadedMarketPlaceNFTs(true);
        } else {
          setNfts([]);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const callback = (signature, result) => {
    console.log("Signature ", signature);
    console.log("result ", result);
    if (signature.err === null) {
      setStatus("success: Successfully Signed and Minted.");
    }
  };

  const fetchNFTs = () => {
    //Note, we are not mentioning update_authority here for now
    let nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=${network}&address=${publicKey.toBase58()}`;
    axios({
      // Endpoint to send files
      url: nftUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
      },
      // Attaching the form data
    })
      // Handle the response from backend here
      .then((res) => {
        console.log(res.data);
        setDataFetched(res.data);
        setLoaded(true);
      })

      // Catch errors if any
      .catch((err) => {
        console.warn(err);
      });
  };

  const UnlistNFT = async (listState) => {
    let nftUrl = `https://api.shyft.to/sol/v1/marketplace/unlist`;

    try {
        setLoading(true);
        const response = await axios({
            url: nftUrl,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": xKey,
            },
            data: {
                network: 'devnet',
                marketplace_address: "3y4rUzcCRZH4TstRJGYmUUKuod8hd4Rvu2Fnf2FhQoY4",
                list_state: listState,
                seller_wallet: publicKey.toBase58(),
                fee_payer: publicKey.toBase58()
            }
        });

        if (response.data.success === true) {
            const transaction = response.data.result.encoded_transaction;
            const ret_result = await signAndConfirmTransactionFe(
                'devnet',
                transaction,
                callback
            );
            await fetchNFTs(); // Reload NFTs after successful unlisting
            console.log(ret_result);

            // Update the state to reflect the change
            setNfts((prevNfts) => ({
                ...prevNfts,
                result: prevNfts.result.filter(
                    (nft) => nft.list_state !== listState
                )
            }));
        } else {
            // Handle unlisting error
        }
        setLoading(false);
    } catch (error) {
        console.error(error);
        setLoading(false);
    }
};

  return (
    <>
      <section className="section hero" aria-label="home">
        <div className="container">
          <h1 className="headline-lg hero-title">
            <a className="span" onClick={fetchNFTs}
            style={{cursor:"pointer"}}>
              MY LIST NFT
            </a>
          </h1>
        </div>
        </section>

      <section>
        <div className="container">
          <div className="cards-section py-4">
            <ul className="grid-list">
              {isLoaded &&
                dataFetched.result.map((item) => (
                  <li key={item.mint}>
                    <div className="discover-card card">
                      <div className="card-banner img-holder">
                        <img
                          src={item.image_uri}
                          loading="lazy"
                          alt="Windchime #768/"
                          className="img-cover"
                        />
                        {nfts.result.some(
                          (nft) => nft.nft_address === item.mint
                        ) ? (
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              UnlistNFT(
                                nfts.result.find(
                                  (nft) => nft.nft_address === item.mint
                                ).list_state
                              )
                            }
                          >
                            <ion-icon name="flash"></ion-icon>
                            <span className="span">Unlist</span>
                          </button>
                        ) : (                        
                         <div>
                            <button
                            className="btn btn-primary"
                            onClick={() =>
                              UnlistNFT(
                                nfts.result.find(
                                  (nft) => nft.nft_address === item.mint
                                ).list_state
                              )
                            }
                          >                          
                            <ion-icon name="flash"></ion-icon>
                            <span className="span">List</span>
                          </button>
                         </div>
                        )}
                      </div>
                      <h2 className="title-sm card-title text-center">
                        <a href={`/get-details?token_address=${item.mint}&apiKey=${xKey}`}
                          className="link:hover">
                          {item.name}
                        </a>
                      </h2>
                      <div className="card-meta">                       
                        <div>
                          <p>Location</p>

                          <div className="card-price">
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/4284/4284088.png"
                              width="24"
                              height="24"
                              loading="lazy"
                              alt="ethereum icon"
                            />
                            <span className="span">{item.attributes.Location}</span>
                          </div>
                        </div>
                        <div>
                          <p>Start Time</p>

                          <div className="card-price">
                            <img
                              src="https://www.iconpacks.net/icons/2/free-time-icon-3487-thumb.png"
                              width="24"
                              height="24"
                              loading="lazy"
                              alt="ethereum icon"
                            />
                            <span className="span">{item.attributes.Time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="card-profile text-center">
                        <a href={`/get-details?token_address=${item.mint}&apiKey=${xKey}`} className="link:hover" style={{fontSize:13}}>
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
      <br />
      <br />
    </>
  );
};

export default ListAll;
