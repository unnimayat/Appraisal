import React, { useState } from 'react';
import './Home.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
import axios from 'axios';

// Retrieve the token from local storage
const token = localStorage.getItem('token');

// Set the default Authorization header for Axios
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default function Home() {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [date, setDate] = useState('');
  const [period,setPeriod]=useState('');
  const [review,setReview]=useState('');
  const [evaluation,setEvaluation]=useState('');

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
            <h1 className='name' style={{marginRight:800,marginTop:30}}>Basic information</h1>
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
               
              <div className="profile-section">
                    <label className='labels'>Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
              </div>

              <div className="profile-section">
                <label className='labels'>Position</label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>

              <div className="profile-section">
                <label className='labels'>Period under review</label>
                <input
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                />
              </div>

              <div className="profile-section">
                <label className='labels'>Date from which position occupied</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="profile-section">
                <label className='labels'>Any other position occupied during the review period: If so, what position and during what period</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>


              <div className="profile-section">
                <label className='labels'>Evalution Authority</label>
                <input
                type="text"
                  value={evaluation}
                  onChange={(e) => setEvaluation(e.target.value)}
                />
              </div>

              <div className="profile-section">
                <label className='labels'>Review Authority</label>
                <input
                type="text"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
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
  