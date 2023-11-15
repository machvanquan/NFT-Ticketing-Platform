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
          } catch (error) {
            if (error.response && error.response.status === 429) {
              // Xử lý lỗi 429: đợi một khoảng thời gian và thử lại
              console.log("Too Many Requests. Waiting and retrying...");
              await new Promise(resolve => setTimeout(resolve, 1)); // Đợi 5 giây (có thể điều chỉnh)
              return fetchData(); // Thử lại hàm fetchData
            }
            // Xử lý các lỗi khác
            console.error("Error fetching NFTs from Marketplace:", error);
          } finally {
            setLoading(false);
            
          }
        };
      
        fetchData();
      
        return () => {
          // Logic dọn dẹp ở đây, nếu cần
        };
      }, [isLoadedMarketPlaceNFTs]);
      




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

  const listNFT = async (nft_addr) => {
    let nftUrl1 = `https://api.shyft.to/sol/v1/marketplace/list`;

    try {
        setLoading(true);
        const response = await axios({
            url: nftUrl1,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": xKey,
            },
            data: {
                network: 'devnet',
                marketplace_address: '3y4rUzcCRZH4TstRJGYmUUKuod8hd4Rvu2Fnf2FhQoY4',
                nft_address: nft_addr,
                price: Number(1),
                seller_wallet: publicKey.toBase58()
            }
        });

        if (response.data.success === true) {
            const transaction = response.data.result.encoded_transaction;
            const ret_result = await signAndConfirmTransactionFe(
                'devnet',
                transaction,
                callback
            );
            await fetchNFTs(); // Reload NFTs after successful listing
            console.log(ret_result);
            // Update the state to reflect the change
            setNfts((prevNfts) => ({
                ...prevNfts,
                result: [
                    ...prevNfts.result,
                    {
                        nft_address: nft_addr,
                        list_state: ret_result.list_state
                    }
                ]
            }));
        } else {
            // Handle listing error
        }
        setLoading(false);
    } catch (error) {
        console.error(error);
        setLoading(false);
    }
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
        <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            <button className="button-25" onClick={fetchNFTs}
            style={{cursor:"pointer"}}>
            <span> GET MY NFTs</span>
            </button>
         
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
                          className="img-cover" />
                           {nfts.result.some(nft => nft.nft_address === item.mint) ? (
                            <button className="btn btn-primary" onClick={() => UnlistNFT(item.list_state)}>                          
                            <span className="span">UNLIST</span>
                            <ion-icon name="arrow-undo-outline" size="large"></ion-icon>
                          </button>     
                            ) : (
                              <button className="btn btn-primary" onClick={() => listNFT(item.mint)}>                             
                              <span className="span">LIST</span>
                              <ion-icon name="arrow-undo-outline" size="large"></ion-icon>
                            </button>   
                            )}               
                      </div>
                      <h2 className="title-sm card-title text-center">
                        <a href={`/get-details?token_address=${item.mint}&apiKey=${xKey}`}
                          className="link:hover">
                          {item.name}
                        </a>
                      </h2>                
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
      </div>
      <br />
      <br />
    </>
  );
};

export default ListAll;
