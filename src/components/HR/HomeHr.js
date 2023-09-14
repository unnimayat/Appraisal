import React, { useState ,useEffect} from 'react';
import './HomeHr.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// Retrieve the token from local storage
const token = localStorage.getItem('token');

export default function Home() {
  const[id,setId]=useState('');
//   const [name, setName] = useState('');
//   const [position, setPosition] = useState('');
//   const [date, setDate] = useState('');
//   const [period,setPeriod]=useState('');
//   const [anyotherposition, setAnyotherposition] = useState('');
//   const [anyotherdate,setAnyotherdate]=useState('');
//   const [anyother,setAnyother]=useState('');
//   const [review,setReview]=useState('');
//   const [evaluation,setEvaluation]=useState('');
//   const [save,setSave]=useState(false);
  const [role,setRole]=useState('');
  const [newid, setNewId] = useState('');
  const [newRole, setNewRole] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {  userId:newid ,
      password:password ,
      role:newRole};
      await axios.post('https://appbackend-rala.onrender.com/hr/add-user', newUser);
      setNewId('');
      setPassword('');
      setNewRole('');
      alert('User added to the database.');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
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
  
  
    return (
      <div className="main-body">
        <div className="sidebar">
          {/* Sidebar content */}
            <img src={logoImage} alt="Example" className='logoimage' />
            <div className="sidebar-item" style={{marginTop:50}}>
                <i className="material-icons"></i>
                <Link to="/hr"><span>Add Users</span></Link>
            </div>
            <div className="sidebar-item">
                <i className="material-icons"></i>
                <Link to="/addquestions"><span>Add Questions</span></Link>
            </div>
            <div className="sidebar-item">
                <i className="material-icons"></i>
                <span>Team</span>
            </div>
        </div>
        <div className="right">
          <div className="top">
            {/* Display the image */}
            <h1 className='name' style={{marginRight:800,marginTop:30}}>Add People</h1>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '100px' }}>
                <img src={userImage} alt="Example" className='profileimage' />

                {/* Display the name and id */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 className='name'>{id}</h3>
                    <p className='name' style={{ fontWeight: 300, fontSize: 16 ,marginTop:-15}}>{role}</p>
                </div>
            </div>

          </div>
          <div className="break"></div>
            <div className="bottom">
              <div className="profile-section">
                <form onSubmit={handleSubmit}>
                    <div className='row'>       
                        <input
                        type="text"
                        placeholder="Enter ID"
                        value={newid}
                        onChange={(e) => setNewId(e.target.value)}
                        required
                        />
                     
                        <input
                        type="text"
                        placeholder="Enter Role"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        required
                        />
                        <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />

                        <button type="submit">Add</button>
                    </div>
                   
                </form>   
              </div>
            </div>
        </div>
        </div>
    );
  }
  