import React, { useState, useEffect } from 'react';
import './SelfE.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
import axios from 'axios';
import { Params, useParams } from 'react-router-dom';

export default function SelfE() {
  const [name, setName] = useState('');
  const [role1, setRole1] = useState('');
  const [id, setId] = useState('');
  const [position, setPosition] = useState('');
  const [date, setDate] = useState('');
  const [period, setPeriod] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isEvaluator = role === 'evaluator';
  const isSelf = role === 'self';
  const [stage, setStage] = useState(0);
  const [responsibilitiesData, setResponsibilitiesData] = useState([
    { responsibility: '', self: '', evaluate: '', comments: '' },
  ]);
  const { uid } = useParams();


  useEffect(() => {
    // Retrieve the token, ID, and role from local storage
    const token = localStorage.getItem('token');
    const ID = localStorage.getItem('ID');
    const role = localStorage.getItem('role');

    // Set the default Authorization header for Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setId(ID);
    setRole1(role);
    axios.get(`https://appbackend-rala.onrender.com/finalsubmit/stagestatus/${uid}`)
      .then(response => {
        console.log(response.data);
        setStage(response.data.stage);
      })
  }, []);
  useEffect(() => {
    axios.get(`https://appbackend-rala.onrender.com/evaluator/responsibilities/${uid}`)
      .then(response => {
        console.log(response.data); // Check the response data in the console
        if (Array.isArray(response.data)) {
          setResponsibilitiesData(response.data.map(item => ({
            responsibility: item.text || '',
            self: item.selfAppraisal || '',
            evaluate: item.evaluation || '',
            comments: item.comments || '',
          })));
        }
        console.log(responsibilitiesData)
      })
      .catch(error => {
        console.log(error);
      });
  }, [uid])
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const data = {
        userId:uid,
        responses: responsibilitiesData
        // .map(({responsibility,evaluate})=>({text:responsibility,score:evaluate})), // Send the array of responsibilitiesData
      };
      console.log(data)
      await axios.post('https://appbackend-rala.onrender.com/evaluator/evaluate-responsibilities', data);

      alert('Data added to the database.');
      window.location.href = `/gradingevaluation/${uid}`;
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="main-body">
      <div className="sidebar">
        {/* Sidebar content */}
        <img src={logoImage} alt="Example" className="logoimage" style={{width:"7.5vw"}}/>
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
          <h1 className="name" style={{ marginRight: 800, marginTop: 30 }}>
            Descriptive Assessment
          </h1>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '100px' }}>
            <img src={userImage} alt="Example" className="profileimage" />

            {/* Display the name and id */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 className="name">{id}</h3>
              <p className="name" style={{ fontWeight: 300, fontSize: 16, marginTop: -15 }}>
                {role1}
              </p>
            </div>
          </div>
        </div>
        <div className="break"></div>
        <div className="bottom">
          <div className="profile-page">
            <div>
              <h1 className="name" style={{ fontWeight: 300, fontSize: 16, marginTop: -15 }}>
                Provide information in the following table, related to all responsibilities and tasks assigned to you during the period under review
              </h1>
              {/* table */}
              <table>
                <thead>
                  <tr>
                    <th className="box">Deliverables as per approved JD</th>
                    <table>
                      <tr style={{display:"flex",flexDirection:"column",backgroundColor:"none"}}>
                        <th style={{justifyItems:"center",width:"100%",border:"none",backgroundColor:"transparent"}}>
                        Qualitative Assessment
                        </th>
                      </tr>
                    <tr>
                       <th className="ibox" >Self Appraisal</th>
                      <th className="ibox">Evaluation</th>
                      <th className="ibox">Comments</th>
                    </tr>
                    
                    </table>
                  </tr>
                </thead>

                <tbody>
                  {responsibilitiesData.map((row, index) => (
                    <tr key={index}>
                      <td className="ibox">
                        <input
                          className="ibox"
                          type="text"
                          value={row.responsibility}
                          onChange={(e) => {
                            const updatedData = [...responsibilitiesData];
                            updatedData[index].responsibility = e.target.value;
                            setResponsibilitiesData(updatedData);
                          }}
                          placeholder="Enter question"
                          disabled={isEvaluator}
                        />
                      </td>
                      <td className="ibox">
                        <div className="score-subdivision">
                          <input
                            className="ibox"
                            type="text"
                            value={row.self}
                            disabled={true}
                            onChange={(e) => {
                              const updatedData = [...responsibilitiesData];
                              updatedData[index].self = e.target.value;
                              setResponsibilitiesData(updatedData);
                            }}
                          />
                          <input
                            className="ibox"
                            type="text"
                            value={row.evaluate}
                            onChange={(e) => {
                              const updatedData = [...responsibilitiesData];
                              updatedData[index].evaluate = e.target.value;
                              setResponsibilitiesData(updatedData);
                            }}
                            disabled={!(stage === 1)}
                          />
                          <input
                            className="ibox"
                            type="text"
                            value={row.comments}
                            onChange={(e) => {
                              const updatedData = [...responsibilitiesData];
                              updatedData[index].comments = e.target.value;
                              setResponsibilitiesData(updatedData);
                            }}
                            disabled={!(stage === 1)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {(stage === 1) && (<div className="profile-section">
                <button type="submit" onClick={handleSave}>
                  Save
                </button>
              </div>)}
              {
                (stage !== 1) && (<div className="profile-section"><button type="submit" onClick={() => { window.location.href = `/gradingevaluation/${uid}`; }}>Next</button></div>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
