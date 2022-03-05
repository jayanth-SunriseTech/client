import React, { useEffect } from "react";
import Navbar from './components/Navbar/Navbar';
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
import Home from './components/Home/Home'
import { DataProvider } from "./components/ContextData";
import Sample from "./components/Sample";
import Add from "./components/AddLiquidity/Add";
import FarmsTable from "./components/Farms/FarmsTable";

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
                <DataProvider>
                < Navbar />
                <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/add" element={<Add/>}/>
                <Route exact path="/swap" element={<TradeExchange/>}/>
                <Route exact path="/farms" element={<FarmsTable/>}/>
               </Routes>
               </DataProvider>
               </BrowserRouter>
               </>

            </div>
    );
}

export default App;
