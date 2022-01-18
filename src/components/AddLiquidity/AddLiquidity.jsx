import React,{useEffect, useState} from 'react';
// import HelpIcon from '../HelpIcon/HelpIcon';
// import ButtonGroup from '../TradeLiquidityBtn/ButtonGroup';
import './AddLiquidity.css';
// import {NavLink} from 'react-router-dom';
import { Button, Modal, ListGroup } from 'react-bootstrap';
import Tokens from '../TokenList';
import TokenSelect from './TokenSelect';
import {useSelector} from 'react-redux';
import token from '../../contracts/erc20.json';

function AddLiquidity() {

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [selectedToken,setSelectedToken] = useState(null);
  const [selectedToken2,setSelectedToken2] = useState(null);
  const [balance,setBalance] = useState(0);
  const [balance2,setBalance2] = useState(0);
  const [tokenInstance,setTokenInstance] = useState(null);
  const [tokenAddress,setTokenAddress] = useState(null);
  const [inputAmount,setAmount] = useState('');
  const [BnbValue,setBnbValue] = useState('');
  const [TokenAmount,setTokenAmount] = useState('');
  const [selectedTokAddress1,setSelectedTokAddress1] = useState(null);
  const [selectedTokAddress2,setSelectedTokAddress2] = useState(null);
  

  const wallet = useSelector((state) => state.WalletConnect);
  const network = useSelector((state)=>state.activeNetwork);
  const {router} = network;
  
  
  const handleApprove = async () => {
    const RouterAddress = '0x552Cdb224c75652D3E8cCFcCAD084eD7De806A10'

    const res = await tokenInstance.methods.approve(RouterAddress,'10000000000000000000000000').send({from:wallet.address});
    console.log(res);
  }

  
  const supplyHandler = async () => {
    console.log(network);
    const time = Math.floor(Date.now() / 1000) + 300;
    const BnbEth =  wallet.web3.utils.toWei(BnbValue, "ether");
    const TokenAmountEth =  wallet.web3.utils.toWei(TokenAmount, "ether");
    
    const res = await router.methods.addLiquidityETH(tokenAddress,TokenAmountEth,0,0,wallet.address,time).send({from:wallet.address,value:BnbEth});
    console.log(res);

  }

  useEffect(()=>{
console.log(selectedToken);

  },[selectedToken])
    return (
        <div className='add_liquidity_page'>
            {/* <ButtonGroup/> */}
            <div className="add__box">
            <div className="add__liquidity">
        <div className="liquidity__navbar">
        {/* <NavLink activeClassName='active-link' to='/liquidity' > */}
          <div className="liquidity__nav_1 col-2">
          <span className="back__icon">
              <i class="fas fa-chevron-left"></i>
            </span>
          </div>
          {/* </NavLink> */}
          <div className="liquidity__nav_2 col-6">
            <span className="liq_nav__title">Add Liquidity</span>
          </div>
          <div className="liquidity__nav_3 col-4">
            <span className="nav__settings">
              <i class="fas fa-cog"></i>
            </span>
            <span className="nav__time">
              <i class="far fa-clock"></i>
            </span>
          </div>
        </div>
        <span className="liq__tagline">Add liquidity to receive LP tokens  <i class="far fa-question-circle"></i></span>
        <hr className="buy__line"></hr>
        <div className="trade__input">
          <div className="icon__title">
            {/* <img className="inp__icon__1" src="bootomlogo.svg"></img> */}
            <Button  onClick={() => setShow(true)} className="inp__title__1">Select a currency <span className="inp__choose__1"><i class="fas fa-chevron-down"></i></span></Button>
            <TokenSelect modalType={'pair1'} setSelectedTokAddress1={setSelectedTokAddress1} setTokenAddress={setTokenAddress} setTokenInstance={setTokenInstance} setBalance={setBalance} show={show} setShow={setShow} selectedToken={selectedToken} setSelectedToken={setSelectedToken}/>
          </div>
          <span className='tokenSelected'>{selectedToken ? selectedToken.symbol : ''}</span>
          <span className='tokenBalance'>{selectedToken ? balance : ''}</span>
          <input className="inp__1" type="text" placeholder="0.00" onChange={(e)=>setBnbValue(e.target.value)} />
        </div>
        <div className="ex-icon">
          <img src="plus.svg" className="plus-icon" />
        </div>
        <div className="trade__input__2">
          <div className="icon__title">
            {/* <img className="inp__icon__1" src="bootomlogo.svg"></img> */}
            
            <Button  onClick={() => setShow2(true)} className="inp__title__1">Select a currency <span className="inp__choose__1"><i class="fas fa-chevron-down"></i></span></Button>
            {/* <span className='tokenBalance'>Select Tokens other than BNB</span> */}
            <TokenSelect modalType={'pair2'} setSelectedTokAddress2={setSelectedTokAddress2} setTokenAddress={setTokenAddress} setTokenInstance={setTokenInstance} setBalance2={setBalance2} show={show2} setShow={setShow2} selectedToken2={selectedToken2} setSelectedToken2={setSelectedToken2}/>
          </div>
          <span className='tokenSelected'>{selectedToken2 ? selectedToken2.symbol : ''}</span>
          <span className='tokenBalance'>{selectedToken2 ? balance2 : ''}</span>
          <input className="inp__1" type="text" placeholder="0.00" onChange={(e)=>setTokenAmount(e.target.value)} />
        </div>
        <button onClick={handleApprove}>Approve</button>
        <button className="trade__wallet" onClick={supplyHandler}>Supply</button>
      </div>
      </div>
      {/* <HelpIcon /> */}
        </div>
    )
}

export default AddLiquidity
