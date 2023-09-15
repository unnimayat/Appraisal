import React, { useState, useEffect } from 'react';
import './GradingE.css'; 
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function GradingE() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [tableData, setTableData] = useState([
    { parameter: '', selfScore: '', evalScore: '', reviewScore: '' },
  ]);
  const [stage,setStage]=useState(0);
  const {uid}=useParams(); 
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isEvaluator = role === 'evaluator';
  useEffect(() => {
    // Retrieve the token, ID, and role from local storage
    const token = localStorage.getItem('token');
    const ID = localStorage.getItem('ID');
    const role = localStorage.getItem('role');

    // Set the default Authorization header for Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setId(ID);
    axios.get('https://appbackend-rala.onrender.com/finalsubmit/stage')
    .then(response=>{
      console.log(response.data);
        setStage(response.data.stage);
    })
  }, []);


  useEffect(() => {
    // Make a GET request to fetch questions and self-scores
    axios
      .post('https://appbackend-rala.onrender.com/evaluator/get-professional-integrity', {
        apprId:  uid
      }) // Replace with your API endpoint
      .then((response) => {
        const questions = response.data.professionalIntegrityQuestions;
        // Map the questions to table data
        const newTableData = questions.map((question) => ({
          parameter: question.questionText,
          selfScore: question.selfScore,
          evalScore: question.evaluatorScore !== null ? question.evaluatorScore : '',
          reviewScore: '',
        }));

        setTableData(newTableData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handleSave = () => {
    // Create the request body structure based on your requirements
    const requestBody = {
      userId: uid,
      responses: tableData.map((row) => ({
        text: row.parameter,
        score: row.evalScore,
      })),
    };
    console.log(requestBody)
    // Make a POST request to your backend endpoint
    axios
      .post('https://appbackend-rala.onrender.com/evaluator/evaluate-professional-integrity-parameter', requestBody)
      .then((response) => {
        // Handle the response as needed (e.g., show a success message)
        alert('Data saved successfully!');
      })
      .catch((error) => {
        // Handle any errors (e.g., display an error message)
        console.error('Failed to save data:', error);
      });
  };
  // Function to add a new row
  //   const addRow = () => {
  //     setTableData([...tableData, { subject: '', grade: '', internalScore: '', externalScore: '' }]);
  //   };

  const handleEvalScoreChange = (index, event) => {
    const { value } = event.target;
    console.log(value)
    // Create a copy of the tableData array
    const updatedTableData = [...tableData];
    // Update the evalScore for the specified row
    updatedTableData[index].evalScore = value;
    // Update the state with the new data
    setTableData(updatedTableData);
  };

  return (
    <div className="main-body">
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
          <h1 className='name' style={{ marginRight: 600, marginTop: 30 }}>3. Grading against performance parameters</h1>
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
            <table>
              <thead>
                <tr>
                  <th className='smallbox'>Nature of performance assessment</th>
                  <th className='smallbox'>Outstanding</th>
                  <th className='smallbox'>Excellent</th>
                  <th className='smallbox'>Good</th>
                  <th className='smallbox'>Average</th>
                  <th className='smallbox'>Poor</th>

                </tr>
                <tr>
                  <th className='smallbox'>Points to be awarded</th>
                  <th className='smallbox'>10</th>
                  <th className='smallbox'>8</th>
                  <th className='smallbox'>6</th>
                  <th className='smallbox'>4</th>
                  <th className='smallbox'>2</th>

                </tr>
              </thead>
            </table>
            <div>
              <h1 className='name' style={{ fontWeight: 400, fontSize: 16, marginTop: 15 }}>3.1 Professional Integrity and Team Contribution parameters</h1>
              {/* <button onClick={addRow}>Add Row</button> */}
              {/* table */}
              <table>
                <thead>
                  <tr>
                    <th className='box'>Parameter</th>
                    <table  >
                      <tr style={{display:"flex",flexDirection:"column",backgroundColor:"none"}}>
                        <th style={{justifyItems:"center",width:"100%",border:"none",backgroundColor:"transparent"}}>
                        Points Awarded
                        </th>
                      </tr>
                    <tr>
                       <th className="ibox" >Self</th>
                      <th className="ibox">Evaluation</th>
                      <th className="ibox">Review</th>
                    </tr>
                    
                    </table>
                  </tr>
                </thead>

                 
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td className='ibox' ><input className='ibox' type="text" value={row.parameter} /></td>
                      <td className='ibox'>
                        <div className="score-subdivision">
                          <input className='ibox' style={{ backgroundColor:"white"}} type="text" value={row.selfScore} disabled={isEvaluator || !(stage===1) } />
                          <input className='ibox' style={{ backgroundColor:"white"}}type="text" value={row.evalScore} disabled={!(stage===1)} onChange={(e) => handleEvalScoreChange(index, e)} />
                          <input className='ibox' style={{ backgroundColor:"white"}}type="text" value={row.reviewScore} disabled={isEvaluator || !(stage===1)} />
                        </div>
                      </td>
                    </tr>
                  ))} 


                {/* <tr>
                  <th className='box' style={{ width: 10 }}>Total</th>
                  <th className='tbox'>10</th>
                  <th className='tbox'>10</th>
                  <th className='tbox'>6</th>
                </tr> */}

              </table>
            </div>


            <div className="profile-section">
              <button
                type="submit"
                onClick={() => {
                  handleSave(); // Call the handleSave function
                  window.location.href = `/knowledgeevaluation/:${uid}`; // Redirect to the desired page
                }}
              >
                Save
              </button>


            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
