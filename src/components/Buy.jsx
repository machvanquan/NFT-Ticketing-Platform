import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";

import { signAndConfirmTransactionFe } from "../service/Utilityfunc";

import { useWallet } from "@solana/wallet-adapter-react";

const Buy = () => {
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
            <span className="span">MARKETPLACE</span>
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
        {connStatus && (
          <div className="row ml-5 mb-5">
            {isLoaded && (
              <div className="col-12">
                <h1 className="headline-lg hero-title">
                  <span className="span" style={{ fontSize: 30 }}>
                    {ownerId}
                  </span>
                </h1>
              </div>
            )}

            {isLoaded &&
              dataFetched.result.map((item) => (
                <div className="col-xs-12 col-sm-3 p-4" key={item.mint}>
                  <div className="card bg-light">
                    <div className="card-header text-dark text-center">
                      <h2>{item.name}</h2>
                    </div>
                    <div className="card-body">
                      <a
                        href={`/get-details?token_address=${item.mint}&apiKey=${xKey}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className="img-fluid"
                          src={item.image_uri}
                          alt="img"
                        />
                      </a>
                      <div
                        className="card-footer text-dark text-center"
                        style={{ fontWeight: "bold", height: 125 }}
                      >
                        <img
                          src="https://cdn.icon-icons.com/icons2/2346/PNG/512/clock_time_icon_142903.png"
                          width={20}
                          alt=""
                        />
                        {item.attributes.Time}
                        <hr />
                        <img
                          src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-512.png"
                          width={20}
                          alt=""
                        />
                        {item.attributes.Location}
                        <hr />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        <div className="container">
          <div className="cards-section  py-4">
            <ul className="grid-list">
              {isLoadedMarketPlaceNFTs &&
                nfts.result.map((item) => (
                  <li key={item.nft_address}>
                    <div className="discover-card card">
                      <div className="card-banner img-holder">
                        <img
                          src={item.nft.image_uri}
                          loading="lazy"
                          alt="Windchime #768/"
                          className="img-cover"
                        />
                        {item.seller_address === publicKey.toBase58() ? (
                          <button
                            className="btn btn-primary"
                            onClick={() => UnlistNFT(item.list_state)}
                          >
                            <ion-icon name="flash"></ion-icon>
                            <span className="span">Unlist</span>
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              buyNow(
                                item.nft_address,
                                item.price,
                                item.seller_address
                              )
                            }
                          >
                            <ion-icon name="flash"></ion-icon>
                            <span className="span">Buy Now</span>
                          </button>
                        )}
                      </div>

                      <div
                        className="card-profile mt-4"
                        style={{ fontSize: 13 }}
                      >
                        <a className="link:hover">
                          {item.seller_address}{" "}
                          <button
                            onClick={() => findOwner(item.seller_address)}
                          >
                            Get
                          </button>
                        </a>
                      </div>

                      <h3 className="title-sm card-title">
                        <a href="#" className="link:hover">
                          {item.name}
                        </a>
                      </h3>

                      <div className="card-meta">
                        <div>
                          <p>
                            <b>CREATE</b>
                          </p>

                          <div className="card-price">
                            <span className="span">{item.created_at}</span>
                          </div>
                        </div>
                        <div>
                          <p>
                            <b>PRICE</b>
                          </p>

                          <div className="card-price">
                            <span className="span"> {item.price}&nbsp;</span>
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/7016/7016539.png"
                              width="24"
                              height="15"
                              loading="lazy"
                              alt="ethereum icon"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Buy;
