import React from 'react';
import './ButtonGroup.css';
import {Link, NavLink} from 'react-router-dom';

function ButtonGroup() {
    return (
        <div className="title__btns">
          <NavLink activeClassName='active-link' to='/trade' >
        Exchange
        </NavLink>
        <hr className="btn_border"></hr>
        <NavLink activeClassName='active-link' to='/liquidity' >
        Liquidity
        </NavLink>
        <hr className="btn_border"></hr>
      </div>
    )
}

export default ButtonGroup
