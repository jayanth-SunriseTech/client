import React, { useState } from 'react';

let DataContext = React.createContext();
export default DataContext;

export const DataProvider = ({ children }) => {
    const [tok1,setTok1] = useState('');
    const [tok2,setTok2] = useState('');
    const [pairContractAddress,setPairContractAddress] = useState('');
    const [BnBTokens,setBnBTokens] = useState([ {
        "name": " BNB",
        "symbol": "BT  BNB",
        "address": "native",
        "nativeAddress":'0xe66f1e5b77d1817366e9eb99ae419a0c3615baaf',
        "chainId": 97,
        "decimals": 18,
        "logoURI": "https://pancake.kiemtienonline360.com/images/coins/0xae13d989dac2f0debff460ac112a837c89baa7cd.png"
      },
    {
        "name": " BT Token",
        "symbol": "BT  BNB",
        "address": "0x594f4a2e7ba607aa95cb01f7d81b386665a5fb6c",
        "nativeAddress":'0xe66f1e5b77d1817366e9eb99ae419a0c3615baaf',
        "chainId": 97,
        "decimals": 18,
        "logoURI": "https://pancake.kiemtienonline360.com/images/coins/0xae13d989dac2f0debff460ac112a837c89baa7cd.png"
      },
      {
        "name": "BT USD",
        "symbol": "BT USD",
        "address": "0xE747a50e14A61B0b1bfC80Fb1A02750FD44c1715",
        "nativeAddress":'0xe66f1e5b77d1817366e9eb99ae419a0c3615baaf',
        "chainId": 97,
        "decimals": 18,
        "logoURI": "https://pancake.kiemtienonline360.com/images/coins/0x78867bbeef44f2326bf8ddd1941a4439382ef2a7.png"
      },
  
      {
        "name": "BT  ETH ",
        "symbol": "BT ETH",
        "address": "0x68e813d8c435489f0Bfc60FbceAF72E0E6eE8281",
        "chainId": 97,
        "decimals": 18,
        "logoURI": "https://pancake.kiemtienonline360.com/images/coins/0x8babbb98678facc7342735486c851abd7a0d17ca.png"
      },
      {
        "name": " BT DAI ",
        "symbol": "BT DAI",
        "address": "0x0eF2aD6C2327516563015500f1e125Ae907e23A0",
        "chainId": 97,
        "decimals": 18,
        "logoURI": "https://pancake.kiemtienonline360.com/images//coins/0x8a9424745056eb399fd19a0ec26a14316684e274.png"
      },
      {
        "name": "BT  Token",
        "symbol": "BT  Token",
        "address": "0x594f4a2e7ba607aa95cb01f7d81b386665a5fb6c",
        "chainId": 97,
        "decimals": 18,
        "logoURI": "https://pancake.kiemtienonline360.com/images/coins/0xf9f93cf501bfadb6494589cb4b4c15de49e85d0e.png"
      },
      {
        "name": "BT  moon ",
        "symbol": "BT MOON",
        "address": "0x318d44C1E56A55CBd6a5d0795404A0B6429c7fe2",
        "chainId": 97,
        "decimals": 18,
        "logoURI": "https://pancake.kiemtienonline360.com/images/coins/0xdacbdecc2992a63390d108e8507b98c7e2b5584a.png"
      }]);

      const [ethTokens,setEthTokens] = useState([ {
        "name": " ETH",
        "symbol": "ETH",
        "address": 'native',
        "nativeAddress":'0x55CCC1093278400051a25c1E46E6BCED9fF6C1a1',
        "chainId": 4,
        "decimals": 18,
        "logoURI": "https://pancake.kiemtienonline360.com/images/coins/0x8babbb98678facc7342735486c851abd7a0d17ca.png"
      },
      {
        "name": "BTL",
        "symbol": "BTL",
        "address": "0xFF4918F00DAf0c2a15C48Ce8C2b40ab5DA3ed065",
        "nativeAddress":'0x55CCC1093278400051a25c1E46E6BCED9fF6C1a1',
        "chainId": 4,
        "decimals": 18,
        "logoURI": "https://pancake.kiemtienonline360.com/images/coins/0x78867bbeef44f2326bf8ddd1941a4439382ef2a7.png"
      },
    
      {
        "name": "BEth",
        "symbol": "BEth",
        "address": "0x7A82D6F5bF187a1a9d423D18f9a0B854fE9BF145",
        "nativeAddress":'0x55CCC1093278400051a25c1E46E6BCED9fF6C1a1',
        "chainId": 4,
        "decimals": 18,
        "logoURI": "https://pancake.kiemtienonline360.com/images//coins/0x8a9424745056eb399fd19a0ec26a14316684e274.png"
      }]);

      const [maticTokens,setMaticTokens] = useState([ {
        "name": "Matic",
        "symbol": "MATIC",
        "address": 'native',
        "nativeAddress":'0x43b0389f8c9305bc18586f0113c1aa9052c46296',
        "chainId": 80001,
        "decimals": 18,
        "logoURI": "https://pancake.kiemtienonline360.com/images/coins/0x8babbb98678facc7342735486c851abd7a0d17ca.png"
    },
    {
        "name": "BT Matic",
        "symbol": "BTL",
        "address": '0x40942F100FeC5B33fcD254BaDeF0D9f726fF3f86',
        "nativeAddress":'0x43b0389f8c9305bc18586f0113c1aa9052c46296',
        "chainId": 80001,
        "decimals": 18,
        "logoURI": "https://pancake.kiemtienonline360.com/images/coins/0x8babbb98678facc7342735486c851abd7a0d17ca.png"
    },
    {
        "name": "BE Matic",
        "symbol": "BEMATIC",
        "address": '0xb53986CEf36c45a46Fe6819a9C03Fb4592943821',
        "nativeAddress":'0x43b0389f8c9305bc18586f0113c1aa9052c46296',
        "chainId": 80001,
        "decimals": 18,
        "logoURI": "https://pancake.kiemtienonline360.com/images/coins/0x8babbb98678facc7342735486c851abd7a0d17ca.png"
    }]);

    const [fantomTokens,setFantomTokens] = useState([{
        "name": "FTM",
        "symbol": "FTM",
        "address": 'native',
        "nativeAddress":'0x274F45dCDd137E889544226696BAC6D23974Be23',
        "chainId": 4002,
        "decimals": 18,
        "logoURI": "https://pancake.kiemtienonline360.com/images/coins/0x8babbb98678facc7342735486c851abd7a0d17ca.png"
    },
    {
        "name": "BT Matic",
        "symbol": "BTL",
        "address": '0x438AbFE329C0F38c02C971B8d34307beB06aD778',
        "nativeAddress":'0x274F45dCDd137E889544226696BAC6D23974Be23',
        "chainId": 4002,
        "decimals": 18,
        "logoURI": "https://pancake.kiemtienonline360.com/images/coins/0x8babbb98678facc7342735486c851abd7a0d17ca.png"
    },
    {
        "name": "BETH",
        "symbol": "BETH",
        "address": '0x40942F100FeC5B33fcD254BaDeF0D9f726fF3f86',
        "nativeAddress":'0x274F45dCDd137E889544226696BAC6D23974Be23',
        "chainId": 4002,
        "decimals": 18,
        "logoURI": "https://pancake.kiemtienonline360.com/images/coins/0x8babbb98678facc7342735486c851abd7a0d17ca.png"
    },])

    return (
        <DataContext.Provider 
        
        value={{tok1,setTok1,tok2,setTok2,pairContractAddress,setPairContractAddress,BnBTokens,setBnBTokens,fantomTokens,setFantomTokens,maticTokens,setMaticTokens,ethTokens,setEthTokens}}>
            { children }
        </DataContext.Provider>
    )

}