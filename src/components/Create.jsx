import React from "react";
import axios from "axios";

import { signAndConfirmTransactionFe } from "./Utilityfunc";
import disPic from '../assets/images/upload-file.jpg'

const xApiKey = "PczduUU_nB0jwN8e"; //Enter Your x-api-key here

function Create() {
  // const [file, setfile] = useState();
  // const [displayPic, setDisplayPic] = useState(disPic);
  // const [network, setnetwork] = useState("devnet");
  // // const [privKey, setprivKey] = useState();
  // const [publicKey, setPublicKey] = useState("");
  // const [name, setName] = useState();
  // const [symbol, setSymbol] = useState();
  // const [desc, setDesc] = useState();
  // const [attr, setAttr] = useState(
  //   JSON.stringify([{ trait_type: "edification", value: "100" }])
  // );
  // const [extUrl, setExtUrl] = useState();
  // const [maxSup, setMaxSup] = useState(0);
  // const [roy, setRoy] = useState(99);

  // const [minted, setMinted] = useState();
  // const [saveMinted, setSaveMinted] = useState();
  // const [errorRoy, setErrorRoy] = useState();
  // const [status, setStatus] = useState("Awaiting Upload");
  // const [dispResponse, setDispResp] = useState("");
  // const [connStatus, setConnStatus] = useState(false);
  // const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // const [loading, setLoading] = useState(false);

  // const callback = (signature, result) => {
  //   console.log("Signature ", signature);
  //   console.log("result ", result);
  //   if (signature.err === null) {
  //     setMinted(saveMinted);
  //     setShowSuccessMessage(true); // Hiển thị thông báo thành công
  //     setLoading(false);
  //     setStatus("Success: Successfully Signed and Minted.");
  //   }
  // };

  // const mintNow = (e) => {
  //   e.preventDefault();
  //   setStatus("Loading");
  //   setLoading(true);
  //   let formData = new FormData();
  //   formData.append("network", network);
  //   formData.append("wallet", publicKey);
  //   formData.append("name", name);
  //   formData.append("symbol", symbol);
  //   formData.append("description", desc);
  //   formData.append("attributes", JSON.stringify(attr));
  //   formData.append("external_url", extUrl);
  //   formData.append("max_supply", maxSup);
  //   formData.append("royalty", roy);
  //   formData.append("file", file);

  //   axios({
  //     // Endpoint to send files
  //     url: "https://api.shyft.to/sol/v1/nft/create_detach",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       "x-api-key": xApiKey,
  //       Accept: "*/*",
  //       "Access-Control-Allow-Origin": "*",
  //     },

  //     // Attaching the form data
  //     data: formData,
  //   })
  //     // Handle the response from backend here
  //     .then(async (res) => {
  //       console.log(res);
  //       if (res.data.success === true) {
  //         const transaction = res.data.result.encoded_transaction;
  //         setSaveMinted(res.data.result.mint);
  //         const ret_result = await signAndConfirmTransactionFe(
  //           network,
  //           transaction,
  //           callback
  //         );
  //         console.log(ret_result);
  //         setDispResp(res.data);
  //         setStatus(
  //           "success: Transaction Created. Signing Transactions. Please Wait."
  //         );
  //       }

  //       setLoading(true);
  //     })

  //     // Catch errors if any
  //     .catch((err) => {
  //       console.warn(err);
  //       setLoading(false);
  //       setStatus("success: false");
  //     });
  // };

  return (
    <>
      <section className="section hero" aria-label="home">
        <div className="container">
          <h1 className="headline-lg hero-title">
            <span className="span">Create Event</span>
          </h1>
        </div>
      </section>

      

     
    </>
  );
}

export default Create;
