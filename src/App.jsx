import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/CreateEvent";
import Buy from "./pages/BuyNFT";
import ListAll from "./pages/ListAll";
import ReadNFT from "./pages/ReadNFT";

function App() {
  return (
    <>
<<<<<<< HEAD
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/create" element={<Create />} />
          <Route path="/customers" element={<TopCustomers />} />
          <Route path="/listall" element={<ListAll />} />
          <Route path="/get-details" element={<ReadNFT />} />
        </Routes>
      </BrowserRouter>
=======
     <BrowserRouter>
     <Navbar />
      <Routes>    
         <Route path="/" element={<Home />} />
         <Route path="/buy" element={<Buy/>} />
         <Route path="/create" element={<Create />} />   
         <Route path="/listall" element={<ListAll />} />  
      </Routes>
    </BrowserRouter>
>>>>>>> 1c579cc3f0e40febda9295a8960a9d92131e577f
      <div className="body-bg-shape"></div>
    </>
  );
}

export default App;
