import React, { useState,useEffect } from 'react';
import './KnowledgeR.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function KnowledgeR() {
//   const [name, setName] = useState('');
//   const [position, setPosition] = useState('');
//   const [date, setDate] = useState('');
//   const [period,setPeriod]=useState('');
//   const [review,setReview]=useState('');
//   const [evaluation,setEvaluation]=useState('');
const [newname, setNewName] = useState('');
  const [id,setId]=useState('');
  const {uid}=useParams(); 
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isReviewer = role === 'reviewer';
  const [user,setUser]=useState('')
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

  const [stage, setStage] = useState(0);
  useEffect(() => {
    axios.get(`https://appbackend-rala.onrender.com/finalsubmit/stagestatus/${uid}`)
      .then(response => {
        console.log(response.data);
        setStage(response.data.stage);
      })
  }, [uid])

  // Function to add a new row
//   const addRow = () => {
//     setTableData([...tableData, { subject: '', grade: '', internalScore: '', externalScore: '' }]);
//   };

  useEffect(() => {
    const userId = uid; // Replace with the actual user ID you want to fetch
    const apiUrl = `https://appbackend-rala.onrender.com/getuname/${userId}`;
    
    axios.get(apiUrl)
      .then(response => {
        // Handle the successful response here
        console.log('hi');
        console.log('User Name:', response.data[0].Name);
        setNewName(response.data[0].Name)
        
        console.log('hii');
      })
      .catch(error => {
        // Handle errors here
        console.error('Error fetching user name:', error);
      });
    // Make a GET request to fetch questions and self-scores
    axios
      .post('https://appbackend-rala.onrender.com/reviewer/get-knowledge-based', {
        apprId:  uid
      }) // Replace with your API endpoint
      .then((response) => {
        const questions = response.data.knowledgeParameterQuestions;
        // Map the questions to table data
        const newTableData = questions.map((question) => ({
          parameter: question.questionText,
          selfScore: question.selfScore,
          evalScore: question.evaluatorScore,
          reviewScore: question.reviewerScore !== null ? question.reviewerScore : '',
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
      userId:  uid,
      responses: tableData.map((row) => ({
        question: row.parameter,
        score: row.reviewScore,
      })),
    };
    console.log(requestBody)
    // Make a POST request to your backend endpoint
    axios
      .post('https://appbackend-rala.onrender.com/reviewer/evaluate-knowledge-based', requestBody)
      .then((response) => {
        // Handle the response as needed (e.g., show a success message)
        alert('Data saved successfully!');
        window.location.href = `/responsibilityreviewing/${uid}`;
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
    updatedTableData[index].reviewScore = value;
    // Update the state with the new data
    setTableData(updatedTableData);
  };
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
            <button type="submit" className='save' style={{ marginRight: 400, marginTop: 30,width:150,height:40,padding:5 ,backgroundColor:"rgb(125, 140, 172)",color:"#212A3E"}}  >
          {newname}
          </button> 
            <h1 className='name' style={{marginRight:300,marginTop:30}}>3. Grading against performance parameters</h1>
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
      <h1 className='name' style={{ fontWeight: 400, fontSize: 16 ,marginTop:15}}>3.2 Knowledge Parameters</h1>
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

         
                  {(stage === 3) && (<tbody>
                    {tableData.map((row, index) => (
                      <tr key={index}>
                        <td className='ibox'  ><input className='ibox' type="text" value={row.parameter} /></td>
                        <td className='ibox'>
                          <div className="score-subdivision">
                            <input className='ibox' style={{ backgroundColor: "white" }} type="text" value={row.selfScore} disabled={isReviewer} />
                            <input className='ibox' style={{ backgroundColor: "white" }} type="text" value={row.evalScore} disabled={isReviewer} />
                            <input className='ibox' style={{ backgroundColor: "white" }} type="text" value={row.reviewScore} onChange={(e) => handleEvalScoreChange(index, e)} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>)}

                  {
                    (stage !== 3) && (<tbody>
                      {tableData.map((row, index) => (
                        <tr key={index}>
                          <td className='ibox'  ><input className='ibox' type="text" value={row.parameter} /></td>
                          <td className='ibox'>
                            <div className="score-subdivision">
                              <input className='ibox' style={{ backgroundColor: "white" }} type="text" value={row.selfScore} disabled={true} />
                              <input className='ibox' style={{ backgroundColor: "white" }} type="text" value={row.evalScore} disabled={true} />
                              <input className='ibox' style={{ backgroundColor: "white" }} type="text" value={row.reviewScore} onChange={(e) => handleEvalScoreChange(index, e)} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>)
                  }


         
          {/* <tr>
            <th className='box' style={{width:10}}>Total</th>
            <th className='tbox'>10</th>
            <th className='tbox'>10</th>
            <th className='tbox'>6</th> 
          </tr> */}
         
      </table>
    </div>
               
              
              {(stage === 3) && (<div className="profile-section">
                <button type="submit" onClick={() => {
                  handleSave(); // Call the handleSave function
                  // Redirect to the desired page
                }}>
                  Save
                </button>
              </div>)}
              {
                (stage !== 3) && (<div className="profile-section"><button type="submit" onClick={() => { window.location.href = `/responsibilityreviewing/${uid}`; }}>Next</button></div>)
              } 
            </div>
          </div>
        </div>
      </div>
       
    );
  }
  