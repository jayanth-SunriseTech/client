import { Button } from 'react-bootstrap';
import React from 'react';
import './FarmsTable.css';
import Select from 'react-select';

const options = [
    { value: 'Your Farms', label: 'Your Farms' },
    { value: 'Your Pools', label: 'Your Pools' },
  ];

function FarmsTable() {
  return (
    <div>
        <div className='row'>
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
                    <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        
      />
                        </div>
                    </div>
                </div>
            <div className='col-lg-1'></div>
            </div>
        <div className='row'>
        <div className='row'>
   <div className='col-lg-1'></div>
   <div className='col-lg-10 table-responsive'>
   <table className='stats_table'>
     <thead>
       <tr>
         <th>Collection</th>
         <th>Floor Price</th>
         <th>Volume(24)</th>
         <th>Volume %(24)</th>
         <th>Avg Price(24)</th>
         <th>Avg Price %(24)</th>
         <th>Floor %(24)</th>
       </tr>
     </thead>
     <tbody>
       <tr >
         <td><div className="row UserCollectionPageRow1">
   
        
         
         
          <div className="profileImage_container">
                  
      {/* <img className="stats-profile-image" src={NFT} alt="" /> */}
      <div className='stats-details'>
          <div>
          <span className='stats-details-name'>Lorem Ipsum</span>
          </div>
        
      </div>
      
                  </div>
          
      
    
         <div className="col-lg-10 UserCollectionPage_heading_container">
         
         </div>
       </div></td>
         <td>12.00</td>
         <td>505.20</td>
         <td>+70.62%</td>
         <td>20.21</td>
         <td>+50.14%</td>
         <td>+2.65%</td>
       </tr>
       <tr >
         <td><div className="row UserCollectionPageRow1">
   
        
         
         
          <div className="profileImage_container">
                  
      {/* <img className="stats-profile-image" src={NFT} alt="" /> */}
      <div className='stats-details'>
          <div>
          <span className='stats-details-name'>Lorem Ipsum</span>
          </div>
        
      </div>
      
                  </div>
          
      
    
         <div className="col-lg-10 UserCollectionPage_heading_container">
         
         </div>
       </div></td>
         <td>12.00</td>
         <td>505.20</td>
         <td>+70.62%</td>
         <td>20.21</td>
         <td>+50.14%</td>
         <td>+2.65%</td>
       </tr>
       <tr >
         <td><div className="row UserCollectionPageRow1">
   
        
         
         
          <div className="profileImage_container">
                  
      {/* <img className="stats-profile-image" src={NFT} alt="" /> */}
      <div className='stats-details'>
          <div>
          <span className='stats-details-name'>Lorem Ipsum</span>
          </div>
        
      </div>
      
                  </div>
          
      
    
         <div className="col-lg-10 UserCollectionPage_heading_container">
         
         </div>
       </div></td>
         <td>12.00</td>
         <td>505.20</td>
         <td>+70.62%</td>
         <td>20.21</td>
         <td>+50.14%</td>
         <td>+2.65%</td>
       </tr>
       <tr >
         <td><div className="row UserCollectionPageRow1">
   
        
         
         
          <div className="profileImage_container">
                  
      {/* <img className="stats-profile-image" src={NFT} alt="" /> */}
      <div className='stats-details'>
          <div>
          <span className='stats-details-name'>Lorem Ipsum</span>
          </div>
        
      </div>
      
                  </div>
          
      
    
         <div className="col-lg-10 UserCollectionPage_heading_container">
         
         </div>
       </div></td>
         <td>12.00</td>
         <td>505.20</td>
         <td>+70.62%</td>
         <td>20.21</td>
         <td>+50.14%</td>
         <td>+2.65%</td>
       </tr>
       <tr >
         <td><div className="row UserCollectionPageRow1">

          <div className="profileImage_container">
                  
      {/* <img className="stats-profile-image" src={NFT} alt="" /> */}
      <div className='stats-details'>
          <div>
          <span className='stats-details-name'>Lorem Ipsum</span>
          </div>
        
      </div>
      
                  </div>
        
         <div className="col-lg-10 UserCollectionPage_heading_container">
         </div>
       </div></td>
         <td>12.00</td>
         <td>505.20</td>
         <td>+70.62%</td>
         <td>20.21</td>
         <td>+50.14%</td>
         <td>+2.65%</td>
       </tr>
       
     </tbody>
   </table>
   </div>
   <div className='col-lg-1'></div>
  
 </div>
            </div>
    </div>
  )
}

export default FarmsTable