import React, { useState,useEffect } from 'react';
import './ResponsibilityR.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
import axios from 'axios';
export default function ResponsibilityR() {
   
  const [name, setName] = useState('');
  const [id,setId]=useState('');
  
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isReviewer = role === 'reviewer';
  useEffect(() => {
    // Retrieve the token, ID, and role from local storage
    const token = localStorage.getItem('token');
    const ID = localStorage.getItem('ID');
    const role = localStorage.getItem('role');

    // Set the default Authorization header for Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
     setId(ID);

  }, []);

  const [tableData, setTableData] = useState([
    { parameter: '', selfScore: '', evalScore: '', reviewScore: '' },
  ]);


  // Function to add a new row
  
    return (
      <div className="main-body">
        <div className="sidebar">
          {/* Sidebar content */}
            <img src={logoImage} alt="Example" className='logoimage' />
            <div className="sidebar-item" style={{marginTop:50}}>
                <i className="material-icons"></i>
                <span>Dashboard</span>
            </div>
            <div className="sidebar-item">
                <i className="material-icons"></i>
                <span>Self Appraisal</span>
            </div>
            <div className="sidebar-item">
                <i className="material-icons"></i>
                <span>Team</span>
            </div>
        </div>

        <div className="right">
          <div className="top">
            {/* Display the image */}
            <h1 className='name' style={{marginRight:600,marginTop:30}}>3. Grading against performance parameters</h1>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '100px' }}>
                <img src={userImage} alt="Example" className='profileimage' />

                {/* Display the name and id */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 className='name'>{id}</h3>
                    <p className='name' style={{ fontWeight: 300, fontSize: 16 ,marginTop:-15}}>{role}</p>
                </div>
            </div>

          </div>
          <div className="break"></div>
          <div className="bottom">
             
              
            <div className="profile-page">
            <table>
                <thead>
                <tr>
                    <th className='smallbox'>Nature of performance assessment</th>
                    <th className='smallbox'>Outstanding</th>
                    <th className='smallbox'>Excellent</th>
                    <th className='smallbox'>Good</th>
                    <th className='smallbox'>Average</th>
                    <th className='smallbox'>Poor</th>
                    
                </tr>
                <tr>
                    <th className='smallbox'>Points to be awarded</th>
                    <th className='smallbox'>10</th>
                    <th className='smallbox'>8</th>
                    <th className='smallbox'>6</th>
                    <th className='smallbox'>4</th>
                    <th className='smallbox'>2</th>
                    
                </tr>
                </thead>
            </table>
            <div>
      <h1 className='name' style={{ fontWeight: 400, fontSize: 16 ,marginTop:15}}>3.3 Responsibility Fulfilment parameters</h1>
      {/* <button onClick={addRow}>Add Row</button> */}
      {/* table */}
      <table>
        <thead>
          <tr>
            <th className='boxbig'>Quantitative Measure indicators approved in the JD</th>
            <th className='boxbig'>Points Awarded
                <th className='box'>Self</th>
                <th className='box'>Evaluation</th>
                <th className='box'>Review</th>
            </th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className='ibox' style={{ width: "39vw"}}><input className='ibox' style={{ width: "39vw"}} type="text" value={row.subject} /></td>
              <td className='ibox'>
                <div className="score-subdivision">
                  <input className='ibox' type="text" value={row.selfScore}   disabled={isReviewer} />
                  <input className='ibox' type="text" value={row.evalScore} disabled={isReviewer}/>
                  <input className='ibox' type="text" value={row.reviewScore}  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>

         
          <tr>
            <th className='box' style={{width:10}}>Total</th>
            <th className='tbox'>10</th>
            <th className='tbox'>10</th>
            <th className='tbox'>6</th> 
          </tr>
         
      </table>
    </div>
               

              <div className="profile-section">
                <button type="submit"   >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
       
    );
  }
  