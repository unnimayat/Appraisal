import React, { useState, useEffect } from 'react';
import './Responsibility.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
import axios from 'axios'
import { useParams } from 'react-router-dom';

export default function Responsibility() {
  const [name, setName] = useState('');
  const [role1, setRole1] = useState('');
  const [id, setId] = useState('');
  const [position, setPosition] = useState('');
  const [date, setDate] = useState('');
  const [period, setPeriod] = useState('');
  const [review, setReview] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isEvaluator = role === 'evaluator';
  const isSelf = role == 'self';
  const isReviewer = role == 'reviewer';
  const [selfScore, setSelfScore] = useState('');
  const [evaluateScore, setEvaluateScore] = useState('');
  const [reviewScore, setReviewScore] = useState('');
  const [tableData, setTableData] = useState([
    { parameter: '', selfScore: '' },
  ]);
  const { uid } = useParams();
  const [stage, setStage] = useState(0);
  useEffect(() => {
    // Retrieve the token, ID, and role from local storage
    const token = localStorage.getItem('token');
    const ID = localStorage.getItem('ID');
    const role = localStorage.getItem('role');

    // Set the default Authorization header for Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setId(ID);
    setRole1(role);
    axios.get('https://appbackend-rala.onrender.com/finalsubmit/stage')
      .then(response => {
        console.log(response.data);
        setStage(response.data.stage);
      })
    fetchResponsibilityQuestions(ID);
  }, []);

  const fetchResponsibilityQuestions = async () => {
    try {
      // Send a GET request to the /get-position-based-questions API endpoint
      const response = await axios.get(`https://appbackend-rala.onrender.com/self/responsibilities`);

      // Extract questions from the response data
      const questions = response.data;
      console.log(questions);
      const newTableData = questions.map((question) => ({
        parameter: question.text,
        selfScore: '', // You can initialize this as needed
      }));
      // Set the newTableData in the state
      setTableData(newTableData);
    } catch (error) {
      console.error('Error fetching responsibility questions:', error);
    }
  };

  const handleEvalScoreChange = (index, event) => {
    const { value } = event.target;
    console.log(value)
    // Create a copy of the tableData array
    console.log(tableData)
    const updatedTableData = [...tableData];
    // Update the evalScore for the specified row
    updatedTableData[index].selfScore = value;
    // Update the state with the new data
    setTableData(updatedTableData);
  };

  const handleSave = async () => {
    try {
      // const questions = {   text: responsibility,
      //   selfAppraisal:  self,
      console.log(tableData);
      const data = {
        responses: tableData.map((row) => ({
          question: row.parameter,
          score: row.selfScore,
        }))
      };
      console.log(data)
      // Send a POST request to the /evaluate-responsibility-fulfillment API endpoint
      await axios.post('https://appbackend-rala.onrender.com/self/evaluate-responsibility-fulfillment', data)
        .then((response) => {
          alert('Data added to the database.');
          //window.location.href = '/';
        })
        .catch((error) => {
          // Handle any errors (e.g., display an error message)
          console.error('Failed to save data:', error);
        });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleFinalSave = async () => {
    try {
      // const questions = {   text: responsibility,
      //   selfAppraisal:  self,
      console.log(tableData);
      // const data = {
      //   responses: tableData.map((row) => ({
      //     text: row.parameter,
      //     score: row.selfScore,
      //   }))
      // };
      // Send a POST request to the /evaluate-responsibility-fulfillment API endpoint
      await axios.put('https://appbackend-rala.onrender.com/finalsubmit/self-evaluation-completed')
        .then((response) => {
          alert('Data finally saved to the database.');
          window.location.href = '/home';
        })
        .catch((error) => {
          // Handle any errors (e.g., display an error message)
          console.error('Failed to save data:', error);
        });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const [scoreData, setscoreData] = useState({ qntext: '', selfscore: '', evalscore: '', reviewscore: '' });
  useEffect(() => {
    fetchscores();
  }, [stage])
  const fetchscores = async () => {
    try {
      const response = await axios.get(
        'https://appbackend-rala.onrender.com/self/responsibility-scores'
      );
      // Extract the questions array from the response data
      const questions = response.data;
      console.log(questions)
      // Map the questions to tableData
      const newTableData = questions.map((question) => ({
        qntext: question.questionText,
        selfscore: question.selfScore,
        evalscore: question.evaluatorScore,
        reviewscore: question.reviewerScore,
      }));
      console.log(newTableData)
      // Set the newTableData in the state
      setscoreData(newTableData);
    } catch (error) {
      console.error('Error fetching predefined questions:', error);
    }
  }
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
          <h1 className='name' style={{ marginRight: 600, marginTop: 30 }}>3. Grading against performance parameters</h1>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '100px' }}>
            <img src={userImage} alt="Example" className='profileimage' />

            {/* Display the name and id */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 className='name'>{id}</h3>
              <p className='name' style={{ fontWeight: 300, fontSize: 16, marginTop: -15 }}>{role1}</p>
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
              <h1 className='name' style={{ fontWeight: 400, fontSize: 16, marginTop: 15 }}>3.3 Responsibility Fulfilment parameters</h1>
              {/* <button onClick={addRow}>Add Row</button> */}
              {/* table */}
              <table>
                <thead>
                  <tr>
                    <th className='box'>Quantitative Measure indicators approved in the JD</th>
                    <table  >
                      <tr style={{ display: "flex", flexDirection: "column", backgroundColor: "none" }}>
                        <th style={{ justifyItems: "center", width: "100%", border: "none", backgroundColor: "transparent" }}>
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




                {(stage === 0) && (<tbody>
                  {tableData.length > 0 ? (tableData.map((row, index) => (
                    <tr key={index}>
                      <td className='ibox'  ><input className='ibox' type="text" value={row.parameter} disabled={isEvaluator || isReviewer || isSelf} /></td>
                      <td className='ibox'>
                        <div className="score-subdivision">
                          <input className='ibox' style={{ backgroundColor: "white" }} type="text" value={row.selfScore} disabled={isEvaluator || isReviewer || !(stage === 0)} onChange={(e) => handleEvalScoreChange(index, e)} />
                          <input className='ibox' style={{ backgroundColor: "white" }} type="text" value={evaluateScore} disabled={isReviewer || isSelf} />
                          <input className='ibox' style={{ backgroundColor: "white" }} type="text" value={reviewScore} disabled={isEvaluator || isSelf} />
                        </div>
                      </td>
                    </tr>
                  ))) : (
                    <p>Loading predefined questions...</p>
                  )}
                </tbody>)}
                {
                  (stage !== 0) && (<tbody>
                    {scoreData.length > 0 ? (scoreData.map((row, index) => (
                      <tr key={index}>
                        <td className='ibox' ><input className='ibox' type="text" value={row.qntext} disabled={isEvaluator || isReviewer || isSelf} /></td>
                        <td className='ibox'>
                          <div className="score-subdivision">
                            <input className='ibox' style={{ backgroundColor: "white" }} type="text" value={row.selfscore} disabled={isEvaluator || isReviewer || !(stage === 0)} onChange={(e) => handleEvalScoreChange(index, e)} />
                            <input className='ibox' style={{ backgroundColor: "white" }} type="text" value={row.evalscore} disabled={isReviewer || isSelf} />
                            <input className='ibox' style={{ backgroundColor: "white" }} type="text" value={row.reviewscore} disabled={isEvaluator || isSelf} />
                          </div>
                        </td>
                      </tr>
                    ))) : (
                      <p>Loading ...</p>
                    )}
                  </tbody>)
                }

                {/* <tr>
                  <th className='box' style={{ width: 10 }}>Total</th>
                  <th className='tbox'>10</th>
                  <th className='tbox'>10</th>
                  <th className='tbox'>6</th>
                </tr> */}

              </table>
            </div>


            <div className="profile-section" style={{ display: "flex", flexDirection: "row" }}>

              {(stage === 0) && (<div className="profile-section">
                <button type="submit" onClick={() => {
                  handleSave(); // Call the handleSave function
                  // Redirect to the desired page
                }}
                  style={{ width: "15vw" }}>
                  Save
                </button>
                <button type="submit" onClick={() => {
                  handleFinalSave(); // Call the handleSave function
                  // Redirect to the desired page
                }}
                  style={{ width: "15vw" }}>
                  Final Save
                </button>
              </div>)}
              {
                (stage !== 0) && (<div className="profile-section"><button style={{ width: "15vw" }} type="submit" onClick={() => { window.location.href = '/responsibility'; }}>End</button></div>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
