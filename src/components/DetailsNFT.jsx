import { useEffect, useState } from "react";
import axios from "axios";
import queryString from 'query-string';

const DetailNFT = () => {
  const [network, setNetwork] = useState("devnet");
  const [data, setData] = useState();
  const xKey = "PczduUU_nB0jwN8e";
  const href = window.location.href;
  const parsed = queryString.parseUrl(href);
  const tokenAddress = parsed.query.token_address;

  const fetchData = () => {
    let Url = `https://api.shyft.to/sol/v1/nft/read?network=${network}&token_address=${tokenAddress}&refresh=true&token_record=true`;
    axios({
      url: Url,
      method: "GET",
      headers: {
        "x-api-key": xKey,
      },
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data.result);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="section hero" aria-label="home">
        <div className="container">
          <h1 className="headline-lg hero-title">
          <span className="span">Details NFT</span>
          </h1>
        </div>
      </section>
      <section>
        <section className="container">
          {data && (
            <div className="row text-white">
              <div className="col-md-2"></div>

              <div className="col-md-8">
                <div
                  className="row text-dark"
                  style={{ borderRadius: 15, marginBottom: 30, height: 300 }}
                >
                  <div className="col-5">
                    <img
                      src={data.cached_image_uri}
                      alt="NFT Image"
                      className="img-fluid"
                      style={{
                        width: 300,
                        height: 300,
                        marginLeft: -16,
                        borderRadius: 15,
                      }}
                    />
                  </div>
                  <div
                    className="col-7 bg-light pt-3"
                    style={{ borderRadius: 15, marginBottom: 30, height: 300 }}
                  >
                    <div className="col-12 m-4">
                      <div style={{ fontWeight: "bold" }}>Network</div>
                      <div>Devnet</div>
                    </div>
                    <div className="col-12 m-4">
                      <div style={{ fontWeight: "bold" }}>Name</div>
                      <div>{data.name}</div>
                    </div>
                    <div className="col-12 m-4">
                      <div style={{ fontWeight: "bold" }}>Description</div>
                      <div>{data.description}</div>
                    </div>
                    <div className="col-12 m-4">
                      <div style={{ fontWeight: "bold" }}>Symbol</div>
                      <div>{data.symbol}</div>
                    </div>
                  </div>
                </div>
                <h1 className="mb-3">Details</h1>
                <div
                  className="row border bg-light text-dark"
                  style={{ marginBottom: 30, borderRadius: 15 }}
                >
                  <div className="row col-12 m-3">
                    <div className="col-2 text-left">Royalty:</div>
                    <div className="col-10 text-right">{data.royalty}</div>
                    <hr />
                  </div>
                  <div className="row col-12 m-3 ">
                    <div className="col-2 text-left">Owner:</div>
                    <div className="col-10 text-right">
                      <a href={`/profile?seller_address=${data.owner}`} className="link:hover text-primary">
                        {data.owner}
                      </a>
                    </div>
                  </div>
                  <div className="row col-12 m-3">
                    <div className="col-2 text-left">Mint:</div>
                    <div className="col-10 text-right">
                      <a href="#" className="link:hover text-primary">
                        {data.mint}
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="mb-3">Attributes</h1>
                  <div
                    className="row border bg-light text-dark"
                    style={{ borderRadius: 15 }}
                  >
                    <div className="row col-12 m-3">
                      <div className="col-2 text-left">Location:</div>
                      <div className="col-10 text-right">
                        <a>{data.attributes.Location}</a>
                      </div>
                    </div>
                    <div className="row col-12 m-3">
                      <div className="col-2  text-left">Time:</div>
                      <div className="col-10 text-right">
                        <a>{data.attributes.Time}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </section>
    </>
  );
};

export default DetailNFT;
