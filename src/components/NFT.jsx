import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useWallet } from "@solana/wallet-adapter-react";

import '../assets/css/custom2.css';
import '../assets/css/custom3.css';


const ListAll = () => {
  const xKey = "9FoRucIH-b-JiuOT";
  const [network, setNetwork] = useState("devnet");
  const [isLoaded, setLoaded] = useState(false);
  const [dataFetched, setDataFetched] = useState();
  const { publicKey } = useWallet();

  const fetchNFTs = () => {
    //Note, we are not mentioning update_authority here for now
    let nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=${network}&address=${publicKey}`;
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
        console.log(res.data.result[0].metadata_uri);
      })

      // Catch errors if any
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <>
      <section className="section hero" aria-label="home">
        <div
          className="pt-5"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button className="button-25 custom-heading" onClick={fetchNFTs}>
            Get All NFT 
          </button>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cards-section py-4">
            <div className="row">
              {isLoaded &&
                dataFetched.result.map((item) => (
                  <div className="col-xs-12 col-sm-3 p-3" key={item.mint}>
                    <div className="card bg-light">
                      <div className="card-body">
                        <Link
                          to="/get-details"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            className="img-fluid"
                            src={item.image_uri}
                            alt="img"
                          />
                        </Link>
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
                          Time : {item.attributes.Time}
                          <hr />
                          Location : {item.attributes.Location}
                          <hr />
                          Event : {item.attributes.Event}
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
