import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";

import { signAndConfirmTransactionFe } from "../service/Utilityfunc";

import { useWallet } from "@solana/wallet-adapter-react";

const Marketplace = () => {
  const xKey = "PczduUU_nB0jwN8e";
  const [wallID, setWallID] = useState("");
  const { publicKey } = useWallet();
  const [network, setNetwork] = useState("devnet");
  const [isLoaded, setLoaded] = useState(false);
  const [connStatus, setConnStatus] = useState(false);
  const [isLoadedMarketPlaceNFTs, setIsLoadedMarketPlaceNFTs] = useState(false);
  const [dataFetched, setDataFetched] = useState();
  const [nfts, setNfts] = useState();
  const [loading, setLoading] = useState(false);
  const [ownerId, setOwnerId] = useState("");
  const [length, setLength] = useState(0);

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
      }, 1000);
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
          setLength(res.data.result.length);
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
      setMinted(saveMinted);
      setStatus("success: Successfully Signed and Minted.");
    }
  };

  const buyNow = (nftAddr, price, sellerAddress) => {
    let nftUrl = `https://api.shyft.to/sol/v1/marketplace/buy`;
    setLoading(true);
    axios({
      url: nftUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
      },
      data: {
        network: "devnet",
        marketplace_address: "3y4rUzcCRZH4TstRJGYmUUKuod8hd4Rvu2Fnf2FhQoY4",
        nft_address: nftAddr,
        price: Number(price),
        seller_address: sellerAddress,
        buyer_wallet: publicKey.toBase58(),
      },
    })
      .then(async (res) => {
        if (res.data.success === true) {
          const transaction = res.data.result.encoded_transaction;
          const ret_result = await signAndConfirmTransactionFe(
            "devnet",
            transaction,
            callback
          );
          console.log(ret_result);
        }
        setLoading(false);    
      })
      .catch((err) => {
        console.warn(err);
        setLoading(false);
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
          network: "devnet",
          marketplace_address: "3y4rUzcCRZH4TstRJGYmUUKuod8hd4Rvu2Fnf2FhQoY4",
          list_state: listState,
          seller_wallet: publicKey.toBase58(),
          fee_payer: publicKey.toBase58(),
        },
      });

      if (response.data.success === true) {
        const transaction = response.data.result.encoded_transaction;
        const ret_result = await signAndConfirmTransactionFe(
          "devnet",
          transaction,
          callback
        );
        console.log(ret_result);

        setNfts((prevNfts) => ({
          ...prevNfts,
          result: prevNfts.result.filter((nft) => nft.list_state !== listState),
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
            <span className="span">MARKETPLACE ({length})</span>
          </h1>
        </div>
      </section>
      
      <div className="container content">
        <div className="gradient-background">
          {/* ... (other JSX content) */}
          {loading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
            </div>
          )}
        </div>      

        <section className="container">
          <div className="cards-section py-4">
            <ul className="grid-list">
              {isLoadedMarketPlaceNFTs &&
                nfts.result
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((item) => (
                  <li key={item.nft_address}>
                    <div
                      className="discover-card card"
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
                          src={item.nft.image_uri}
                          loading="lazy"
                          alt="Windchime #768/"
                          className="img-cover"
                        />
                        {item.seller_address === publicKey.toBase58() ? (
                          <button className="btn btn-primary" onClick={() => UnlistNFT(item.list_state)}>                          
                            <span className="span">UNLIST</span>
                            <ion-icon name="arrow-undo-outline" size="large"></ion-icon>
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              buyNow(
                                item.nft_address,
                                item.price,
                                item.seller_address
                                    )}>
                            <span className="span">BUY NOW</span>
                            <ion-icon name="card-outline" size="large"></ion-icon>
                          </button>
                        )}
                      </div>

                       <h1 className="hero-title text-center mt-5" style={{fontWeight:"bold"}}>
                            <span className="span">{item.nft.name}</span>
                          </h1>
                     
                        <div className="text-center text-light mb-4 mt-3">                           
                              <a
                                href={`/get-details?token_address=${item.mint}`}
                                style={{ fontSize: 11 }}
                              >
                                {item.seller_address}
                              </a>
                            </div>

                      <div className="card-meta mb-4" style={{
                        backgroundImage: `url("https://www.nftically.com/blog/wp-content/uploads/2022/09/How-Can-NFT-Ticketing-Disrupt-the-Ticketing-Industry_.jpg")`
                      }}>
                        <div>
                          <p className="text-light">
                            &nbsp;
                            <b>Time Event</b>
                          </p>

                          <div className="text-center card-price">
                            &nbsp;
                            <span className="span">
                              {item.nft.attributes.Time}
                            </span>
                          </div>
                        </div>
                        <div>
                           <p className="text-center text-light">
                            <b>Location</b>
                          </p>
                          <div className="text-center card-price">                         
                            <span className="span">
                              {item.nft.attributes.Location}
                            </span>                          
                          </div>
                        </div>
                      </div>

                      <div className="card-meta"  style={{
                        backgroundImage: `url("https://www.nftically.com/blog/wp-content/uploads/2022/09/How-Can-NFT-Ticketing-Disrupt-the-Ticketing-Industry_.jpg")`
                      }}>
                        <div>
                        <p className="text-light">
                            <b>List</b>
                          </p>
                          <div className="card-price">
                            <span className="span">{item.created_at}</span>
                          </div>
                        </div>
                        <div>
                        <p className="text-light">
                            <b>Price</b>
                          </p>

                          <div className="card-price">
                            <img
                              src="/assets/images/solana.svg"
                              width="16"
                              height="20"
                              loading="lazy"
                              alt="ethereum icon"
                            />
                            &nbsp;
                            <span className="span">{item.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default Marketplace;
