import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";

import { useWallet } from "@solana/wallet-adapter-react";

const History = () => {
  const xKey = "PczduUU_nB0jwN8e";
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const [network, setNetwork] = useState("devnet");
  const { publickey } = useWallet();

  useEffect(() => {
    fetchData1();
    fetchData2();
  }, []);

  const fetchData1 = () => {
    let Url1 = `https://api.shyft.to/sol/v1/marketplace/buy_history?network=devnet&marketplace_address=3y4rUzcCRZH4TstRJGYmUUKuod8hd4Rvu2Fnf2FhQoY4&buyer_address=89nNhU2Uj6JFWd1gHoaBjgYoouM7CDn63HAqQp3NLQQB`;
    axios({
      url: Url1,
      method: "GET",
      headers: {
        "x-api-key": xKey,
      },
    })
      .then((res) => {
        console.log(res.data.result);
        setData1(res.data.result);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  const fetchData2 = () => {
    let Url2 = `https://api.shyft.to/sol/v1/marketplace/seller_listings?network=devnet&marketplace_address=3y4rUzcCRZH4TstRJGYmUUKuod8hd4Rvu2Fnf2FhQoY4&seller_address=89nNhU2Uj6JFWd1gHoaBjgYoouM7CDn63HAqQp3NLQQB`;
    axios({
      url: Url2,
      method: "GET",
      headers: {
        "x-api-key": xKey,
      },
    })
      .then((res) => {
        console.log(res.data.result);
        setData2(res.data.result);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <>
      <section className="section hero">
        <div className="container">
          <h1 className="headline-lg hero-title">
            <span className="span">HISTORY</span>
          </h1>
        </div>
      </section>
      
  <section className="container">
  <div className="mb-2">
          <h1 className="hero-title mb-3">
            <span className="span" style={{fontSize:30}}>Your Listings In Marketplace</span>
          </h1>
          </div>
  <table className="table table-hover table-light mb-5">
    <thead className="text-dark" style={{backgroundColor:"#E0F4FF"}}>
      <tr>
        <th>#</th>
        <th>NFT</th>
        <th>Create</th>
        <th>Cancel</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>   
      {data2 && data2.map((item, index) => (
        <tr className="text-dark" key={item.mint}> 
          <th>{index + 1}</th>
          <td><a href="#">{item.nft_address}</a></td>
          <td>{item.created_at}</td>
          <td>{item.cancelled_at}</td>
          <th>{item.price}</th>
        </tr>
      ))}
    </tbody>
  </table>

          <div className="mb-2">
          <h1 className="hero-title mb-3">
            <span className="span" style={{fontSize:30}}>Your Buy History In Marketplace</span>
          </h1>
          </div>
  <table className="table table-hover table-light mb-5">
    <thead className="text-dark" style={{backgroundColor:"#E0F4FF"}}>
      <tr >
        <th>#</th>
        <th>NFT Address</th>
        <th>From</th>
        <th>Time Buy</th>   
        <th>Price</th>  
      </tr>
    </thead>
    <tbody>
      {data1 && data1.map((item, index) => (
        <tr className="text-dark" key={item.mint}> 
          <th>{index + 1}</th>
          <td><a href="#">{item.nft_address}</a></td>
          <td><a href="#">{item.seller_address}</a></td>
          <td >{item.created_at}</td>              
          <th>{item.price}</th>
        </tr>
      ))}
    </tbody>
  </table>
</section>

    </>
  );
};

export default History;
