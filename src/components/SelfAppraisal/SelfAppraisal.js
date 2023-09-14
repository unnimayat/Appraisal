import React, { useState, useEffect } from 'react';
import './SelfAppraisal.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
import axios from 'axios';

export default function SelfAppraisal() {
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

  const [responsibilitiesData, setResponsibilitiesData] = useState([
    { responsibility: '', self: '', evaluate: '', comments: '' },
  ]);

  const addRow = () => {
    setResponsibilitiesData([
      ...responsibilitiesData,
      { responsibility: '', self: '', evaluate: '', comments: '' },
    ]);
  };

  useEffect(() => {
    // Retrieve the token, ID, and role from local storage
    const token = localStorage.getItem('token');
    const ID = localStorage.getItem('ID');
    const role = localStorage.getItem('role');

    // Set the default Authorization header for Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setId(ID);
    setRole1(role);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const data = {
        responsibilities: responsibilitiesData.map((row) => ({
          question: row.responsibility,
          score: row.self,
        }))
      };
      console.log(data)
      axios.post('http://localhost:3005/self/responsibility-fulfillment', data)
        .then((response) => {
          // Handle the response as needed (e.g., show a success message)
          alert('Data saved successfully!');
          window.location.href = '/grading';
        })
        .catch((error) => {
          // Handle any errors (e.g., display an error message)
          console.error('Failed to save data:', error);
        });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="main-body">
      <div className="sidebar">
        {/* Sidebar content */}
        <img src={logoImage} alt="Example" className="logoimage" />
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
                    <th className="boxbig">
                      Qualitative Assessment
                      <th className="box">Self Appraisal</th>
                      <th className="box">Evaluation</th>
                      <th className="box">Comments</th>
                    </th>
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
                          placeholder="responisbility"
                          disabled={isEvaluator}
                        />
                      </td>
                      <td className="ibox">
                        <div className="score-subdivision">
                          <input
                            className="ibox"
                            type="text"
                            value={row.self}
                            disabled={isEvaluator}
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
                            disabled={isSelf}
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
                            disabled={isSelf}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="submit" onClick={handleSave}>
                Save
              </button>
              <button onClick={addRow}>Add Row</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
