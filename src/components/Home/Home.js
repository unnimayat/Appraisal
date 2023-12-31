import React, { useState, useEffect } from 'react';
import './Home.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
import axios from 'axios';

// Retrieve the token from local storage
const token = localStorage.getItem('token');

export default function Home() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [date, setDate] = useState('');
  const [period, setPeriod] = useState('');
  const [anyotherposition, setAnyotherposition] = useState('');
  const [anyotherdate, setAnyotherdate] = useState('');
  const [anyother, setAnyother] = useState('');
  const [review, setReview] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const [save, setSave] = useState(false);
  const [role, setRole] = useState('');
  const [formData, setformData] = useState([]);
  const [stage, setStage] = useState(0);
  useEffect(() => {
    // Retrieve the token, ID, and role from local storage
    const token = localStorage.getItem('token');
    const ID = localStorage.getItem('ID');
    const role = localStorage.getItem('role');

    // Set the default Authorization header for Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setId(ID);
    setRole(role);
  }, []);

  useEffect(() => {
    // Make a GET request to your backend endpoint when the component mounts
    console.log(id)
    axios.get('https://appbackend-rala.onrender.com/finalsubmit/stage')
      .then(response => {
        console.log(response.data);
        setStage(response.data.stage);
      })
    axios.get(`https://appbackend-rala.onrender.com/self/basic-info`)
      .then(response => {
        setformData(response.data)
        console.log(formData); // Check the response data in the console
        // Extract values from response.data and set them in state
        const { Name, position, periodUnderReview, dateOccupiedPosition, anyotherposition } = response.data;
        setName(Name || '');
        setPosition(position || '');
        setPeriod(periodUnderReview || '');
        setDate(dateOccupiedPosition || '');
        setAnyotherposition(anyotherposition || '');
      })
      .catch(error => {
        setformData([]);
        console.log(error);
      });
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (
      name.trim() === '' ||
      position.trim() === '' ||
      period.trim() === '' ||
      date.trim() === ''
      //  ||
      // review.trim() === '' ||
      // evaluation.trim() === ''
    ) {
      alert('All fields are mandatory. Please enter values.');
      return;
    }
    try {
      const formData = {
        Name: name,
        position: position,
        periodUnderReview: period,
        dateOccupiedPosition: date,
        anyotherposition: anyother,
        // Add other form fields here
      };

      await axios.post('https://appbackend-rala.onrender.com/self/self-appraise/basic-info', formData);

      alert('Data saved successfully!');

      setSave(true);
    } catch (error) {
      console.error(error);
      alert('Failed to save data. Please try again.');
    }
    window.location.href = '/selfappraisal';
  };


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
          <h1 className='name' style={{ marginRight: 800, marginTop: 30 }}>Basic information</h1>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '100px' }}>
            <img src={userImage} alt="Example" className='profileimage' />

            {/* Display the name and id */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 className='name'>{id}</h3>
              <p className='name' style={{ fontWeight: 300, fontSize: 16, marginTop: -15 }}>{role}</p>
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
                disabled={!(stage === 0)}
              />
            </div>

            <div className="profile-section">
              <label className='labels'>Position</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                disabled={!(stage === 0)}
              />
            </div>

            <div className="profile-section">
              <label className='labels'>Period under review</label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                disabled={!(stage === 0)}
              />
            </div>

            <div className="profile-section">
              <label className='labels'>Date from which position occupied</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={!(stage === 0)}
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
                Any other position occupied during the review period:
              </label>
              <select
                id="anyotherposition"
                name="anyotherposition"
                value={anyother}
                onChange={(e) => setAnyother(e.target.value)}
                disabled={!(stage === 0)}
              >
                <option value="No" disabled={!(stage === 0)}>No</option>
                <option value="Yes" disabled={!(stage === 0)}>Yes</option>
              </select>
            </div>
            {/* Additional fields for "Yes" response */}

            {anyother === 'Yes' && (
              <div>
                <div className="profile-section">
                  <label htmlFor="otherPosition" className='labels'>What position:</label>
                  <input
                    type="text"
                    id="otherPosition"
                    name="otherPosition"
                    value={anyotherposition}
                    onChange={(e) => setAnyotherposition(e.target.value)}
                    disabled={!(stage === 0)}
                  />
                </div>

                {/* <div className="profile-section">
          <label htmlFor="otherPositionPeriod" className='labels'>During what period:</label>
          <input
            type="text"
            id="otherPositionPeriod"
            name="otherPositionPeriod"
            value={anyotherdate}
            onChange={(e) => setAnyotherdate(e.target.value)}
          />
        </div> */}
              </div>)}


            {/* <div className="profile-section">
              <label className='labels'>Evalution Authority</label>
              <input
                type="text"
                value={evaluation}
                onChange={(e) => setEvaluation(e.target.value)}
                disabled={!(stage===0)}
              />
            </div>

            <div className="profile-section">
              <label className='labels'>Review Authority</label>
              <input
                type="text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                disabled={!(stage===0)}
              />
            </div> */}

            {(stage === 0) && (<div className="profile-section">
              <button type="submit" className='save' onClick={handleSave} >
                Save to Next
              </button>
            </div>)}
            {
              (stage !== 0) && (<div className="profile-section"><button type="submit" onClick={() => { window.location.href = '/selfappraisal'; }}>Next</button></div>)
            }
          </div>
        </div>
      </div>
    </div>

  );
}
