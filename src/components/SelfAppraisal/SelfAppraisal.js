import React, { useState ,useEffect} from 'react';
import './SelfAppraisal.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';

import axios from 'axios';
export default function SelfAppraisal() {
  const [name, setName] = useState('');
  const [role1, setRole1] = useState('');
  const [id, setId] = useState('');
  const [position, setPosition] = useState('');
  const [date, setDate] = useState('');
  const [period,setPeriod]=useState(''); 
  const [evaluation,setEvaluation]=useState('');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isEvaluator = role === 'evaluator';
  const isSelf=role=='self';
  const [responsibility, setResponsibility] = useState('');
  const [self, setSelf] = useState('');
  const [evaluate,setEvaluate]=useState('');
  const [comments,setComments]=useState('');

  useEffect(() => {
    // Retrieve the token, ID, and role from local storage
    const token = localStorage.getItem('token');
    const ID = localStorage.getItem('ID');
    const role = localStorage.getItem('role');

    // Set the default Authorization header for Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setId(ID);
    setRole1(role);
  }, []);
   
  const [tableData, setTableData] = useState([
    { subject: '', grade: '', internalScore: '', externalScore: '' },
  ]);

  const handleSave = async (e) => {
    e.preventDefault(); 
    try { 
      // const questions = {   text: responsibility,
      //   selfAppraisal:  self,
      
        
      const data = {
        responsibilities: [
          {
            text: responsibility,
            selfAppraisal: self,
              evaluation: null,
        comments: null,
          }, 
        ],
      };
            
      await axios.post('https://appbackend-rala.onrender.com/self/responsibility-fulfillment', data);
       
      alert('Data added to the database.');
      window.location.href = '/grading'; 
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

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
                    <h3 className='name'>{id}</h3>
                    <p className='name' style={{ fontWeight: 300, fontSize: 16 ,marginTop:-15}}>{role1}</p>
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
              <td className='ibox'><input className='ibox' type="text" value={responsibility} onChange={(e) => setResponsibility(e.target.value)}  placeholder="Enter question" disabled={isEvaluator} /></td>
              <td className='ibox'>
                <div className="score-subdivision">
                  <input className='ibox' type="text" value={self}  disabled={isEvaluator} onChange={(e) => setSelf(e.target.value)}    />
                  <input className='ibox' type="text" value={evaluate} onChange={(e) => setEvaluate(e.target.value)}    disabled={isSelf} />
                  <input className='ibox' type="text" value={comments} onChange={(e) => setComments(e.target.value)}    disabled={isSelf} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
               

              <div className="profile-section">
              <button type="submit" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
       
    );
  }
  