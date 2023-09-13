import React, { useState ,useEffect} from 'react';
import './Evaluation.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
import axios from 'axios'; 

import { Params,useParams } from 'react-router-dom';
// Retrieve the token from local storage
const token = localStorage.getItem('token');

export default function Evaluation( ) {
  const { match } = useParams();
  const[id,setId]=useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [date, setDate] = useState('');
  const [period,setPeriod]=useState('');
  const [anyotherposition, setAnyotherposition] = useState('No');
  const [anyotherdate,setAnyotherdate]=useState('');
  const [anyother,setAnyother]=useState('');
  const [review,setReview]=useState('');
  const [evaluation,setEvaluation]=useState('');
  const [save,setSave]=useState(false);
  const isEvaluator= position === 'evaluator'; 
  // const profileId = match.params.id;
  const params=useParams();
    console.log(params.id);
    useEffect(()=>{
      getDetails();
    })

    async function getDetails(){
      console.log("HAI");
    // let result = await fetch(`http://localhost:5000/content/${params.id}`);
    // console.log(result);
    // result=await result.json();
    // patients=result;
    // console.log("P",patients.name);
    // setPname(patients.name);
    // setPdoc(patients.consulting_doc);
    // setPdis(patients.desc);
    // setPmed(patients.medicine);
    
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
 
  const handleSave = async (e) => {
    e.preventDefault();

    if (
      name.trim() === '' ||
      position.trim() === '' ||
      period.trim() === '' ||
      date.trim() === '' ||
      review.trim() === '' ||
      evaluation.trim() === ''
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

      await axios.post('/self-appraise/basic-info', formData);

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
                    <h3 className='name'>{id}</h3>
                    <p className='name' style={{ fontWeight: 300, fontSize: 16 ,marginTop:-15}}>{position}</p>
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
                      disabled={isEvaluator}
                    />
              </div>

              <div className="profile-section">
                <label className='labels'>Position</label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  disabled={isEvaluator}
                />
              </div>

              <div className="profile-section">
                <label className='labels'>Period under review</label>
                <input
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  disabled={isEvaluator}
                />
              </div>

              <div className="profile-section">
                <label className='labels'>Date from which position occupied</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={isEvaluator}
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
              <div>
                <label htmlFor="anyotherposition">
                  Any other position occupied during the review period:
                </label>
                <select
                  id="anyotherposition"
                  name="anyotherposition"
                  value={anyother}
                  onChange={(e) => setAnyother(e.target.value)}
                  disabled={isEvaluator}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
      {/* Additional fields for "Yes" response */}

      {anyotherposition === 'Yes' && (
        <div>
        <div>
          <label htmlFor="otherPosition">What position:</label>
          <input
            type="text"
            id="otherPosition"
            name="otherPosition"
            value={anyotherposition}
            onChange={(e) => setAnyotherposition(e.target.value)}
            disabled={isEvaluator}
          />
        </div>

        <div>
          <label htmlFor="otherPositionPeriod">During what period:</label>
          <input
            type="text"
            id="otherPositionPeriod"
            name="otherPositionPeriod"
            value={anyotherdate}
            onChange={(e) => setAnyotherdate(e.target.value)}
            disabled={isEvaluator}
          />
        </div>
        </div>)}


              <div className="profile-section">
                <label className='labels'>Evalution Authority</label>
                <input
                type="text"
                  value={evaluation}
                  onChange={(e) => setEvaluation(e.target.value)}
                  disabled={isEvaluator}
                />
              </div>

              <div className="profile-section">
                <label className='labels'>Review Authority</label>
                <input
                type="text"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  disabled={isEvaluator}
                />
              </div>

              <div className="profile-section">
                <button type="submit" className='save' onClick={handleSave} >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
       
    );
  }
  