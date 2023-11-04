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
    <div>
      <div className="container mt-5">
        <div className="card border-primary py-3 px-1 mt-5 w-75 mx-auto">
          <div className="image-container w-25 mx-auto mt-3">
            <img src={image} alt="" className="img-fluid" />
          </div>
          <div className="mt-3 p-3">
            <table className="table">
              <tbody>
                <tr>
                  <td className="w-50">Name</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td className="w-50">Description</td>
                  <td>{desc}</td>
                </tr>
                <tr>
                  <td className="w-50">Symbol</td>
                  <td>{sym}</td>
                </tr>
                <tr>
                  <td className="w-50">Token Address</td>
                  <td>{tokAddr}</td>
                </tr>
                <tr>
                  <td className="w-50">Mint Authority</td>
                  <td>{mint}</td>
                </tr>
                <tr>
                  <td className="w-50">Freeze Authority</td>
                  <td>{freeze}</td>
                </tr>
                <tr>
                  <td className="w-50">Decimals</td>
                  <td>{deci}</td>
                </tr>
                <tr>
                  <td className="w-50">Current Supply</td>
                  <td>{curSup}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailNFT;
