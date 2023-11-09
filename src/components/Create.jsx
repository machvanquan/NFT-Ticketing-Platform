import React, { useEffect, useState } from "react";
import axios from "axios";

import { signAndConfirmTransactionFe } from "../service/Utilityfunc";
import disPic from "../assets/images/upload-file.jpg";

import { useWallet } from "@solana/wallet-adapter-react";

const xApiKey = "PczduUU_nB0jwN8e";
const Create = () => {
  const { publicKey } = useWallet();
  const [file, setfile] = useState();
  const [displayPic, setDisplayPic] = useState(disPic);
  const [network, setnetwork] = useState("devnet");
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [desc, setDesc] = useState();
  const [extUrl, setExtUrl] = useState();
  const [maxSup, setMaxSup] = useState(99);
  const [roy, setRoy] = useState(5);
  const [attr, setAttr] = useState(
    JSON.stringify(
      [
        { "trait_type": "Time", "value": "20-11-2023" },
        { "trait_type": "Location", "value": "TÒA P FPT" },
      ]
    ));

  const [time, setTime] = useState();
  const [location, setLocation] = useState();
  const [event, setEvent] = useState();

  const [minted, setMinted] = useState();
  const [saveMinted, setSaveMinted] = useState();
  const [errorRoy, setErrorRoy] = useState();

  const [status, setStatus] = useState("Awaiting Upload");
  const [dispResponse, setDispResp] = useState("");

  const [connStatus, setConnStatus] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const callback = (signature, result) => {
    console.log("Signature ", signature);
    console.log("result ", result);
    if (signature.err === null) {
      setMinted(saveMinted);
      setShowSuccessMessage(true);
      setLoading(false);
      setStatus("Action: Successfully Signed and Minted.");
    }
  };

  useEffect(() => {
    setConnStatus(true);
    setLoading(false);
  }, []);

  const mintNow = (e) => {
    e.preventDefault();
    setStatus("Loading");
    setLoading(true);
    let formData = new FormData();
    formData.append("network", network);
    formData.append("wallet", publicKey);
    formData.append("name", name);
    formData.append("symbol", symbol);
    formData.append("description", desc);
    formData.append(
      "attributes",
      JSON.stringify([
        { "trait_type": "Time", "value": time },
        { "trait_type": "Location", "value": location }
      ]));
    formData.append("external_url", extUrl);
    formData.append("max_supply", maxSup);
    formData.append("royalty", roy);
    formData.append("file", file);

    axios({
      // Endpoint to send files
      url: "https://api.shyft.to/sol/v1/nft/create_detach",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "x-api-key": xApiKey,
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
      },

      // Attaching the form data
      data: formData,
    })
      // Handle the response from backend here
      .then(async (res) => {
        console.log(res);
        if (res.data.success === true) {
          const transaction = res.data.result.encoded_transaction;
          setSaveMinted(res.data.result.mint);
          const ret_result = await signAndConfirmTransactionFe(
            network,
            transaction,
            callback
          );
          console.log(ret_result);
          setDispResp(res.data);
          setStatus(
            "Action: Transaction Created. Signing Transactions. Please Wait."
          );
        }
        setLoading(true);
      })

      // Catch errors if any
      .catch((err) => {
        console.warn(err);
        setLoading(false);
        setStatus("Action: false");
      });
  };

  return (
    <>
      <section className="section hero" aria-label="home">
        <div className="container">
          <h1 className="headline-lg hero-title">
            <span className="span">Mint Ticket</span>
          </h1>
        </div>
      </section>

      <div className=" gradient-background">
        <div className="mint-single rounded px-5">
          <div className="gradient-background">
            {/* ... (other JSX content) */}
            {loading && (
              <div className="loading-overlay">
                <div className="spinner"></div>
              </div>
            )}
          </div>
          {connStatus && (
            <div className="form-container ">
              {showSuccessMessage && (
                <div className="py-5 white-form-group pt-3">
                  <div className="status text-center text-warning p-3">
                    <h1 className="custom-status">{status}</h1>
                  </div>
                </div>
              )}
              <form className=" pt-5">
                <div className="row">
                  <div className="col-sm-12 col-md-5">
                    <div
                      className="uploaded-img"
                      style={{
                        border: "2px solid",
                        height: "350px",
                        width: "350px",
                        backgroundColor: "grey",
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        className="img-fluid"
                        src={displayPic}
                        alt="To be uploaded"
                        style={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div className="text-center">
                      <br />
                      <input
                        className="hele"
                        style={{ width: "350px" }}
                        type="file"
                        onChange={(e) => {
                          const [file_selected] = e.target.files;
                          setfile(e.target.files[0]);
                          setDisplayPic(URL.createObjectURL(file_selected));
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-5">
                    <div className="form-section">
                      <div className="form-elements-container">
                        <div className="white-form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Wallet's Public Key"
                            value={publicKey}
                            onChange={(e) => setPublicKey(e.target.value)}
                            readOnly
                            required
                          />
                        </div>
                        <div className="white-form-group pt-3 ">
                          <label className="w-100 pb-2 text-start">
                            Name *
                            <br />{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter NFT Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="white-form-group pt-3 ">
                          <label className="w-100 pb-2 text-start">
                            Symbol *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Symbol"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                            required
                          />
                        </div>
                        <div className="white-form-group pt-3 ">
                          <label className="w-100 pb-2 text-start">
                            Description * <br />
                          </label>
                          <textarea
                            className="form-control"
                            placeholder="Enter Description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            required
                          ></textarea>
                        </div>
                        <div className="white-form-group pt-3 ">
                          <textarea
                            className="form-control"
                            hidden
                            placeholder="Enter Attributes"
                            value={attr}
                            onChange={(e) => setAttr(e.target.value)}
                            required
                          ></textarea>
                        </div>
                        <div className="white-form-group pt-3 ">
                          <label className="w-100 pb-2 text-start">
                            External Url: <br />
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Url if Any"
                            value={extUrl}
                            onChange={(e) => setExtUrl(e.target.value)}
                          />
                        </div>
                        <div className="row">
                        <div className="white-form-group pt-3 col-3">
                            <label className="w-100 pb-2 text-start">
                              Time * <br />
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Enter Time"
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                            />
                          </div>
                          <div className="white-form-group pt-3 col-3">
                            <label className="w-100 pb-2 text-start">
                              Location * <br />
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Location"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                            />
                          </div>
                          <div className="white-form-group pt-3 col-3">
                            <label className="w-100 pb-2 text-start">
                            Max Supply * <br />
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Quantity"
                              value={maxSup}
                              onChange={(e) => setMaxSup(e.target.value)}
                            />
                          </div>
                          <div className="white-form-group pt-3 col-3">
                            <label className="w-100 pb-2 text-start">
                            Royalty * <br />
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="%"
                              value={roy}
                              onChange={(e) => setRoy(e.target.value)}
                            />
                          </div>
                         
                        </div>
                      </div>
                      <div className="p-5 text-center mt-5">
                        <button
                          type="submit"
                          className="button-25 mt-5"
                          id="liveToastBtn"
                          onClick={mintNow}
                        >
                          MINT NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
          <div className="p-3 text-center">
            {dispResponse && (
              <a
                href={`https://explorer.solana.com/address/${publicKey}?cluster=devnet`}
                target="_blank"
                className="btn btn-warning m-2 py-2 px-4"
              >
                View on Explorer
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
