// import React from 'react'

//   return (
//     <div>
//       <Login/>
//       {/* <Home /> */}
//       {/* <SelfAppraisal/> */}
//     </div>
//   );
// }

// export default App;

// App.js
import React from 'react'; 
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import Home from "./components/Home/Home"
import SelfAppraisal from './components/SelfAppraisal/SelfAppraisal';
import Grading from './components/Grading/Grading'
import Knowledge from './components/Grading/Knowledge'
import Responsibility from './components/Grading/Responsibility'
import Login from './components/Login/Login'
import Reviewer from './components/Reviewer/Reviewer';
import Evaluation from './components/Evaluation/Evaluation';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/home" element={<Home/>} />     
      <Route path="/selfappraisal" element={<SelfAppraisal/>} />
      <Route path="/grading" element={<Grading/>} />
      <Route path="/knowledge" element={<Knowledge/>} />
      <Route path="/responsibility" element={<Responsibility/>} />
      <Route path="/evaluation" element={<Evaluation/>} />
      <Route path="/reviewer" element={<Reviewer/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;

