import React from 'react'

import Banner from "../components/Banner";
import Collection from "../components/Collection";
import Items from "../components/Items";
import Creator from "../components/Creator";
import Contact from "../components/Contact";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

function Home () {
  return (
    <>  
      <Banner />
      <Collection />
      <Items />
      <Creator />
      <Contact />
    </>
  );
}

export default Home;

