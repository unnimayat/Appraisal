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
import ListEval from './components/Evaluation/ListEval';
import ListRev from './components/Reviewer/ListRev';
import GradingE from './components/Evaluation/GradingE';
import KnowledgeE from './components/Evaluation/KnowledgeE';
import ResponsibilityE from './components/Evaluation/ResponsibilityE';
import GradingR from './components/Reviewer/GradingR';
import ResponsibilityR from './components/Reviewer/ResponsibilityR';
import KnowledgeR from './components/Reviewer/KnowledgeR';
import HomeHr from './components/HR/HomeHr'
import AddQ from './components/HR/AddQ'
import SelfE from './components/Evaluation/SelfE'
import AddRoleQ from './components/HR/AddRoleQ';
import Summary_qgrading from './components/Summary/Summary_qgrading'
import Feedback from './components/Summary/feedback'
import Recommendation from './components/Summary/Recommendation'
import Acceptance from './components/Acceptance/Acceptance'
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
      <Route path="/evaluation/:uid" element={<Evaluation />} />
      <Route path="/gradingevaluation/:uid" element={<GradingE />} />
      <Route path="/knowledgeevaluation/:uid" element={<KnowledgeE />} />
      <Route path='/responsibilityevaluation/:uid' element={<ResponsibilityE/>}/>
      <Route path="/gradingreviewing/:uid" element={<GradingR />} />
      <Route path="/knowledgereviewing/:uid" element={<KnowledgeR/>} />
      <Route path='/responsibilityreviewing/:uid' element={<ResponsibilityR/>}/>
      <Route path="/reviewer/:uid" element={<Reviewer/>} />
      <Route path="/evaluationlist" element={<ListEval/>} />
      <Route path="/reviewinglist" element={<ListRev/>} />
      <Route path="/hr" element={<HomeHr/>} />
      <Route path="/selfevaluation/:uid" element={<SelfE/>} />
      <Route path="/addquestions" element={<AddQ/>} />
      <Route path="/addrolequestions" element={<AddRoleQ/>} />
      <Route path="/summary_qgrading/:uid" element={<Summary_qgrading/>} />
      <Route path="/feedback/:uid" element={<Feedback/>} />
      <Route path="/recommendation/:uid" element={<Recommendation/>} />
      <Route path="/acceptance/:uid" element={<Acceptance/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;

