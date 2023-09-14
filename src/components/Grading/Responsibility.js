import React, { useState ,useEffect} from 'react';
import './Responsibility.css';
import userImage from '../../assets/user_circle.png'; // Import the image
import logoImage from '../../assets/shg.png';
import axios from 'axios'
export default function Responsibility() {
  const [name, setName] = useState('');
  const [role1, setRole1] = useState('');
  const [id, setId] = useState('');
  const [position, setPosition] = useState('');
  const [date, setDate] = useState('');
  const [period,setPeriod]=useState('');
  const [review,setReview]=useState('');
  const [evaluation,setEvaluation]=useState('');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isEvaluator = role === 'evaluator';
  const isSelf=role=='self';
  const isReviewer=role=='reviewer';
  const [selfScore,setSelfScore]=useState('');
  const [evaluateScore,setEvaluateScore]=useState('');
  const [reviewScore,setReviewScore]=useState('');
  const [knowledgeQuestions, setKnowledgeQuestions] = useState([]);
  useEffect(() => {
    // Retrieve the token, ID, and role from local storage
    const token = localStorage.getItem('token');
    const ID = localStorage.getItem('ID');
    const role = localStorage.getItem('role');

    // Set the default Authorization header for Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setId(ID);
    setRole1(role);
    fetchKnowledgeQuestions(ID);
  }, []);
  const fetchKnowledgeQuestions = async (userId) => {
    try {
      // Send a GET request to the /get-position-based-questions API endpoint
      const response = await axios.get('https://appbackend-rala.onrender.com/self/get-position-based-questions');

      // Extract questions from the response data
      const { questions } = response.data;

      // Update the state with the fetched questions
      setKnowledgeQuestions(questions);
    } catch (error) {
      console.error('Error fetching knowledge questions:', error);
    }
  };

  const handleSave = async () => {
    try {
      // Create an array of responses for evaluation
      const responses = tableData.map((row) => ({
        question: row.subject, // Assuming the subject field is your question text
        score: selfScore, // Use the selfScore state for self evaluation
      }));

      // Send a POST request to the /evaluate-responsibility-fulfillment API endpoint
      await axios.post('https://appbackend-rala.onrender.com/self/evaluate-responsibility-fulfillment', { responses });

      alert('Responsibility Fulfillment evaluation data saved successfully.');
      // Redirect to the desired page
      window.location.href = '/';  
    } catch (error) {
      console.error('Error saving Responsibility Fulfillment evaluation data:', error);
    }
  };
  const [tableData, setTableData] = useState([
    { subject: '', grade: '', internalScore: '', externalScore: '' },
  ]);

  // Function to add a new row
  const addRow = () => {
    setTableData([...tableData, { subject: '', grade: '', internalScore: '', externalScore: '' }]);
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
            <h1 className='name' style={{marginRight:600,marginTop:30}}>3. Grading against performance parameters</h1>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '100px' }}>
                <img src={userImage} alt="Example" className='profileimage' />

                {/* Display the name and id */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 className='name'>{id}</h3>
                    <p className='name' style={{ fontWeight: 300, fontSize: 16 ,marginTop:-15}}>{role1}</p>
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
      <h1 className='name' style={{ fontWeight: 400, fontSize: 16 ,marginTop:15}}>3.3 Responsibility Fulfilment parameters</h1>
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
              <td className='ibox' style={{ width: "39vw"}}><input className='ibox' style={{ width: "39vw"}} type="text" value={row.subject}disabled={isEvaluator || isReviewer || isSelf}  /></td>
              <td className='ibox'>
                <div className="score-subdivision">
                <input className='box' type="text" value={selfScore}  disabled={isEvaluator || isReviewer  }  onChange={(e) => setSelfScore(e.target.value)}/>
                  <input className='box' type="text" value={evaluateScore} disabled={ isReviewer || isSelf}/>
                  <input className='box' type="text" value={reviewScore} disabled={isEvaluator  || isSelf}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

         
          <tr>
            <th className='box' style={{width:10}}>Total</th>
            <th className='tbox'>10</th>
            <th className='tbox'>10</th>
            <th className='tbox'>6</th> 
          </tr>
         
      </table>
    </div>
               

              <div className="profile-section">
                <button type="submit"  onClick={() => {
                  handleSave(); // Call the handleSave function
                  // Redirect to the desired page
                }}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
       
    );
  }
  