import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, connectFailed } from "../redux/WalletAction";


const Navbar = () => {
    const dispatch = useDispatch();
    const wallet = useSelector((state) => state.WalletConnect);
    console.log(wallet);

    const connect = () => {
        console.log('connect');
        dispatch(connectWallet());
    }

    const network = useSelector((state)=>state.activeNetwork);
    console.log(network);

    const errorDiv = () => {
        return (
            <p>Wallet Disconnected!</p>
        )
    }
    const disconnect = () => {
        const { web3Modal } = wallet;
        web3Modal.clearCachedProvider();
        dispatch(connectFailed(errorDiv()));
    }
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className="container">
                <a className="navbar-brand" href="/">BT</a>
                <div className="navbar navbar-collapse d-none d-md-block">
                    <div className="nav navbar-nav ms-auto ml-auto">
                        { !wallet.connected &&  
                                <button className='btn btn-primary' onClick={connect}>Connect Wallet</button> 
                            }
                        { wallet.connected && 
                            <button className='btn btn-danger' onClick={disconnect}>Disconnect: {wallet.address.slice(0, 5) + '...' + wallet.address.slice(-5)}</button>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;