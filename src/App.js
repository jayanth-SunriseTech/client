import React, { useEffect } from "react";
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from "react-redux";
import { connectWallet } from "./redux/WalletAction";
import TradeExchange from "./components/TradeExchange/TradeExchange";
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import "./App.css";
import AddLiquidity from "./components/AddLiquidity/AddLiquidity";

const App = () => {

    const wallet = useSelector(state => state.WalletConnect);
    const dispatch = useDispatch();

    useEffect(() => {
        const {web3Modal} = wallet;
        if(web3Modal.cachedProvider) {
            dispatch(connectWallet());
        }
        // eslint-disable-next-line
    }, []);

    return (
            <div className="App">
                <>
                <BrowserRouter>
                < Navbar />
                <Routes>
                <Route exact path="/add" element={<AddLiquidity/>}/>
                <Route exact path="/swap" element={<TradeExchange/>}/>
               </Routes>
               </BrowserRouter>
               </>

            </div>
    );
}

export default App;
