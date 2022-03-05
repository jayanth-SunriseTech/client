import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const getProviderOptions = () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        //infuraId: process.env.REACT_APP_INFURA_ID
        rpc: {
          56: "https://bsc-dataseed.binance.org",
          97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
      },
    },
  };

  return providerOptions;
};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions: getProviderOptions(), // required
});

const initialState = {
  loading: false,
  address: "",
  connected: false,
  web3: null,
  provider: null,
  token: null,
  errorMsg: null,
  reward: null,
  web3Modal,
  factory: null,
  router: null,
  balance: null,
};

export const WalletConnect = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        address: action.payload.address,
        token: action.payload.token,
        reward: action.payload.reward,
        web3: action.payload.web3,
        provider: action.payload.provider,
        connected: action.payload.connected,
        factory: action.payload.factory,
        router: action.payload.router,
        balance: action.payload.balance,
      };
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    case "UPDATE_ADDRESS":
      return {
        ...state,
        address: action.payload.address,
      };
    default:
      return state;
  }
};

const networkInitialStatus = {
  router: null,
  factory: null,
  networkId: null,
  balance: null,
  path: null,
  tokenAddress1:null,
  tokenAddress2:null,
};
export const activeNetwork = (state = networkInitialStatus, action) => {
  switch (action.type) {
    case "NETWORK_CHANGE":
      return {
        factory: action.payload.factory,
        router: action.payload.router,
        networkId: action.payload.networkId,
        balance: action.payload.balance,
        path: action.payload.path,
        tokenAddress1:action.payload.tokenAddress1,
  tokenAddress2:action.payload.tokenAddress2,
      };

      case"SEARCH_TOKEN":
      return {}
    default:
      return state
      ;
  }
};



export const pairAdd = (state = {address:[]} ,action ) => {
  switch(action.type) {
    case "PAIR" : 
    return {
      ...state,
      address:[...state.address,action.payload]
    }

    default:
      return state;
  }
}



