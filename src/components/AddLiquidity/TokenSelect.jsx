import React, { useContext, useState } from "react";
import "./TokenSelect.css";
import { Modal, ListGroup } from "react-bootstrap";
import token from "../../contracts/erc20.json";
import { useSelector } from "react-redux";
import pair from "../../contracts/pair.json";
import { useDispatch } from "react-redux";
import { pairAdd } from "../../redux/WalletAction";
import dataContext from "../ContextData";
import { useEffect } from "react";

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
  selectedTokAddress1,
  selectedTokAddress2,
  setSelectedTokAddress1,
  setSelectedTokAddress2,
  BnbValue,
  setconvertedPrice,
  setPairAddress,
  setCurrentPairPrice,
  currentPairPrice,
  bnbList,
  ethList,
  maticList,
  fantomList,
  setBnbList,
  setEthList,
  setMaticList,
  setFantomList
}) {
  const data = useContext(dataContext);
  const wallet = useSelector((state) => state.WalletConnect);
  const network = useSelector((state) => state.activeNetwork);
  const [searchToken, setSearchToken] = useState(null);
  const [tokenName, setTokenName] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const [currentArray, setCurrentArray] = useState("");

  const [pushAray, setPushArray] = useState([]);
  const { networkId, factory } = network;
  let { tokenAddress1, tokenAddress2 } = network;
  // const dispatch = useDispatch();

  const addEntry = async () => {
    try {
      const TokenSearch = new wallet.web3.eth.Contract(token, searchToken);
      const tname = await TokenSearch.methods.name().call();
      const tSymbol = await TokenSearch.methods.symbol().call();
      // const Balance =  await TokenSearch.methods.balanceOf(wallet.address).call();
      setTokenName(tname);
      setTokenSymbol(tSymbol);
      // var existingEntries = JSON.parse(window.localStorage.getItem({currentArray}));
      // if(existingEntries == null) existingEntries = [];
      // var name = tokenName;
      // var symbol = tokenSymbol;
  
      let arr = JSON.parse(localStorage.getItem(`${currentArray}`)) || [];
      var entry = {
        name: tname,
        symbol: tSymbol,
        address: searchToken,
      };
      arr.push(entry);
      // alert(entry)
  
      localStorage.setItem(`${currentArray}`, JSON.stringify(arr));
      renderSwitch(networkId);
      setBnbList(JSON.parse(window.localStorage.getItem('bnb')));
      setEthList(JSON.parse(window.localStorage.getItem('eth')));
      setFantomList(JSON.parse(window.localStorage.getItem('ftm')));
      setMaticList(JSON.parse(window.localStorage.getItem('matic')))
    } catch (error) {
      console.log(error)
      
    }
   
  };
  // console.log(JSON.parse(window.localStorage.getItem({currentArray})));
  const handleTokenAddress = async () => {
    const TokenSearch = new wallet.web3.eth.Contract(token, searchToken);
    const name = await TokenSearch.methods.name().call();
    const Symbol = await TokenSearch.methods.symbol().call();
    const Balance = await TokenSearch.methods.balanceOf(wallet.address).call();
    setTokenName(name);
    setTokenSymbol(Symbol);
  };
  const handleSelectedToken = async (e) => {
    setTokenAddress(e.address);
    if (modalType === "pair1") {
      setSelectedToken(e);
      setSelectedTokAddress1(e.nativeAddress);
      data.setTok1(e.nativeAddress);
      setShow(false)
    } else {
      setSelectedToken2(e);
      setSelectedTokAddress2(e.address);
      data.setTok2(e.address);
      setShow(false)

      const pairExist = await factory.methods
        .getPair(data.tok1, e.address)
        .call();
      if (pairExist === "0x0000000000000000000000000000000000000000") {
        setPairAddress(false);
        console.log(pairExist);
      } else {
        setPairAddress(true);
        data.setPairContractAddress(pairExist);

        const newPair = await new wallet.web3.eth.Contract(pair, pairExist);
        console.log(newPair);

        const reserves = await newPair.methods.getReserves().call();
        const tokePrice2 = wallet.web3.utils.fromWei(reserves[0], "ether");
        const tokePrice1 = wallet.web3.utils.fromWei(reserves[1], "ether");
        console.log(tokePrice1);
        console.log(tokePrice2);
        const price = tokePrice1 / tokePrice2;
        setCurrentPairPrice(price);
      }
    }
    if (e.address != "native") {
      const Token = new wallet.web3.eth.Contract(token, e.address);
      setTokenInstance(Token);
      const Balance = await Token.methods.balanceOf(wallet.address).call();

      const bal = wallet.web3.utils.fromWei(Balance, "ether");
      if (modalType === "pair1") {
        setBalance(bal);
      } else {
        setBalance2(bal);
      }
    } else {
      const NativeBalance = network.balance;
      console.log(NativeBalance);
      const convertedWei = wallet.web3.utils.fromWei(NativeBalance, "ether");

      if (modalType === "pair1") {
        setBalance(convertedWei);
      } else {
        setBalance2(convertedWei);
      }
    }
  };


  useEffect(() => {
    if (networkId === "97") {
      setCurrentArray("bnb");
    } else if (networkId === "4") {
      setCurrentArray("eth");
    } else if (networkId === "80001") {
      setCurrentArray("matic");
    } else {
      setCurrentArray("ftm");
    }
  }, [
    bnbList,
    maticList,
    fantomList,
    ethList,
    tokenSymbol,
    tokenName,
    networkId,
    currentArray,
    JSON.parse(window.localStorage.getItem('bnb')),
    JSON.parse(window.localStorage.getItem('eth')),
    JSON.parse(window.localStorage.getItem('matic')),
    JSON.parse(window.localStorage.getItem('ftm')),
  ]);

  const renderSwitch = (networkId) => {
    console.log(networkId);
    switch (networkId) {
      case "97":
        return (
          <>
            {JSON.parse(window.localStorage.getItem('bnb')).map((e) => {
              return (
                <ListGroup.Item
                  className="currInput"
                  onClick={() => handleSelectedToken(e)}
                > <div className="TokeNSearch" style={{display:'flex'}}>
                <div className="TokenSearchImage">
                {<img className="tokenlogo" src={e.logoURI}></img>}
                </div>
                <div className="TokenSearchDetails" >
                {<span className="tokenName">{e.name}</span>}
                {<span className="tokenSymbol">{e.symbol}</span>}
                </div>
                </div>
                </ListGroup.Item>
              );
            })}
          </>
        );

      case "4":
        // alert(JSON.stringify(localStorage.getItem('eth')))
        return (
          <>
            {JSON.parse(window.localStorage.getItem('eth')).map((e) => {
              return (
                <ListGroup.Item
                  className="currInput"
                  onClick={() => handleSelectedToken(e)}
                ><div className="TokeNSearch" style={{display:'flex'}}>
                <div className="TokenSearchImage">
                {<img className="tokenlogo" src={e.logoURI}></img>}
                </div>
                <div className="TokenSearchDetails" >
                {<span className="tokenName">{e.name}</span>}
                {<span className="tokenSymbol">{e.symbol}</span>}
                </div>
                </div>
                </ListGroup.Item>
              );
            })}
          </>
        );

      case "80001":
        return (
          <>
            {JSON.parse(window.localStorage.getItem('matic')).map((e) => {
              return (
                <ListGroup.Item
                  className="currInput"
                  onClick={() => handleSelectedToken(e)}
                ><div className="TokeNSearch" style={{display:'flex'}}>
                <div className="TokenSearchImage">
                {<img className="tokenlogo" src={e.logoURI}></img>}
                </div>
                <div className="TokenSearchDetails" >
                {<span className="tokenName">{e.name}</span>}
                {<span className="tokenSymbol">{e.symbol}</span>}
                </div>
                </div>
                </ListGroup.Item>
              );
            })}
          </>
        );

      case "4002":
        return (
          <>
            {JSON.parse(window.localStorage.getItem('ftm')).map((e) => {
              return (
                <ListGroup.Item
                  className="currInput"
                  onClick={() => handleSelectedToken(e)}
                ><div className="TokeNSearch" style={{display:'flex'}}>
                <div className="TokenSearchImage">
                {<img className="tokenlogo" src={e.logoURI}></img>}
                </div>
                <div className="TokenSearchDetails" >
                {<span className="tokenName">{e.name}</span>}
                {<span className="tokenSymbol">{e.symbol}</span>}
                </div>
                </div>
                </ListGroup.Item>
              );
            })}
          </>
        );

      default:
        break;
    }
  };
  return (
  
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton closeVariant="white" >
        
          <Modal.Title id="example-custom-modal-styling-title">
            Select Token
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input
              type="text"
              name="tokenAddress"
              id="tokenAddress"
              className="tokenSearchInput"
              placeholder="Search by token address"
              onChange={(e) => setSearchToken(e.target.value)}
              // onChange={()}
            />
            <button className="add_token_btn" onClick={() => addEntry()}>
              Add Token
            </button>
          <ListGroup>
            <>{renderSwitch(networkId)}</>
          </ListGroup>
        </Modal.Body>
      </Modal>

  );
}

export default TokenSelect;
