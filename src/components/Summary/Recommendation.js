import React, { useState,useEffect } from 'react';
import './Recommendations.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      appraiseeId: "64fd8e3b9a14a681cba43ad3",
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
        navigate('/Acceptance');
      })
      .catch((error) => {
        console.error('Error saving recommendations:', error);
      });
  };
  
  const handlechange = () => {
    // Handle saving the data here (you can send a request to your API)
    // For example, you can send a POST request to your server to save the feedback.
    // You can also include strengthInput1 and strengthInput2 in the request body.
    
    console.log('');
    
    // Navigate to the recommendation page
    navigate('/Acceptance');
  };

  return (
    <div className="main-body">
      {/* ... (rest of your code) ... */}
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
                  <th className='sbox2'>Point to be considered</th>
                  <th className='sbox2'>Recommendation of the Performance Appraisal</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((rowData, index) => (
                  <tr key={index} >
                  <th className='sbox2'>
                    <td>{rowData.point}</td></th>
                    <td>
                      <input className='sbox2'
                        type="text"
                        disabled={isReviewer}
                        value={rowData.recommendation}
                        onChange={(e) => handleRecommendationChange(index, e.target.value)}
                        placeholder={
          index === 0 ? 'Recommendation of the reviewing authority to be recorded here' :
          index === 1 ? 'Recommendation of the reviewing authority  (if appraisee is being considered for a higher role)' :
          'Recommendation of the reviewing authority  (if provision is available for increment/increased pay)'
        }
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
            Submit
          </button>
          <button type="button" onClick={handlechange} className="next-button"  style={{ width: '10vw' }}>
            Next
          </button>
      </div>
    </div>
    </div>
    </div>
   
    </div>
  );
}
