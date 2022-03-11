import React, { useContext, useEffect, useState } from 'react'
import "./AddLiquidity.css";
import { Button, Modal, ListGroup } from "react-bootstrap";
import Tokens from "../TokenList";
import pair from "../../contracts/pair.json";
import TokenSelect from "./TokenSelect";
import { useSelector } from "react-redux";
import dataContext from "../ContextData";
import EthTokens from '../EthTokenList';
import MaticTokens from "../MaticTokenList";
import FTMTokens from "../FantomTokenList";
import timeIcon from '../../Assets/time-history.png';
import exchangeIcon from '../../Assets/exchange-icon.png'
import btIcon from '../../Assets/bt-logo.png';
import ethIcon from '../../Assets/eth.png'

function Add() {
    const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedToken2, setSelectedToken2] = useState(null);
  const [balance, setBalance] = useState(0);
  const [balance2, setBalance2] = useState(0);
  const [tokenInstance, setTokenInstance] = useState(null);
  const [tokenAddress, setTokenAddress] = useState(null);
  const [BnbValue, setBnbValue] = useState("");
  const [TokenAmount, setTokenAmount] = useState("");
  const [selectedTokAddress1, setSelectedTokAddress1] = useState(null);
  const [selectedTokAddress2, setSelectedTokAddress2] = useState(null);
  const [pairAddress, setPairAddress] = useState(true);
  const [pairAddValue, setPairAddValue] = useState("");
  const [convertedPrice, setconvertedPrice] = useState("");
  const [updatePrice1, setUpdatePrice1] = useState("");
  const [updatePrice2, setUpdatePrice2] = useState("");
  const [currentPairPrice,setCurrentPairPrice] = useState(null)
  const[bnbList,setBnbList] = useState([]);
  const[ethList,setEthList] = useState([]);
  const[maticList,setMaticList] = useState([]);
  const[fantomList,setFantomList] = useState([]);
  const[selectedTokenName,setSelectedTokenName] =useState(null);
  const[swapTokenPrice,setSwapTokenPrice] = useState(null);

  const data = useContext(dataContext);
  const wallet = useSelector((state) => state.WalletConnect);
  const network = useSelector((state) => state.activeNetwork);

  const { router, factory, networkId } = network;

  console.log(data.pairContractAddress);
  const handleApprove = async () => {
    const RouterAddress = router._address;

    const res = await tokenInstance.methods
      .approve(RouterAddress, wallet.web3.utils.toWei(TokenAmount, "ether"))
      .send({ from: wallet.address });
    console.log(res);
  };

  const dynamicPrice = async (e) => {
   
    setUpdatePrice2(e.target.value*currentPairPrice);
    setUpdatePrice1(e.target.value)
  };

  const dynamicPrice2 = async (e) => {
    setUpdatePrice1(e.target.value/currentPairPrice);
    setUpdatePrice2(e.target.value)
  }

  const supplyHandler = async () => {
    console.log(network);
    alert(typeof convertedPrice); 
    const time = Math.floor(Date.now() / 1000) + 300;
    const BnbEth = wallet.web3.utils.toWei(BnbValue, "ether");
    const TokenAmountEth = wallet.web3.utils.toWei(TokenAmount,"ether");
    console.log(TokenAmountEth);
    console.log(BnbEth);

    const res = await router.methods
      .addLiquidityETH(tokenAddress, TokenAmountEth, 0, 0, wallet.address, time)
      .send({ from: wallet.address, value: BnbEth });
    console.log(res);
  };

  useEffect(()=> {

    let BNBList = localStorage.getItem('bnb');
   
// alert(BNBList);
    if (BNBList === null) {
      let bnbTokenList = JSON.stringify(Tokens)
    
      let bnb = window.localStorage.setItem('bnb',bnbTokenList);
      setBnbList(JSON.parse(window.localStorage.getItem('bnb')))
    } else {
      let data=JSON.parse(window.localStorage.getItem('bnb'))
      // alert(JSON.stringify(data))
      setBnbList(JSON.parse(window.localStorage.getItem('bnb')))
    }
    
    let ETHList = localStorage.getItem('eth');
    if (ETHList === null)  {

      let ethTokenList = JSON.stringify(EthTokens)

      let eth = window.localStorage.setItem('eth',ethTokenList);
      setEthList(JSON.parse(window.localStorage.getItem('eth')))
    } else {
      setEthList(JSON.parse(window.localStorage.getItem('eth')))
    }

    let FANTOMLIST = localStorage.getItem('ftm');

    if(FANTOMLIST === null) {
      let fantomTokenList = JSON.stringify(FTMTokens)

      let fantom = window.localStorage.setItem('ftm',fantomTokenList);
      setFantomList(JSON.parse(window.localStorage.getItem('ftm')))
    } else {
      setFantomList(JSON.parse(window.localStorage.getItem('ftm')))
    }

  let MATICLIST = localStorage.getItem('matic');

  if(MATICLIST === null) {
    let maticTokenList = JSON.stringify(MaticTokens)

    let matic = window.localStorage.setItem('matic',maticTokenList)
    setMaticList(JSON.parse(window.localStorage.getItem('matic')))
  } else {
    setMaticList(JSON.parse(window.localStorage.getItem('matic')))
  }

    },[selectedTokenName])

  return (
    <div className='container-fluid AddPage '>
        <div className='row'>
          
        <div className='col-lg-2 col-md-2'></div>
        <div className='col-lg-8 col-md-8 col-12'>
        <div class="card addLiqCard">
            <div>
  <h5 class="card-header liq-card-header text-center">LIQUIDITY POOL <span className="liq_nav__time">
                <img src={timeIcon} className="net" />
                </span></h5>
            </div>
  <div class="card-body">
    
  <div className="trade__input">
            <div className="icon__title">
              {/* <img className="inp__icon__1" src="bootomlogo.svg"></img> */}
              <span className="liq_input_title">Input</span> 
             
              <TokenSelect
                modalType={"pair1"}
                selectedTokAddress1={selectedTokAddress1}
                setSelectedTokAddress1={setSelectedTokAddress1}
                setTokenAddress={setTokenAddress}
                setTokenInstance={setTokenInstance}
                setBalance={setBalance}
                show={show}
                setShow={setShow}
                selectedToken={selectedToken}
                setSelectedToken={setSelectedToken}
                networkId={networkId}
                bnbList={bnbList}
                ethList={ethList}
                maticList={maticList}
                fantomList={fantomList}
                setBnbList={setBnbList}
                setEthList={setEthList}
                setMaticList={setMaticList}
                setFantomList={setFantomList}
                selectedTokenName={selectedTokenName}
                setSelectedTokenName={setSelectedTokenName}
                setSwapTokenPrice={setSwapTokenPrice}
              />
            </div>
            <span className="tokenSelected">
              {selectedToken ? selectedToken.symbol : ""}
            </span>
            <span className="tokenBalance">{selectedToken ? balance : ""}</span>
            <input
              className="liqinp__1"
              type="text"
              placeholder="0.00"
              value={updatePrice1}
              onChange={(e) => {pairAddress ? dynamicPrice(e) : setUpdatePrice1(e.target.value);setBnbValue((e.target.value))}}
            />
             {/* <img src={btIcon} className='selectTokenIcon1' alt='selectTokenIcon'/> */}
            <span className='selectTokenName1'>{selectedToken ? selectedToken.name : ""}</span>
             <Button onClick={() => setShow(true)} className="liqinp__title__1">
                
                <span className="inp__choose__1">
                  <i class="fas fa-chevron-down"></i>
                </span>
              </Button>
          </div>
          <div className="liq-ex-icon">
          <img src={exchangeIcon} className="net" />
          </div>
          <div className="trade__input__2">
            <div className="icon__title">
              {/* <img className="inp__icon__1" src="bootomlogo.svg"></img> */}
              <span className="liq_input_title">Input</span> 
              
              {/* <span className='tokenBalance'>Select Tokens other than BNB</span> */}
              <TokenSelect
                modalType={"pair2"}
                setPairAddress={setPairAddress}
                BnbValue={BnbValue}
                setconvertedPrice={setconvertedPrice}
                selectedTokAddress2={selectedTokAddress2}
                setSelectedTokAddress2={setSelectedTokAddress2}
                setTokenAddress={setTokenAddress}
                setTokenInstance={setTokenInstance}
                setBalance2={setBalance2}
                show={show2}
                setShow={setShow2}
                selectedToken2={selectedToken2}
                setSelectedToken2={setSelectedToken2}
                currentPairPrice={currentPairPrice}
                setCurrentPairPrice={setCurrentPairPrice}
                networkId={networkId}
                bnbList={bnbList}
                ethList={ethList}
                maticList={maticList}
                fantomList={fantomList}
                setBnbList={setBnbList}
                setEthList={setEthList}
                setMaticList={setMaticList}
                setFantomList={setFantomList}
                selectedTokenName={selectedTokenName}
                setSelectedTokenName={setSelectedTokenName}
                setSwapTokenPrice={setSwapTokenPrice}
              />
            </div>
            <span className="tokenSelected">
              {selectedToken2 ? selectedToken2.symbol : ""}
            </span>
            <span className="tokenBalance">
              {selectedToken2 ? balance2 : ""} 
            </span>
            <input
              className="liqinp__1"
              type="text"
              value={ updatePrice2}
              placeholder="0.00"
              onChange={(e) => {pairAddress ? dynamicPrice2(e) : setUpdatePrice2(e.target.value);setTokenAmount(e.target.value)}}
            />
            {/* <img src={ethIcon} className='selectTokenIcon2' alt='selectTokenIcon'/> */}
            <span className='selectTokenName2'>{selectedTokenName ? selectedTokenName : ""}</span>
            <Button onClick={() => setShow2(true)} className="liqinp__title__2">
                <span className="inp__choose__1">
                  <i class="fas fa-chevron-down"></i>
                </span>
              </Button>
          </div>
<div className=' row Transaction_metadat_container'>
    <div className='col-lg-6 col-6 meta_left'>
        <span>7381.078 eth per bt swap</span>
        <span>0.000738 bt swap per eth</span>
        </div>
    <div className='col-lg-6 col-6  meta_right'>
    <span>0%</span>
        <span>share of pool</span>
        </div>
    </div>
          {pairAddress ? (
            ""
          ) : (
            <>
              <button className="approve_btn" onClick={handleApprove}>
                Approve
              </button>
            </>
          )}

          {/* <button className="trade__wallet" onClick={() => getPrice()}>Get Price</button> */}
          <button className="supply__btn" onClick={supplyHandler}>
            Supply
          </button>
  </div>
</div>
            </div>
        <div className='col-lg-2 col-md-2'></div>
        </div>
        </div>
  )
}

export default Add