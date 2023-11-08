import React, { useState, useEffect } from 'react';
import './Reviewer.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
import axios from 'axios';

import { Params, useParams } from 'react-router-dom';
// Retrieve the token from local storage
const role = localStorage.getItem('role')
const token = localStorage.getItem('token');

export default function Reviewer() {
  const [id, setId] = useState('');
  const [apprid, setapprid] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  // const [date, setDate] = useState('');
  // const [period, setPeriod] = useState('');
  const [anyotherposition, setAnyotherposition] = useState('');
  // const [anyotherdate, setAnyotherdate] = useState('');
  // const [anyother, setAnyother] = useState('');
  const [formData, setformData] = useState([]);
  const [review, setReview] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const [save, setSave] = useState(false);
  const isReviewer = role === 'reviewer';
  // const profileId = match.params.id; 
  const { uid } = useParams();
  useEffect(() => {
    getDetails();
  })

  async function getDetails() {
    console.log("HAI");
  }

  useEffect(() => {
    // Retrieve the token, ID, and role from local storage
    const token = localStorage.getItem('token');
    const ID = localStorage.getItem('ID');
    const role = localStorage.getItem('role');

    // Set the default Authorization header for Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setId(ID);
    setPosition(role);

  }, []);

  const [stage, setStage] = useState(0);
  useEffect(() => {
    console.log(uid)
    axios.get(`https://appbackend-rala.onrender.com/finalsubmit/stagestatus/${uid}`)
      .then(response => {
        console.log(response.data);
        setStage(response.data.stage);
      })
  }, [uid])
  
  useEffect(() => {
    // Make a GET request to your backend endpoint when the component mounts
    axios.get(`https://appbackend-rala.onrender.com/self/appr-basic-info/${uid}`)
      .then(response => {
        setformData(response.data)
        console.log(formData); // Check the response data in the console
      })
      .catch(error => {
        setformData([]);
        console.log(error);
      });
  }, []);
  const handleNext = () => {
    window.location.href = `/gradingreviewing/${uid}`;
  }

  const isoDate = formData.dateOccupiedPosition;
const date = new Date(isoDate);
const formattedDate = date.toLocaleDateString(); // Format as "MM/DD/YYYY" or "DD/MM/YYYY" based on browser's locale
const formattedTime = date.toLocaleTimeString(); // Format as "HH:MM:SS AM/PM" based on browser's locale

console.log("Formatted Date: " + formattedDate);
console.log("Formatted Time: " + formattedTime);


  return (
    <div className="main-body">
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
           
          <button type="submit" className='save' style={{ marginRight: 400, marginTop: 30,width:150,height:40,padding:5 ,backgroundColor:"rgb(125, 140, 172)",color:"#212A3E"}}  >
          {formData.Name}
          </button> 
          <h1 className='name' style={{ marginRight: 300, marginTop: 30 }}>Basic information</h1>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '100px' }}>
            <img src={userImage} alt="Example" className='profileimage' />

            {/* Display the name and id */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 className='name'>{id}</h3>
              <p className='name' style={{ fontWeight: 300, fontSize: 16, marginTop: -15 }}>{position}</p>
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
                value={formData.Name}
                // onChange={(e) => setName(e.target.value)}
                disabled={isReviewer}
              />
            </div>

            <div className="profile-section">
              <label className='labels'>Position</label>
              <input
                type="text"
                value={formData.position}
                // onChange={(e) => setPosition(e.target.value)}
                disabled={isReviewer}
              />
            </div>

            <div className="profile-section">
              <label className='labels'>Period under review</label>
              <input
                type="text"
                value={formData.periodUnderReview}
                // onChange={(e) => setPeriod(e.target.value)}
                disabled={isReviewer}
              />
            </div>

            <div className="profile-section">
              <label className='labels'>Date from which position occupied</label>
              <input
                type="text"
                value={formattedDate}
                // onChange={(e) => setDate(e.target.value)}
                disabled={isReviewer}
              />
            </div>

            {/* <div className="profile-section">
                <label className='labels'>Any other position occupied during the review period: If so, what position and during what period</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div> */}
            <div className="profile-section">
              <label htmlFor="anyotherposition" className='labels'>
                Any other position occupied during the review period
              </label>
              <select
                id="anyotherposition"
                name="anyotherposition"
                value={formData.anyotherposition}
                // onChange={(e) => setAnyother(e.target.value)}
                disabled={isReviewer}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            {/* Additional fields for "Yes" response */}

            {anyotherposition === 'Yes' && (
              <div>
                <div>
                  <label htmlFor="otherPosition">What position</label>
                  <input
                    type="text"
                    id="otherPosition"
                    name="otherPosition"
                    value={formData.anyotherposition}
                    // onChange={(e) => setAnyotherposition(e.target.value)}
                    disabled={isReviewer}
                  />
                </div>

                {/* <div>
          <label htmlFor="otherPositionPeriod">During what period:</label>
          <input
            type="text"
            id="otherPositionPeriod"
            name="otherPositionPeriod"
            value={anyotherdate}
            onChange={(e) => setAnyotherdate(e.target.value)}
            disabled={isReviewer}
          />
        </div> */}
              </div>)}
 

            <div className="profile-section">
              <button type="submit" className='save' onClick={handleNext} >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
