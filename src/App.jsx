import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Buy from "./pages/Buy";

function App() {
  return (
    <>
     <BrowserRouter>
     <Navbar />
      <Routes>    
         <Route path="/" element={<Home />} />
         <Route path="/buy" element={<Buy />} />
         <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
      <div className="body-bg-shape"></div>
    </>
  );
}

export default App;
