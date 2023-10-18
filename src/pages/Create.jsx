import React from 'react'

import Newsletter from '../components/Newsletter';
import Contact from '../components/Contact';
import Collection from '../components/Collection';
import Banner from "../components/Banner";
import CreateView from '../components/CreateView';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
function createNFT () {
  return (
    <>
      <Navbar/>
      <CreateView/>
      <Footer />
    </>
  );
}

export default createNFT;

