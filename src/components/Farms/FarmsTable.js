import { Button } from 'react-bootstrap';
import React from 'react';
import './FarmsTable.css';
import eth from "../../Assets/eth.png"
import btIcon from '../../Assets/bt-logo.png';
import { Menu } from '@headlessui/react'



function FarmsTable() {
  return (
    <div className='farmsTable_page'>
        <div className='row farmsRow1'>
            <div className='col-lg-1'></div>
            <div className='col-lg-10'>
                <div className='row'>
                    <div className='col-lg-9'>
                        <div className='farmsSearchIcon'>
                    <i class="fas fa-magnifying-glass"></i>
                            </div>
                    <input
              className="farmsSearchbar"
              type="text"
              placeholder="search by a token or pair"
            />
                        </div>
                    <div className='col-lg-3'>
                       
                        </div>
                    </div>
                </div>
            <div className='col-lg-1'></div>
            </div>
       
        <div className='row farmsRow2'>
   <div className='col-lg-1'></div>
   <div className='col-lg-10 table-responsive'>
   <table className='stats_table'>
     <thead>
       <tr>
         <th>Pool</th>
         <th>TVL</th>
         <th>Rewards</th>
         <th>APR</th>
       </tr>
     </thead>
     <tbody>
       <tr >
         <td><div className="row UserCollectionPageRow1">
   
        
         
         
          <div className="profileImage_container">
                  
      <img className="stats-profile-image" src={eth} alt="" />
      <img className="stats-profile-image2" src={eth} alt="" />
      <div className='stats-details'>
          <div className='farm_details'>
          <span className='stats-details-name'>BT SWAP / ETH</span>
          <span className='stats-farm-name'>BT SWAP Farm</span>
          </div>
        
      </div>
      
                  </div>
          
      
    
         <div className="col-lg-10 UserCollectionPage_heading_container">
         
         </div>
       </div></td>
         <td>12.00</td>
         <td>
           <div className='container'>
<div className='row rewardsRow'>
  <span className='reward_value'>90</span>
  <img className='reward_img'  src={eth} alt="" />
  </div>
<div className='row rewardsRow'>
  <span className='reward_value'>200</span>
  <img className='reward_img'  src={btIcon} alt="" />
  </div>
           </div>
           </td>
         <td><p className='apr_value'>+70.62%</p><span className='annualized_tag'>Annualized</span></td>
         
       </tr>
       <tr >
         <td><div className="row UserCollectionPageRow1">
   
        
         
         
          <div className="profileImage_container">
                  
      <img className="stats-profile-image" src={eth} alt="" />
      <img className="stats-profile-image2" src={eth} alt="" />
      <div className='stats-details'>
          <div className='farm_details'>
          <span className='stats-details-name'>BT SWAP / ETH</span>
          <span className='stats-farm-name'>BT SWAP Farm</span>
          </div>
        
      </div>
      
                  </div>
          
      
    
         <div className="col-lg-10 UserCollectionPage_heading_container">
         
         </div>
       </div></td>
         <td>12.00</td>
         <td>
           <div className='container'>
<div className='row rewardsRow'>
  <span className='reward_value'>200</span>
  <img className='reward_img'  src={eth} alt="" />
  </div>
           </div>
           </td>
         <td><p className='apr_value'>+70.62%</p><span className='annualized_tag'>Annualized</span></td>
         
       </tr>
       <tr >
         <td><div className="row UserCollectionPageRow1">
   
        
         
         
          <div className="profileImage_container">
                  
      <img className="stats-profile-image" src={eth} alt="" />
      <img className="stats-profile-image2" src={eth} alt="" />
      <div className='stats-details'>
          <div className='farm_details'>
          <span className='stats-details-name'>BT SWAP / ETH</span>
          <span className='stats-farm-name'>BT SWAP Farm</span>
          </div>
        
      </div>
      
                  </div>
          
      
    
         <div className="col-lg-10 UserCollectionPage_heading_container">
         
         </div>
       </div></td>
         <td>12.00</td>
         <td>
           <div className='container'>
<div className='row rewardsRow'>
  <span className='reward_value'>200</span>
  <img className='reward_img'  src={eth} alt="" />
  </div>
           </div>
           </td>
         <td><p className='apr_value'>+70.62%</p><span className='annualized_tag'>Annualized</span></td>
         
       </tr>
       <tr >
         <td><div className="row UserCollectionPageRow1">
   
        
         
         
          <div className="profileImage_container">
                  
      <img className="stats-profile-image" src={eth} alt="" />
      <img className="stats-profile-image2" src={eth} alt="" />
      <div className='stats-details'>
          <div className='farm_details'>
          <span className='stats-details-name'>BT SWAP / ETH</span>
          <span className='stats-farm-name'>BT SWAP Farm</span>
          </div>
        
      </div>
      
                  </div>
          
      
    
         <div className="col-lg-10 UserCollectionPage_heading_container">
         
         </div>
       </div></td>
         <td>12.00</td>
         <td>
           <div className='container'>
<div className='row rewardsRow'>
  <span className='reward_value'>200</span>
  <img className='reward_img'  src={eth} alt="" />
  </div>
           </div>
           </td>
         <td><p className='apr_value'>+70.62%</p><span className='annualized_tag'>Annualized</span></td>
         
       </tr>
       <tr >
         <td><div className="row UserCollectionPageRow1">
   
        
         
         
          <div className="profileImage_container">
                  
      <img className="stats-profile-image" src={eth} alt="" />
      <img className="stats-profile-image2" src={eth} alt="" />
      <div className='stats-details'>
          <div className='farm_details'>
          <span className='stats-details-name'>BT SWAP / ETH</span>
          <span className='stats-farm-name'>BT SWAP Farm</span>
          </div>
        
      </div>
      
                  </div>
          
      
    
         <div className="col-lg-10 UserCollectionPage_heading_container">
         
         </div>
       </div></td>
         <td>12.00</td>
         <td>
           <div className='container'>
<div className='row rewardsRow'>
  <span className='reward_value'>200</span>
  <img className='reward_img'  src={eth} alt="" />
  </div>
           </div>
           </td>
         <td><p className='apr_value'>+70.62%</p><span className='annualized_tag'>Annualized</span></td>
         
       </tr>
       
       
     </tbody>
   </table>
   </div>
   <div className='col-lg-1'></div>
  
 </div>
            </div>

  )
}

export default FarmsTable