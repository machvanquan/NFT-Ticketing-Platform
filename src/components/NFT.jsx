import React from "react";
import { collection } from "../data";
import { useState } from "react";
import axios from "axios";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

import "../assets/css/custom2.css";
import "../assets/css/custom3.css";

const ListAll = () => {
  const xKey = "9FoRucIH-b-JiuOT";
  const [wallID, setWallID] = useState("");
  const [network, setNetwork] = useState("devnet");
  const [isLoaded, setLoaded] = useState(false);
  const [dataFetched, setDataFetched] = useState();
  const [connStatus, setConnStatus] = useState(false);

  // Phantom Adaptor
  const solanaConnect = async () => {
    console.log("Clicked solana connect");
    const { solana } = window;
    if (!solana) {
      alert("Please Install Solana");
    }

    try {
      //const network = "devnet";
      const phantom = new PhantomWalletAdapter();
      await phantom.connect();
      const rpcUrl = clusterApiUrl(network);
      const connection = new Connection(rpcUrl, "confirmed");
      const wallet = {
        address: phantom.publicKey.toString(),
      };

      if (wallet.address) {
        console.log(wallet.address);
        setWallID(wallet.address);
        const accountInfo = await connection.getAccountInfo(
          new PublicKey(wallet.address),
          "confirmed"
        );
        console.log(accountInfo);
        setConnStatus(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNFTs = (e) => {
    e.preventDefault();

    //Note, we are not mentioning update_authority here for now
    let nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=${network}&address=${wallID}`;
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

  return (
    <>
      <section className="section hero" aria-label="home">
        <div className="container">
          <h1 className="headline-lg hero-title">
            <span className="span"> My NFT</span>
          </h1>
          {!connStatus && (
            <div
              className="pt-5"
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                className="button-25 custom-heading"
                onClick={solanaConnect}
              >
                Connect Phantom Wallet
              </button>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          {connStatus && (
            <div className="col-6 rounded-3 mx-auto">
              <form>
                <div className="row d-flex justify-content-center">
                  <div className="col-12 p-3">
                    <select
                      style={{ height: 40, fontSize: 18 }}
                      name="network"
                      className="form-control form-select"
                      id=""
                      onChange={(e) => setNetwork(e.target.value)}
                    >
                      <option value="devnet">Devnet</option>
                      <option value="testnet">Testnet</option>
                      <option value="mainnet-beta">Mainnet Beta</option>
                    </select>
                  </div>
                  <div className="col-12 p-3">
                    <input
                      style={{ height: 40, fontSize: 18 }}
                      type="text"
                      className="form-control"
                      placeholder="Enter Wallet Id"
                      value={wallID}
                    />
                  </div>
                  <div className="p-5">
                    <button
                      className="button-25 custom-heading"
                      onClick={fetchNFTs}
                    >
                      {" "}
                      Submit{" "}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="container">
          <div className="cards-section py-4">
            <div className="row">
              {isLoaded &&
                dataFetched.result.map((item) => (
                  <div className="col-xs-12 col-sm-3 p-3" key={item.mint}>
                    <div className="card bg-light">
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
                        <br />
                        <div className="card-footer text-center text-dark">
                          <a
                            href={`/get-details?token_address=${item.mint}&apiKey=${xKey}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <h3>{item.name}</h3>
                          </a>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
    </>
  );
};

export default ListAll;
