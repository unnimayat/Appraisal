import React, { useState, useEffect } from 'react';
import './Summary_qgrading.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Grading() {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [date, setDate] = useState('');
  const [period, setPeriod] = useState('');
  const [review, setReview] = useState('');
  const [evaluation, setEvaluation] = useState('');

  const [tableData, setTableData] = useState([
    { subject: '', grade: '', internalScore: '', externalScore: '' },
  ]);
  const [id, setId] = useState('');

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isReviewer = role !== 'reviewer';
  
  useEffect(() => {
    // Retrieve the token, ID, and role from local storage
    const token = localStorage.getItem('token');
    const ID = localStorage.getItem('ID');
    const role = localStorage.getItem('role');

    // Set the default Authorization header for Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setId(ID);
  }, []);

  // Function to add a new row
  const addRow = () => {
    setTableData([...tableData, { subject: '', grade: '', internalScore: '', externalScore: '' }]);
  };
  const handleSave = () => {
    // Handle saving the data here (you can send a request to your API)
    // For example, you can send a POST request to your server to save the feedback.
    // You can also include strengthInput1 and strengthInput2 in the request body.
    
    console.log('');
    
    // Navigate to the recommendation page
    navigate('/feedback');
  };
  const handlenavigate = () => {
    // Handle saving the data here (you can send a request to your API)
    // For example, you can send a POST request to your server to save the feedback.
    // You can also include strengthInput1 and strengthInput2 in the request body.
    
    console.log('');
    
    // Navigate to the recommendation page
    navigate('/feedback');
  };

  return (
    <div className="main-body">
      <div className="sidebar">
        {/* Sidebar content */}
        <img src={logoImage} alt="Example" className='logoimage' />
        <div className="sidebar-item" style={{ marginTop: 50 }}>
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
          <h1 className='name' style={{ marginRight: 600, marginTop: 30 }}>Summary of Quantitative grading</h1>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '100px' }}>
            <img src={userImage} alt="Example" className='profileimage' />

            {/* Display the name and id */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 className="name">{id}</h3>
              <p className="name" style={{ fontWeight: 300, fontSize: 16, marginTop: -15 }}>
                {role}
              </p>
            </div>
          </div>
        </div>
        <div className="break"></div>
        <div className="bottom">
          <div className="profile-page">
            {/* Insert the table here */}
            <table>
              <thead>
                <tr>
                  <th className='smallbox2'>Category</th>
                  <th className='smallbox2'>Maximum Score</th>
                  <th className='smallbox2'>Achieved Score
                  <th className='box1'>Self</th>
                  <th className='box2'>Evaluation</th>
                  <th className='box2'>Review</th></th>
                  
                  <th className='smallbox2'>Final score assigned</th>
                  <th className='smallbox1'>Comments, if any</th>
                </tr>
                <tr>
                  <th className='smallbox2'>Professional Integrity and Team Contribution parameters</th>
                  <th className='smallbox'>50</th>
                  <th className='smallbox2'>
                  <th className='box2'></th>
                  <th className='box2'></th>
                  <th className='box2'></th></th>
                  <th className='smallbox'></th>
                  <th className='smallbox'></th>
                  
                </tr>
                <tr>
                  <th className='smallbox2'>Knowledge parameters</th>
                  <th className='smallbox'>50</th>
                  <th className='smallbox2'>
                  <th className='box2'></th>
                  <th className='box2'></th>
                  <th className='box2'></th></th>
                  <th className='smallbox'></th>
                  <th className='smallbox'></th>
                  
                </tr>
                <tr>
                  <th className='smallbox2'>Responsibility Fulfilment parameters</th>
                  <th className='smallbox'>100</th>
                  <th className='smallbox2'>
                  <th className='box2'></th>
                  <th className='box2'></th>
                  <th className='box2'></th></th>
                  <th className='smallbox'></th>
                  <th className='smallbox'></th>
                  
                </tr>
              </thead>
              {/* Add table content here */}
              
            </table>
            
          
     
            
            <div>
              {/* Your other content */}
            </div>

            <div className="profile-section">
            <button
                type="submit"
                disabled={isReviewer}
                style={{ width: '10vw' }}
                onClick={handleSave}
              >
                Submit
              </button>
              <button
              style={{ width: '10vw' }}
                type="submit"
                onClick={handlenavigate}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
