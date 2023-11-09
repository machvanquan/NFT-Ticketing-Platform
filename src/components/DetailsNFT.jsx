import { useEffect, useState } from "react";
import { ShyftSdk, Network } from "@shyft-to/js";
import queryString from "query-string";

const DetailNFT = () => {
  const [image, setimage] = useState(
    "https://biteable.com/content/uploads/2018/01/royalty-free-images-cover_social-media-ls-1200x630-c-center.jpg"
  );
  const [name, setName] = useState(null);
  const [desc, setDesc] = useState(null);
  const [sym, setSym] = useState(null);
  const [tokAddr, setTokAddr] = useState(null);
  const [mint, setmint] = useState(null);
  const [freeze, setFreeze] = useState(null);
  const [deci, setDeci] = useState(null);
  const [curSup, setCurSup] = useState(null);

  const xAPIKey = "9FoRucIH-b-JiuOT"; //Your X-API-KEY here
  const url = window.location.href;
  const parsed = queryString.parseUrl(url);
  const tokenAddress = parsed.query.token_address;

  let shyft = new ShyftSdk({
    apiKey: xAPIKey,
    network: Network.Devnet,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await shyft.token.getInfo({
          tokenAddress: tokenAddress,
        });
        setName(info.name);
        setDesc(info.description);
        setimage(info.image);
        setSym(info.symbol);
        setTokAddr(info.address);
        setmint(info.mint_authority);
        setFreeze(info.freeze_authority);
        setDeci(info.decimals);
        setCurSup(info.current_supply);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [shyft.token, tokenAddress]);
  return (
    <>
   <>
    <div className="container" >
    <section className="section hero" aria-label="home">
        <div className="container">
          <h1 className="headline-lg hero-title">
            Welcome to{" "}
            <span className="span">Deitals NFT</span>
          </h1>
        </div>
      </section>
      <div className="row"  style={{ marginBottom: '100px' }}>
        <div className="col-sm-10 col-md-10 col-lg-3">
          <img src={image} alt="" className="img-fluid" />
        </div>
        <div className="col-sm-12 col-md-12 col-lg-8"> 
          <table className="table"  style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' /* các kiểu khác */ }}>
          <tbody>
            <div className="text-section px-4">
              <h3 class="font-weight-bolder">Name:</h3>
              <p class="font-weight-bolder">{name}</p>
              <h3 className="font-weight-bolder">Description:</h3>
              <p className="font-weight-bold">{desc}</p>
              <h3 className="font-weight-bolder">Symbol:</h3>
              <p className="font-weight-bolder">{sym}</p>
              <div class="font-weight-bolder col-3" >Details</div>
              <div className="details-table " style={{ border: '1px solid #ccc', padding: '30px' , borderRadius: '30px', margin: '0 -120px 0 10px'}}>
                <div className="row "> 
                  <div class="font-weight-bolder col-3" >Token Address:</div>
                  <div className="col-3 text-end">{tokAddr}</div>
                
                </div>
                <div className="row">
                  <div className="font-weight-bolder col-3">Mint Authority:</div>
                  <div className="col-3 text-end">{mint}</div>
                </div>
                <div className="row">
                  <div className="font-weight-bolder col-3">Freeze Authority:</div>
                  <div className="col-2 text-end">{freeze}</div>
                </div>
                <div className="row">
                  <div className="font-weight-bolder col-8">Decimals:</div>
                  <div className="col-4 text-end">{deci}</div>
                </div>
                <div className="row">
                  <div className="font-weight-bolder col-8">Current Supply</div>
                  <div className="col-4 text-end">{curSup}</div>
                </div>
              </div>
              <div class="font-weight-bolder col-3" style={{marginTop:'20px'}}>Attributes</div>
              <div className="details-table " style={{ border: '1px solid #ccc', padding: '30px' , borderRadius: '30px', margin: '0 -120px 0 10px'}}>   
                <div className="row "> 
                  <div class="font-weight-bolder col-3" >Time:</div>
                  <div className="col-3 text-end">{tokAddr}</div>
                
                </div>
                <div className="row">
                  <div className="font-weight-bolder col-3">Location:</div>
                  <div className="col-3 text-end">{mint}</div>
                </div>
                <div className="row">
                  <div className="font-weight-bolder col-3">Event:</div>
                  <div className="col-2 text-end">{freeze}</div>
                </div>
              </div>
            </div>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
    </>
  )
}

export default DetailNFT;
