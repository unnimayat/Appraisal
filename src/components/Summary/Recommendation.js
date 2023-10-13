import React, { useState,useEffect } from 'react';
import './Recommendation.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Grading() {
  const [tableData, setTableData] = useState([
    { point: 'Suitability for continuing the services of the appraisee', recommendation: '' },
    { point: 'Suitability of the appraisee for higher responsibilities (if applicable)', recommendation: '' },
    { point: 'Suitability of the appraisee for higher pay', recommendation: '' },
  ]);
  
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission

  // Function to handle changes in the recommendation column
  const handleRecommendationChange = (index, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].recommendation = value;
    setTableData(updatedTableData);
  };
  const [id, setId] = useState('');
  const {uid}=useParams(); 
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
  // Function to handle form submission
  const handleSubmit = () => {
    // Prepare the data to send to the server
    const recommendationData = {
      appraiseeId: uid,
      continuingServices: tableData[0].recommendation,
      higherResponsibilities: tableData[1].recommendation,
      higherPay: tableData[2].recommendation,
    };
    console.log('Recommendation Data:', recommendationData);
    // Send a POST request to your server to save the recommendations
    axios
      .post('https://appbackend-rala.onrender.com/recommendations/submit-recommendation', recommendationData)
      .then((response) => {
        console.log('Recommendations Saved');
        // Navigate to the next page (if needed) 
        
    alert("data saved succesfully")
      })
      .catch((error) => {
        console.error('Error saving recommendations:', error);
      });
  };

  
  // const handlechange = () => {
  //   // Handle saving the data here (you can send a request to your API)
  //   // For example, you can send a POST request to your server to save the feedback.
  //   // You can also include strengthInput1 and strengthInput2 in the request body.
    
  //   console.log('');
    
  //   // Navigate to the recommendation page
  //   window.location.href = `/acceptance/${uid}`
  // };

  return (
    <div className="main-body">
      {/* ... (rest of your code) ... */}
      <div className="sidebar">
        {/* Sidebar content */}
        <img src={logoImage} alt="Example" className='logoimage' style={{width:"7.5vw"}}/>
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
          <h1 className='name' style={{ marginRight: 600, marginTop: 30 }}>Recommendation</h1>
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
                  <th style={{backgroundColor:"#212A3E"}}>Point to be considered</th>
                  <th style={{backgroundColor:"#212A3E"}}>Recommendation of the Performance Appraisal</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((rowData, index) => (
                  <tr key={index} >
                  <th className='sbox2'>
                    <td style={{backgroundColor:"#212A3E",width:"50vw",border:"Transparent"}}>{rowData.point}</td></th>
                    <td style={{backgroundColor:"#212A3E"}}>
                      <input className='sbox2'
                        type="text"
                        style={{backgroundColor:"#212A3E",width:"45vw",color:"white"}}
                        disabled={isReviewer}
                        value={rowData.recommendation}
                        onChange={(e) => handleRecommendationChange(index, e.target.value)}
                       
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              {/* Your other content */}
            </div>
      <div className="profile-section">
      <button type="button" onClick={handleSubmit} className="submit-button" style={{ width: '10vw'}} disabled={isReviewer}>
            Final Submit
          </button>
         
      </div>
    </div>
    </div>
    </div>
   
    </div>
  );
}