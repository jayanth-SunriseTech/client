import React from "react";
import "./TokenSelect.css";
import Tokens from "../TokenList";
import EthTokens from '../EthTokenList';
import MaticTokens from "../MaticTokenList";
import FTMTokens from "../FantomTokenList";
import { Modal, ListGroup } from "react-bootstrap";
import token from "../../contracts/erc20.json";
import { useSelector } from "react-redux";

function TokenSelect({
  show,
  setShow,
  setSelectedToken,
  setSelectedToken2,
  modalType,
  setBalance,
  setBalance2,
  setTokenInstance,
  setTokenAddress,
  setSelectedTokAddress1,
  setSelectedTokAddress2
}) {
  const wallet = useSelector((state) => state.WalletConnect);
  const network = useSelector((state)=>state.activeNetwork);
  const {networkId} = network;

  console.log(modalType);
  const handleSelectedToken = async (e) => {
    setTokenAddress(e.address);
    if (modalType === "pair1") {
      setSelectedToken(e);
      setSelectedTokAddress1(e)
    } else {
      setSelectedToken2(e);
      setSelectedTokAddress2(e)
    }
    if (e.address != "native") {
      const Token = new wallet.web3.eth.Contract(token, e.address);
      setTokenInstance(Token)
      const Balance = await Token.methods.balanceOf(wallet.address).call();

      const bal = wallet.web3.utils.fromWei(Balance, "ether");
      if(modalType === "pair1") {
        setBalance(bal);
      } else {
        setBalance2(bal)
      }
      
      
    }
    else {
      const NativeBalance = network.balance;
      console.log(NativeBalance);
      const convertedWei = wallet.web3.utils.fromWei(NativeBalance, "ether");
      
      if(modalType === "pair1") {
        setBalance(convertedWei);
        
      } else {
        setBalance2(convertedWei)
      }
      
    }
  };

 const  renderSwitch = (networkId)=> {
   console.log(networkId);
    switch(networkId) {
      case '97' :
        return (<>{Tokens.map((e) => {
          return (
            <ListGroup.Item
              className="currInput"
              onClick={() => handleSelectedToken(e)}
            >
              {e.name}
              {<img className="tokenlogo" src={e.logoURI}></img>}
            </ListGroup.Item>
          );
        })}</>)

        case '4' :
          return (<>{EthTokens.map((e) => {
            return (
              <ListGroup.Item
                className="currInput"
                onClick={() => handleSelectedToken(e)}
              >
                {e.name}
                {<img className="tokenlogo" src={e.logoURI}></img>}
              </ListGroup.Item>
            );
          })}</>)

          case '80001' : 
          return (<>{MaticTokens.map((e)=> {
            return (
              <ListGroup.Item
                className="currInput"
                onClick={() => handleSelectedToken(e)}
              >
                {e.name}
                {<img className="tokenlogo" src={e.logoURI}></img>}
              </ListGroup.Item>
            );
          })}</>)

          case '4002' : 
          return (<>{FTMTokens.map((e)=> {
            return (
              <ListGroup.Item
                className="currInput"
                onClick={() => handleSelectedToken(e)}
              >
                {e.name}
                {<img className="tokenlogo" src={e.logoURI}></img>}
              </ListGroup.Item>
            );
          })}</>)

          default :
          break;
    }
  }
  return (
    <div className="token_select">
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Select Tokens
            <input
              type="text"
              name="tokenAddress"
              id="tokenAddress"
              placeholder="Search by token address"
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <>
          {renderSwitch(networkId)}
            </>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TokenSelect;
