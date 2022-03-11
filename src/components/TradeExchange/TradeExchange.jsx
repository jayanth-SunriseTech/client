import React, { useContext, useState } from "react";
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
import dataContext from "../ContextData";


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
import axios from "axios";
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
            display: false,
            drawOnChartArea: false
        }
    }],
    yAxes: [{
      gridLines: {
            display: false,
            drawOnChartArea: false
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
  tooltips: {
    callbacks: {
        label: function (tooltipItem) {
            return (tooltipItem.value.toFixed(5));
        }
    }
}
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data:['100', '200', '400', '420', '600', '700', '920'] ,
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: ['200', '150', '900', '700', '200', '420', '100'] ,
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

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
  const [chartData, setChartData] = useState({ datasets: [],})
  const [days,setDays] = useState(null)
  const [showWeek,setShowWeek] = useState(false)
  const [showMonth,setShowMonth] = useState(false)
  const [showYear,setShowYear] = useState(false)


  
 
  const[bnbList,setBnbList] = useState([]);
  const[ethList,setEthList] = useState([]);
  const[maticList,setMaticList] = useState([]);
  const[fantomList,setFantomList] = useState([]);
  const[selectedTokenName,setSelectedTokenName] =useState(null);
  const [pairAddress, setPairAddress] = useState(true);
  const [currentPairPrice,setCurrentPairPrice] = useState(null);
  const [convertedPrice, setconvertedPrice] = useState("");
  const[swapTokenPrice,setSwapTokenPrice] = useState(null);
  const[selectedSwapPrice,setSelectedSwapPrice] = useState(null);
  const[displaySwapPrice,setDisplaySwapPrice] = useState(null);
  const [slippageValue,setSlippageValue] = useState(null);
  const [slippageInput,setSlippageInput] = useState(null);

  const wallet = useSelector((state) => state.WalletConnect);
  const network = useSelector((state)=>state.activeNetwork);
  const {router,path,networkId} = network;
  const RouterAddress = '0x552Cdb224c75652D3E8cCFcCAD084eD7De806A10'; 
  const data = useContext(dataContext);
console.log(tokenInstance);

const updateSwapPrice = async (e) => {
  console.log(parseFloat(e.target.value*swapTokenPrice).toFixed(10))

  if(slippageInput){
    setSlippageValue((slippageInput))
    console.log(slippageValue)
    let percentage=(e.target.value*swapTokenPrice)*(slippageValue/100)
setSelectedSwapPrice(parseFloat((e.target.value*swapTokenPrice)-percentage).toFixed(15))
console.log(parseFloat((e.target.value*swapTokenPrice)-percentage).toFixed(15))
setDisplaySwapPrice((e.target.value*swapTokenPrice).toFixed(4))
  }
  else {
    let percentage=(e.target.value*swapTokenPrice)*(0.5/100)
    setSelectedSwapPrice(parseFloat((e.target.value*swapTokenPrice)-percentage).toFixed(10))
    setDisplaySwapPrice((e.target.value*swapTokenPrice).toFixed(4))
  }
}


  const swapHandler = async () => {
    alert(selectedSwapPrice)
    alert(BnbValue)
    const BnbEth =  wallet.web3.utils.toWei(BnbValue, "ether");
    const TokenAmountEth =  wallet.web3.utils.toWei(selectedSwapPrice, "ether");
    const time = Math.floor(Date.now() / 1000) + 60 * 20;
    const TokenAddress =  data.tok2;

    console.log(BnbValue,"Input Value")
    console.log(typeof BnbValue,"Input Value")
    console.log(TokenAmountEth,"Buying Value")
    console.log( typeof TokenAmountEth,"Buying Value")
    console.log(path,"Path Adress")
    console.log(typeof path,"Path Adress")
    console.log(TokenAddress,"Token Address")
    console.log( typeof TokenAddress,"Token Address")
    console.log(time,"Time")
    console.log(typeof time,"Time")
    console.log(path,"Path Value")
    
    const res = await router.methods.swapExactETHForTokensSupportingFeeOnTransferTokens(TokenAmountEth, [ path , TokenAddress ] ,wallet.address,time).send({from:wallet.address,value:BnbEth.toString()});
    console.log(res);
  }

  useEffect(() => {
  // const labels = ['5-03', '6-03', '7-03', '8-03', '9-03', '10-03', '11-03'];
    const from_UNIX = Math.floor((new Date(new Date().getTime())-2880*60*60*1000) / 1000);
    const to_UNIX = Math.floor((new Date(new Date().getTime())-60*60*1000) / 1000);
    console.log(from_UNIX)
    console.log(to_UNIX)
    const fetchPrices = async () => {
      
      const res = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${from_UNIX}&to=${to_UNIX}`)
     console.log(res)
      const data = res.data.prices.reverse();
 console.log(data)
 console.log(typeof data[1][1])
//  // Pushing time data//
//  const time = [];
//  data.data.map((crypto) => time.push(new Date(crypto.date.toString())));
//  console.log(time)
//   // Pushing price data//
//  const price=[];
//  data.data.map((crypto) =>price.push(crypto.priceUsd))
//  console.log(price)
// // Converting UNIX time to Human date //

// data.data.map((crypto)=> );

//  console.log(time.map((e,i)=>price[i]))



let labeldata=[];
let date = [];
data.filter((e,i)=>i<days).map((e,i)=>{date.push(new Date((e[0])).toLocaleDateString("en-IN"))})
data.filter((e,i)=>i<days).map((e,i)=>{labeldata.push(e[1].toFixed(5))})
      setChartData({
        labels:date,
        // labels:labels,
        datasets: [
          {
            label: "Price of BTC",
            data: labeldata,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ]
      });
    }
    fetchPrices();
  }, [selectedTokenName,selectedSwapPrice,slippageInput,slippageValue,days])
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
                  <span className="btc-name">BT Swap/BNB</span>
                  {/* <span className="btc-status">-1.000 (-3.31%) </span> */}
                </div>
                <p className="date">+264.992135 bt swap (+11.32%) <span className="graph_date_span">Last Week</span> </p>
              </div>
              <div className="graphbox_date col-4">
                <div className=" align-self-center range-picker">
                  <div className=" text-center col-3">
                    <button onClick={()=>setDays(7)} className="hours">Past 7 Days</button>
                  </div>
                  <div className="text-center col-3">
                    <button onClick={()=>setDays(30)} className="weeks">Past Month</button>
                  </div>
                  <div className=" text-center col-3">
                    <button onClick={()=>setDays(365)} className="months">Past Year</button>
                  </div>
                  <div className=" text-center col-3">
                    <button className="years">24 y</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row graphRow">
            <Line options={options} data={chartData} />;
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
              <div  className="nav__three col-4">
                <span className="nav__settings">
                <img data-toggle="modal" data-target="#settingsModal"   src={settingsIcon} className="net" />
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
            <TokenSelect modalType={'pair1'} 
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
          <span className='swaptokenSelected'>{selectedToken ? selectedToken.name : ''}</span>
          <span className='swaptokenBalance'>{selectedToken ? balance : ''}</span>
          <input className="inp__1" type="text" placeholder="0.00" onChange={(e)=>{setBnbValue(e.target.value);updateSwapPrice(e)}} />
          {/* <img src={ethIcon} className='swapselectTokenIcon1' alt='selectTokenIcon'/> */}
            <span className='swapselectTokenName1'>{selectedToken ? selectedToken.name : ""}</span>
          <Button  onClick={() => setShow(true)} className="swapinp__title__1"><span className="inp__choose__1"><i class="fas fa-chevron-down"></i></span></Button>
            </div>
            <div className="swapex-icon ">
              <img src={exchangeIcon} className="net" />
            </div>
            <div className="trade__input__2">
              <div className="icon__title">
              <span className="input_title">Receive</span> 
            {/* <span className='tokenBalance'>Select Tokens other than BNB</span> */}
            <TokenSelect modalType={'pair2'}  setPairAddress={setPairAddress}
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
          <span className='swaptokenSelected2'>{selectedToken2 ? selectedToken2.name : ''}</span>
          <span className='swaptokenBalance2'>{selectedToken2 ? balance2 : ''}</span>
          <input className="inp__1" type="text" placeholder="0.00" value={displaySwapPrice}  />
          {/* <img src={ethIcon} className='swapselectTokenIcon2' alt='selectTokenIcon'/> */}
            <span className='swapselectTokenName2'>{selectedTokenName ? selectedTokenName : ""}</span>
          <Button  onClick={() => setShow2(true)} className="swapinp__title__2"> <span className="inp__choose__1"><i class="fas fa-chevron-down"></i></span></Button>
            </div>
            
        <button className="trade__wallet" onClick={swapHandler}>Swap</button>
          </div>
          <div
          className="modal fade"
          id="settingsModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="exampleModalLabel"
                  style={{ color: "Black" }}
                >
                  Transaction Settings
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  style={{ background:'none',outline:'none',border:'none' }}
                >
                  <span style={{ color: "Black",background:'none',outline:'none',fontSize:'20px' }} aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <div className="row">
                <h5>Enter Slippage Value</h5>
                </div>
                <div className="row">
                  <div className="col-5">
                    <input value={slippageInput} onChange={(e)=>setSlippageInput(e.target.value)} className="SlippageInput" />
                    </div>
                  <div className="col-7">
                    
                    </div>
                  </div>
              </div>
              <div className="modal-footer">
                
                <button
                  type="button"
                  className="btn btn-danger"
                  
                  data-dismiss="modal"
                >
                 Save
                </button>
              </div>
            </div>
          </div>
        </div>
          {/* <div className=" row slippage_container">
            <div className="container-fluid">
              <div className="row">
                <div className="col-9">
                <h4>Trade Settings</h4>
                  </div>
                <div className="col-3">
                <button><i class="fas fa-xmark"></i></button>
                  </div>
                </div>
              <div className="row">
<p>Slippage Tolerance</p>
<div className="col-3"></div>
<div className="col-9"></div>
                </div>
              <div className="row">
                <p>Slippage Tolerance</p>
                <div className="col-4">
                  <input></input>
                  </div>
                <div className="col-8"></div>
                </div>
              <div className="row"></div>
              </div>
            </div> */}
          </div>
          
      
        </div>
       
     
    </div>

  );
}

export default TradeExchange;
