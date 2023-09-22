import React, { useState, useEffect } from 'react';
import './Summary_qgrading.css';
import logoImage from '../../assets/shg.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Grading() {
  const [tableData, setTableData] = useState({
    knowledgeParameters: { maxScore: '', selfScore: '', evaluatorScore: '', reviewerScore: '', finalScore: '', comments: '' },
    professionalIntegrity: { maxScore: '', selfScore: '', evaluatorScore: '', reviewerScore: '', finalScore: '', comments: '' },
    responsibilityFulfillment: { maxScore: '', selfScore: '', evaluatorScore: '', reviewerScore: '', finalScore: '', comments: '' },
  });

  useEffect(() => {
    // Retrieve the token and ID from local storage
    const token = localStorage.getItem('token');
    const ID = localStorage.getItem('ID');
    const role = localStorage.getItem('role');

    // Set the default Authorization header for Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Fetch recommendations data based on appraiseeId
    if (role=== 'reviewer') {
      axios
        .get(`https://appbackend-rala.onrender.com/summary/get-table-data/${"64fd8e3b9a14a681cba43ad3"}`)
        .then((response) => {
          const data = response.data;

          // Update the state with the fetched data for each category
          setTableData((prevTableData) => ({
            ...prevTableData,
            knowledgeParameters: data.knowledgeParameters,
            professionalIntegrity: data.professionalIntegrity,
            responsibilityFulfillment: data.responsibilityFulfillment,
          }));

          console.log('Fetched Data:', data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, []);
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Implement your submission logic here
    // You can send the data to your backend or perform any other necessary actions
    console.log('Submit button clicked');
    navigate("/feedback")
  };

  // Function to handle the "Next" button click
  

  // Function to handle input changes in the "comments" field
  const handleCommentsChange = (category, value) => {
    setTableData((prevTableData) => ({
      ...prevTableData,
      [category]: {
        ...prevTableData[category],
        comments: value,
      },
    }));
  };


  return (
    <div className="main-body">
      <div className="sidebar">
        {/* Sidebar content */}
        <img src={logoImage} alt="Example" className="logoimage" />
        {/* ... (rest of your sidebar) ... */}
      </div>

      <div className="right">
        <div className="top">
          {/* Display the image */}
          <h1 className="name" style={{ marginRight: 600, marginTop: 30 }}>
            Acceptance
          </h1>
          {/* ... (rest of your top section) ... */}
        </div>
        <div className="break"></div>
        <div className="bottom">
          <div className="profile-page">
            <table>
              <thead>
                <tr>
                  <th className="smallbox2">Category</th>
                  <th className="smallbox2">Maximum Score</th>
                  <th className="smallbox2">Self Score</th>
                  <th className="smallbox2">Evaluator Score</th>
                  <th className="smallbox2">Reviewer Score</th>
                  <th className="smallbox2">Final Score</th>
                  <th className="smallbox2">Comments</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(tableData).map((category) => (
                  <tr key={category}>
                    <td className="smallbox">{category}</td>
                    <td className="smallbox">{tableData[category].maxScore}</td>
                    <td className="smallbox">{tableData[category].selfScore}</td>
                    <td className="smallbox">{tableData[category].evaluatorScore}</td>
                    <td className="smallbox">{tableData[category].reviewerScore}</td>
                    <td className="smallbox">{tableData[category].finalScore}</td>
                    <td className="smallbox">
                <input
                  type="text"
                  value={tableData[category].comments}
                  onChange={(e) => handleCommentsChange(category, e.target.value)}
                />
              </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              {/* Your other content */}
            </div>

            <div className="profile-section">
            <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
