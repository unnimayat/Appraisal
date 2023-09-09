import React from 'react';
import './Home.css';
import userImage from '../../assets/user_circle.png'; // Import the image

export default function Home() {
    return (
      <div className="main-body">
        <div className="sidebar">
          {/* Sidebar content */}
            <div className="sidebar-item">
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
            <div>
              {/* Additional content */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  