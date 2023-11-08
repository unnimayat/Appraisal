import React, { useState ,useEffect} from 'react'; 
import { Link } from 'react-router-dom';

import './ListRev.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
import axios from 'axios';

// Retrieve the token from local storage
const token = localStorage.getItem('token');

export default function ListRev() {
  const[id,setId]=useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [profiles, setProfiles] = useState([]);
 
  
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
 

  useEffect(() => {
    // Make a GET request to your backend endpoint when the component mounts
    axios.get(`https://appbackend-rala.onrender.com/reviewer/profiles`)

      .then(response => {
        setProfiles(response.data);
        console.log(response.data); // Check the response data in the console
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

 

 const  handleSave=()=>{

  }
    return (
      <div className="main-body">
        <div className="sidebar">
          {/* Sidebar content */}
            <img src={logoImage} alt="Example" className='logoimage' style={{width:"7.5vw"}}/>
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
            <h1 className='name' style={{marginRight:800,marginTop:30}}>Reviewing List</h1>
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
             
              
             
              <div className="profile-section">
              <ul style={{display:"flex",flexDirection:"column"}}>
  {profiles.map(profile => (
    <li key={profile.userId}  className='list'>
      {/* <Link to={`/evaluation/${profile.userId}`}>{profile.Name}</Link> */}
      <Link to={`/reviewer/${profile.userId}`} className='link'>{profile.Name}</Link>
    </li> 
  ))}
</ul>

                {/* <button type="submit" className='save' onClick={handleSave} >
                  Save
                </button> */}
              </div>
             
          </div>
        </div>
      </div>
       
    );
  }
  