import React, { useState, useEffect } from 'react';
import './ResponsibilityE.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
import axios from 'axios';
export default function ResponsibilityE() {

  const [name, setName] = useState('');
  const [id, setId] = useState('');

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

  }, []);

  const [tableData, setTableData] = useState([
    { parameter: '', selfScore: '', evalScore: '', reviewScore: '' },
  ]);

  useEffect(() => {
    // Make a GET request to fetch questions and self-scores
    axios
      .post('http://localhost:3005/evaluator/get-responsibility-based', {
        apprId: "64fd8e3b9a14a681cba43ad3"
      }) // Replace with your API endpoint
      .then((response) => {
        const questions = response.data.responsibilityFulfillmentQuestions;
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
      userId: "64fd8e3b9a14a681cba43ad3",
      responses: tableData.map((row) => ({
        question: row.parameter,
        score: row.evalScore,
      })),
    };
    console.log(requestBody)
    // Make a POST request to your backend endpoint
    axios
      .post('http://localhost:3005/evaluator/evaluate-responsibility-fulfillment', requestBody)
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
  // Function to add a new row

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
              <h1 className='name' style={{ fontWeight: 400, fontSize: 16, marginTop: 15 }}>3.3 Responsibility Fulfilment parameters</h1>
              {/* <button onClick={addRow}>Add Row</button> */}
              {/* table */}
              <table>
                <thead>
                  <tr>
                    <th className='boxbig'>Quantitative Measure indicators approved in the JD</th>
                    <th className='boxbig'>Points Awarded
                      <th className='box'>Self</th>
                      <th className='box'>Evaluation</th>
                      <th className='box'>Review</th>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td className='ibox' style={{ width: "39vw" }}><input className='ibox' style={{ width: "39vw" }} type="text" value={row.parameter} /></td>
                      <td className='ibox'>
                        <div className="score-subdivision">
                          <input className='ibox' type="text" value={row.selfScore} disabled={isEvaluator} />
                          <input className='ibox' type="text" value={row.evalScore} onChange={(e) => handleEvalScoreChange(index, e)} />
                          <input className='ibox' type="text" value={row.reviewScore} disabled={isEvaluator} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>


                <tr>
                  <th className='box' style={{ width: 10 }}>Total</th>
                  <th className='tbox'>10</th>
                  <th className='tbox'>10</th>
                  <th className='tbox'>6</th>
                </tr>

              </table>
            </div>


            <div className="profile-section">
              <button type="submit" onClick={() => {
                handleSave(); // Call the handleSave function
              }}>
                Save
              </button>
              <button type="submit"   >
                Final Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
