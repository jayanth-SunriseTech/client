// constants
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import store from "./store";
import factoryAbi from '../contracts/Factory.json';
import routerAbi from '../contracts/router.json';



const activeNetwork = (payload) => {
  return {
    type:"NETWORK_CHANGE",
    payload:payload,
  };
};

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

export const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

export const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

// const updateAccountRequest = (payload) => {
//   return {
//     type: "UPDATE_ADDRESS",
//     payload: payload,
//   };
// };

const getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          //infuraId: process.env.REACT_APP_INFURA_ID
          rpc: {
            56: "https://bsc-dataseed.binance.org",
            97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
          }
        }
      }
    }

    return providerOptions;
}

export const connectWallet = () => {
    return async(dispatch) => {
        dispatch(connectRequest());
        try {
            const web3Modal = new Web3Modal({
                cacheProvider: true,
                providerOptions: getProviderOptions() // required
            });
    
            const provider = await web3Modal.connect();
            const factoryContractAddress = '0x0FA84a472FBe80DFb895535d07F2e5a3e18960dC';
            const routerContractAddress = '0x552Cdb224c75652D3E8cCFcCAD084eD7De806A10';
    
            await subscribeProvider(provider,dispatch);
            
            const web3 = new Web3(provider);
        
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];

            const balance = await web3.eth.getBalance(address);
        
            const factory = new web3.eth.Contract(
              factoryAbi,
              factoryContractAddress
            );

            const router = new web3.eth.Contract(
              routerAbi,
              routerContractAddress
            )
            const networkId =await web3.eth.net.getId();
            let path;
console.log(networkId)

// const chainId =await web3.eth.net.chainId();
// console.log(chainId)


            dispatch(
                connectSuccess({
                    address,
                    web3,
                    provider,
                    connected: true,
                    web3Modal,
                    factory,
                    router,
                    balance,
                    networkId,
                    path
                })
            );
            dispatch(activeNetwork({
              factory,
              router,
              networkId,
              balance,
              path
            }))
        } catch (e) {
            dispatch(connectFailed(e));
        }
    }
}

const subscribeProvider = async(provider,dispatch) => {

    if (!provider.on) {
      return;
    }

    provider.on('connect', async(id) => {
      console.log(id);
    });

    provider.on("networkChanged", async (networkId,balance,path) => {
     const {web3} = store.getState().WalletConnect;
     console.log(web3);
      console.log(networkId)
      if(networkId === '97') {
        const factoryContractAddress = '0x0FA84a472FBe80DFb895535d07F2e5a3e18960dC';
        const routerContractAddress = '0x552Cdb224c75652D3E8cCFcCAD084eD7De806A10';
        const factory = new web3.eth.Contract(
          factoryAbi,
          factoryContractAddress
        );

        path = '0xe66f1e5b77d1817366e9eb99ae419a0c3615baaf';
        const router = new web3.eth.Contract(
          routerAbi,
          routerContractAddress
        )

        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];

        const balance = await web3.eth.getBalance(address);
        dispatch(activeNetwork({
          factory,
          router,
          networkId,
          balance,
          accounts,
          address,
          path
        }))
      }
      else if (networkId === '4') {
        const routerContractAddress = '0x4719a688D6fBc59B24Aa40e352084BB55F2142a0';
const factoryContractAddress = '0x5D42d19e4B757daACe5EE81c365f71C90EBc44fe';
const factory = new web3.eth.Contract(
  factoryAbi,
  factoryContractAddress
);

path = '0x55CCC1093278400051a25c1E46E6BCED9fF6C1a1'
const router = new web3.eth.Contract(
  routerAbi,
  routerContractAddress
)

const accounts = await web3.eth.getAccounts();
const address = accounts[0];

const balance = await web3.eth.getBalance(address);

dispatch(activeNetwork({
  factory,
  router,
  networkId,
  balance,
  accounts,
  address,
  path
}))
      } else if(networkId === '80001') {
        const routerContractAddress = '0xd3034a6C2b5cEaCc74E24190ffEA3B0576Ba9dB6';
        const factoryContractAddress = '0xd09D20db1d433904866c948f7986117aa0F08BF8';
        const factory = new web3.eth.Contract(
          factoryAbi,
          factoryContractAddress
        );
        
        const router = new web3.eth.Contract(
          routerAbi,
          routerContractAddress
        )

        path = '0x43b0389f8c9305bc18586f0113c1aa9052c46296'
        
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];

        const balance = await web3.eth.getBalance(address);
        dispatch(activeNetwork({
          factory,
          router,
          networkId,
          balance,
          accounts,
          address,
          path
        }))
      } else if(networkId === '4002') {
        const routerContractAddress = '0xDEc31bc146376A2d501A37768d76eb8633aAFDf1';
        const factoryContractAddress = '0x8747CF6b6AD996dCe919edC76c7d18FaD31b778C';
        const factory = new web3.eth.Contract(
          factoryAbi,
          factoryContractAddress
        );
        
        const router = new web3.eth.Contract(
          routerAbi,
          routerContractAddress
        )

        path = '0x274F45dCDd137E889544226696BAC6D23974Be23'

        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];

        const balance = await web3.eth.getBalance(address);
        dispatch(activeNetwork({
          factory,
          router,
          networkId,
          balance,
          accounts,
          address,
          path
        }))
      } else {
        console.log(networkId)
      }
    });
}

export async function addNetwork(id) {
  let networkData;
  switch (id) {
    //bsctestnet
    case 97:
      networkData = [
        {
          chainId: "0x61",
          chainName: "BSCTESTNET",
          rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
          nativeCurrency: {
            name: "BINANCE COIN",
            symbol: "BNB",
            decimals: 18,
          },
          blockExplorerUrls: ["https://testnet.bscscan.com/"],
        },
      ];

      break;
    //bscmainet
    case 56:
      networkData = [
        {
          chainId: "0x38",
          chainName: "BSCMAINET",
          rpcUrls: ["https://bsc-dataseed1.binance.org"],
          nativeCurrency: {
            name: "BINANCE COIN",
            symbol: "BNB",
            decimals: 18,
          },
          blockExplorerUrls: ["https://testnet.bscscan.com/"],
        },
      ];
      break;
    default:
      break;
  }
  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: networkData,
  });
}

// (() => {
//   if(window.ethereum) {
//     window.ethereum.on('networkChanged', function(networkId){
//       if(networkId !== '97') {
//         console.log(networkId);
//         store.dispatch(connectFailed('Please switch to Binance mainnet'));
//       } else {
//         store.dispatch(connectWallet());
//       }
//     });
//   }
// })();



