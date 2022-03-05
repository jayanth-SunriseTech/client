import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="container-fluid home_bg">
      <div className="row home">
        <div className="col-md-1 col-sm-1"></div>
        <div className=" col-12 col-md-6 col-sm-6 home__left">
          <h2 className="home__title">
            The world is <br /> made of{" "}
            <span className="btswaps">BTswaps.</span>
          </h2>
          <p className="desc">
            Trade, earn and win crypto on the most popular decentralized
            platform in the galaxy
          </p>
          <div className="button-group">
            <button className="connect">CONNECT WALLET</button>
            <button className="trade">Trade Now</button>
          </div>
        </div>
        <div className=" col-12 col-md-5 col-sm-5 home__right">
          <img className="bitcoins" src="BTC.png"></img>
        </div>

        <img className="home__background" src="Mountains.svg"></img>
      </div>
    </div>
  );
}

export default Home;
