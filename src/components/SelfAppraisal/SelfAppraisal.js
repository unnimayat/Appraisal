import React, { useState } from 'react';
import './SelfAppraisal.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
export default function SelfAppraisal() {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [date, setDate] = useState('');
  const [period,setPeriod]=useState('');
  const [review,setReview]=useState('');
  const [evaluation,setEvaluation]=useState('');


  const [tableData, setTableData] = useState([
    { subject: '', grade: '', internalScore: '', externalScore: '' },
  ]);

  // Function to add a new row
  const addRow = () => {
    setTableData([...tableData, { subject: '', grade: '', internalScore: '', externalScore: '' }]);
  };
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
            <h1 className='name' style={{marginRight:800,marginTop:30}}>Descriptive Assessment</h1>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '100px' }}>
                <img src={userImage} alt="Example" className='profileimage' />

                {/* Display the name and id */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 className='name'>Your Name</h3>
                    <p className='name' style={{ fontWeight: 300, fontSize: 16 ,marginTop:-15}}>12345</p>
                </div>
            </div>

          </div>
          <div className="break"></div>
          <div className="bottom">
             
              
            <div className="profile-page">
            <div>
      <h1 className='name' style={{ fontWeight: 300, fontSize: 16 ,marginTop:-15}}>Provide information in the following table, related to all responsibilities and tasks assigned to you during the period under review</h1>
      {/* <button onClick={addRow}>Add Row</button> */}
      {/* table */}
      <table>
        <thead>
          <tr>
            <th className='box'>Deliverables as per approved JD</th>
            <th className='boxbig'>Qualitative Assessment
                <th className='box'>Self Appraisal</th>
                <th className='box'>Evaluation</th>
                <th className='box'>Comments</th>
            </th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className='ibox'><input className='ibox' type="text" value={row.subject} /></td>
              <td className='ibox'>
                <div className="score-subdivision">
                  <input className='ibox' type="text" value={row.internalScore}   />
                  <input className='ibox' type="text" value={row.externalScore} />
                  <input className='ibox' type="text" value={row.externalScore} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
               

              <div className="profile-section">
                <button type="submit"  >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
       
    );
  }
  