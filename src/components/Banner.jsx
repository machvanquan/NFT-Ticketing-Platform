import React from "react";

const Banner = () => {
  return (
    <>
      <section className="section hero" aria-label="home">
        <div className="container">
          <h1 className="headline-lg hero-title">
            Welcome to{" "}
            <span className="span">NFTick</span>
          </h1>

          <p className="section-text body-lg">
          We offer a fresh experience for owning and exchanging event tickets, whether for concerts, sports, and many more events, through blockchain technology.
          </p>

          <a href="#" className="btn">
            Explore now
          </a>
        </div>
      </section>
    </>
  );
};

export default Banner;
