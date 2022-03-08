import React, { useState } from "react";
import HelpIcon from "../HelpIcon/HelpIcon";
import "./TradeExchange.css";
import { Link, Router } from "react-router-dom";
import networkIcon from '../../Assets/network.png'
import settingsIcon from '../../Assets/Settings.png'
import timeIcon from '../../Assets/time-history.png'
import exchangeIcon from '../../Assets/exchange-icon.png'
import refreshIcon from '../../Assets/refresh.png'
import ethIcon from '../../Assets/eth.png'
import btIcon from '../../Assets/bt-logo.png'
import ButtonGroup from "../TradeLiquidityBtn/ButtonGroup";
import TokenSelect from '../AddLiquidity/TokenSelect';
import { Button } from 'react-bootstrap';
import {useSelector} from 'react-redux';
import { useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import Connect from "../Connect/Connect";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  scales: {
    xAxes: [{
        gridLines: {
            color: "rgba(0, 0, 0, 0)",
        }
    }],
    yAxes: [{
        gridLines: {
            color: "rgba(0, 0, 0, 0)",
        }   
    }]
},
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data:['100', '200', '400', '420', '600', '700', '920'] ,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: ['200', '150', '900', '700', '200', '420', '100'] ,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function TradeExchange() {

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [selectedToken,setSelectedToken] = useState(null);
  const [selectedToken2,setSelectedToken2] = useState(null);
  const [balance,setBalance] = useState(0);
  const [balance2,setBalance2] = useState(0);
  const [tokenInstance,setTokenInstance] = useState(null);
  const [tokenAddress,setTokenAddress] = useState(null);
  const [BnbValue,setBnbValue] = useState('');
  const [TokenAmount,setTokenAmount] = useState('');
  const [selectedTokAddress1,setSelectedTokAddress1] = useState(null);
  const [selectedTokAddress2,setSelectedTokAddress2] = useState(null);

  const wallet = useSelector((state) => state.WalletConnect);
  const network = useSelector((state)=>state.activeNetwork);
  const {router,path} = network;
  const RouterAddress = '0x552Cdb224c75652D3E8cCFcCAD084eD7De806A10';

console.log(tokenInstance);
  const swapHandler = async () => {
    const BnbEth =  wallet.web3.utils.toWei(BnbValue, "ether");
    const TokenAmountEth =  wallet.web3.utils.toWei(TokenAmount, "ether");
    const time = Math.floor(Date.now() / 1000) + 300;
    const res = await router.methods.swapETHForExactTokens(TokenAmountEth,[path,selectedTokAddress2.address],wallet.address,time).send({from:wallet.address,value:BnbEth});
    console.log(res);
  }

  useEffect(()=> {
    
  },[])
  return (
    <div className="container-fluid">
    <div className=" row trade__exchange_page">
      {/* <div className="title__btns">
        <span className="exc-btn">Exchange</span>
        <hr className="btn_border"></hr>
        <Link to='/liquidity' className="link">
        <span className="liq-btn">Liquidity</span>
        </Link>
        <hr className="btn_border"></hr>
      </div> */}
     
      
        <div className="col-lg-7">
        <div className="graph container-sm">
            <div className="graph_box_header">
              <img className="inp__icon__1" src={btIcon}></img>
              <img className="inp__icon__1" src={ethIcon}></img>
              <span className="graph_header_title">BNB/BTswap</span>
              <img src={refreshIcon} className="graph-exchange" />
              {/* <button className="graph_viewOption_active">Basic</button>
              <button className="graph_viewOption">TradingView</button>
              <span className="expand">
                <i class="fas fa-expand-alt"></i>
              </span> */}
            </div>
            <div className="graph_box_price_date row ml-2 mt-3 ">
              <div className="graphbox_price col-8">
                <div className="btc">
                  <h2 className="btc-price">41.23</h2>
                  <span className="btc-name">BNB/BTswap</span>
                  {/* <span className="btc-status">-1.000 (-3.31%) </span> */}
                </div>
                <p className="date">+264.992135 bt swap (+11.32%) <span className="graph_date_span">Past 24 Hours</span> </p>
              </div>
              <div className="graphbox_date col-4">
                <div className=" align-self-center range-picker">
                  <div className=" text-center col-3">
                    <button className="hours">24 h</button>
                  </div>
                  <div className="text-center col-3">
                    <button className="weeks">50 w</button>
                  </div>
                  <div className=" text-center col-3">
                    <button className="months">12 m</button>
                  </div>
                  <div className=" text-center col-3">
                    <button className="years">24 y</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row graphRow">
            <Line options={options} data={data} />;
              </div>
          </div>
          </div>
        <div className="col-lg-5">
        <div className="buy">
            <div className="buy__navbar">
              <div className="nav__one col-2">
                <img src={networkIcon} className="net" />
              </div>
              <div className="nav__two col-6">
                <span className="nav__title">BT Swap</span>
              </div>
              <div className="nav__three col-4">
                <span className="nav__settings">
                <img src={settingsIcon} className="net" />
                  {/* <i class="fas fa-cog"></i> */}
                </span>
                <span className="nav__time">
                <img src={timeIcon} className="net" />
                  {/* <i class="far fa-clock"></i> */}
                </span>
              </div>
            </div>
            {/* <span className="buy__tagline">Trade tokens in an instant</span> */}
            <hr className="buy__line"></hr>
            <div className="trade__input">
              <div className="icon__title">
             <span className="input_title">Pay</span> 
            <TokenSelect modalType={'pair1'} setTokenAddress={setTokenAddress} setSelectedTokAddress1={setSelectedTokAddress1} setTokenInstance={setTokenInstance} setBalance={setBalance} show={show} setShow={setShow} selectedToken={selectedToken} setSelectedToken={setSelectedToken}/>
          </div>
          <span className='tokenSelected'>{selectedToken ? selectedToken.name : ''}</span>
          <span className='tokenBalance'>{selectedToken ? balance : ''}</span>
          <input className="inp__1" type="text" placeholder="0.00" onChange={(e)=>setBnbValue(e.target.value)} />
          <img src={ethIcon} className='swapselectTokenIcon1' alt='selectTokenIcon'/>
            <span className='swapselectTokenName1'>ETH</span>
          <Button  onClick={() => setShow(true)} className="inp__title__1"><span className="inp__choose__1"><i class="fas fa-chevron-down"></i></span></Button>
            </div>
            <div className="ex-icon">
              <img src={exchangeIcon} className="net" />
            </div>
            <div className="trade__input__2">
              <div className="icon__title">
              <span className="input_title">Receive</span> 
            {/* <span className='tokenBalance'>Select Tokens other than BNB</span> */}
            <TokenSelect modalType={'pair2'} setTokenAddress={setTokenAddress} setTokenInstance={setTokenInstance} setSelectedTokAddress2={setSelectedTokAddress2} setBalance2={setBalance2} show={show2} setShow={setShow2} selectedToken2={selectedToken2} setSelectedToken2={setSelectedToken2}/>
          </div>
          <span className='tokenSelected'>{selectedToken2 ? selectedToken2.name : ''}</span>
          <span className='tokenBalance'>{selectedToken2 ? balance2 : ''}</span>
          <input className="inp__1" type="text" placeholder="0.00" onChange={(e)=>setTokenAmount(e.target.value)} />
          <img src={ethIcon} className='swapselectTokenIcon2' alt='selectTokenIcon'/>
            <span className='swapselectTokenName2'>ETH</span>
          <Button  onClick={() => setShow2(true)} className="inp__title__2"> <span className="inp__choose__1"><i class="fas fa-chevron-down"></i></span></Button>
            </div>
            
        <button className="trade__wallet" onClick={swapHandler}>Swap</button>
          </div></div>
      
        </div>
     
    </div>

  );
}

export default TradeExchange;
