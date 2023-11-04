import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/CreateEvent";
import Buy from "./pages/BuyNFT";
import TopCustomers from "./pages/TopCustomers";
import ListAll from "./pages/ListAll";
import ReadNFT from "./pages/ReadNFT";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/create" element={<Create />} />
          <Route path="/customers" element={<TopCustomers />} />
          <Route path="/listall" element={<ListAll />} />
          <Route path="/readnft" element={<ReadNFT />} />
        </Routes>
      </BrowserRouter>
      <div className="body-bg-shape"></div>
    </>
  );
}

export default App;
