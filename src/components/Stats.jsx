import React from "react";
import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import queryString from "query-string";
import axios from "axios";

const Stats = () => {
  const xKey = "lEHeaJLm_TKtI1bU";
  const [data, setData] = useState();
  const [startDate, setStartDate] = useState("2020-01-01");
  const [endDate, setEndDate] = useState(new Date());
  const { publicKey } = useWallet();
  const [total_sales, setTotal_sales] = useState();
  const [network, setNetwork] = useState("devnet");
  const [listed_volume, setListed_volume] = useState();
  const [sales_volume, setSales_volume] = useState();
  const [total_listings, setTotal_listings] = useState();
  const [total_sellers, setTotal_sellers] = useState();
  const [leg, setLeg] = useState();

  const fetchData = () => {
    let Url = `https://api.shyft.to/sol/v1/marketplace/stats?network=devnet&marketplace_address=3y4rUzcCRZH4TstRJGYmUUKuod8hd4Rvu2Fnf2FhQoY4&start_date=${startDate}&end_date=${endDate}`;
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
        setTotal_sales(res.data.result.total_sales);
        setListed_volume(res.data.result.listed_volume);
        setSales_volume(res.data.result.sales_volume);
        setTotal_listings(res.data.result.total_listings);
        setTotal_sellers(res.data.result.total_sellers);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  useEffect(() => {
    fetchData();
    getNFTsFromMarketPlace();
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
        setLeg(res.data.result.length);
      })

      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <>
      <section className="section hero" aria-label="home">
        <div className="container">
          <h1 className="headline-lg hero-title">
            <span className="span">STATISTICS</span>
          </h1>
        </div>
      </section>

      <div className="container">
        <div className="row col-12">
          <div className="col-5"></div>
          <div className="col-3">
            <label htmlFor="startTime">Filter From</label>
            <input
              style={{ borderRadius: 10, height: 50 }}
              type="date"
              className="form-control"
              placeholder="Enter Time"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-3">
            <label htmlFor="endTime">Filter To</label>
            <input
              style={{ borderRadius: 10, height: 50 }}
              type="date"
              className="form-control"
              placeholder="Enter Time"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="col-1" style={{ paddingTop: 23 }}>
            <button className="button-25" onClick={fetchData}>
              Go
            </button>
          </div>
        </div>
        <div style={{ marginTop: 40 }}>
          <div className="row">
            <div className="col-4">
              <div
                className="m-2 bg-light text-dark p-5"
                style={{ borderRadius: 10 }}
              >
                <h1 className="text-left" style={{ fontSize: 18 }}>
                  Total Sales
                </h1>
                <h1 className="text-right" style={{ fontSize: 45 }}>
                  {total_sales}
                  <span style={{ fontSize: 16 }}>&nbsp;</span>
                </h1>
              </div>
            </div>

            <div className="col-4">
              <div
                className="m-2 bg-light text-dark p-5"
                style={{ borderRadius: 10 }}
              >
                <h1 className="text-left" style={{ fontSize: 16 }}>
                  Total Volume
                </h1>
                <h1 className="text-right" style={{ fontSize: 45 }}>
                  {sales_volume}
                  <span style={{ fontSize: 16 }}>SOL</span>
                </h1>
              </div>
            </div>

            <div className="col-4">
              <div
                className="m-2 bg-light text-dark p-5"
                style={{ borderRadius: 10 }}
              >
                <h1 className="text-left" style={{ fontSize: 18 }}>
                  Total Listings
                </h1>
                <h1 className="text-right" style={{ fontSize: 45 }}>
                  {total_listings}
                  <span style={{ fontSize: 16 }}>&nbsp;</span>
                </h1>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-4">
              <div
                className="m-2 bg-light text-dark p-5"
                style={{ borderRadius: 10 }}
              >
                <h1 className="text-left" style={{ fontSize: 18 }}>
                  Total Sellers
                </h1>
                <h1 className="text-right" style={{ fontSize: 45 }}>
                  {total_sellers}
                  <span style={{ fontSize: 16 }}>&nbsp;</span>
                </h1>
              </div>
            </div>

            <div className="col-4">
              <div
                className="m-2 bg-light text-dark p-5"
                style={{ borderRadius: 10 }}
              >
                <h1 className="text-left" style={{ fontSize: 18 }}>
                  Listed Volumes
                </h1>
                <h1 className="text-right" style={{ fontSize: 45 }}>
                  {listed_volume}
                  <span style={{ fontSize: 16 }}>SOL</span>
                </h1>
              </div>
            </div>

            <div className="col-4">
              <div
                className="m-2 bg-light text-dark p-5"
                style={{ borderRadius: 10 }}
              >
                <h1 className="text-left" style={{ fontSize: 18 }}>
                  Active Listings
                </h1>
                <h1 className="text-right" style={{ fontSize: 45 }}>
                  {leg}
                  <span style={{ fontSize: 16 }}>&nbsp;</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
