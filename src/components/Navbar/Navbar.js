import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, connectFailed } from "../../redux/WalletAction";
import BTNewLogo from '../../Assets/bt-new-logo.svg'
import ethIcon from '../../Assets/eth.png'
import './Navbar.css'
import { NavLink } from "react-router-dom";


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
        <nav className='navbar navbar-expand-lg navbar-light ' style={{background:'rgb(0 49 101 / 0%);'}}>
            <div className="container">
                <a className="navbar-brand" href="/"><img className="header__logo" src={BTNewLogo}/></a>
                { !wallet.connected &&  
                                <button className='navbar-toggler mr-auto ml-auto connect_btn_mobile' onClick={connect}>Connect Wallet</button> 
                            }
                        { wallet.connected && 
                            <button className='navbar-toggler mr-auto ml-auto btn btn-danger' onClick={disconnect} >Disconnect: {wallet.address.slice(0, 5) + '...' + wallet.address.slice(-5)}</button>
                        }
<ul class=" collapse navbar-collapse navbar-nav me-auto mb-2 mb-lg-0 nav_list_container" id="navbarTogglerDemo01">
                        
                        <li class="nav-item">
                        <NavLink activeClassName="active" className="nav-link"   to='/swap'>
                         Swap Or Exchange
                        </NavLink>
                        </li> 
                        <li class="nav-item">
                        <NavLink activeClassName="active" className="nav-link"    to='/add'>
                          Add Liquidity Pool
                        </NavLink>
                        </li>
                        <li class="nav-item">
                        <NavLink activeClassName="active" className="nav-link"    to='/farms'> 
                          Yield Farming
                        </NavLink>
                        </li>
                        <li class="nav-item">
                        <NavLink activeClassName="active" className="nav-link"    to='/invest'> Invest in Liquid Pool</NavLink>
                        </li>
                      </ul>

                      <div className=" row displayChain_container">
                          <div className="col-lg-4 col-md-4 col-sm-4">
                              <img className="chainIcon" src={ethIcon} alt='eth-icon'/>
                              </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 displayChain"><span>ETH</span></div>
                          <div className="col-lg-4 col-md-4 col-sm-4">
                          <i class="fas fa-caret-down chainDropdown_icon"></i>
                              </div>
                          </div>

                <div className="navbar navbar-collapse d-none d-md-block">
                    <div className="nav navbar-nav ms-auto ml-auto">
                        { !wallet.connected &&  
                                <button className='btn  pc_connect_btn' onClick={connect}>Connect Wallet</button> 
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