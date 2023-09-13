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
      <Route path="/evaluation/:id" element={<Evaluation />} />
      <Route path="/gradingevaluation" element={<GradingE />} />
      <Route path="/knowledgeevaluation" element={<KnowledgeE />} />
      <Route path='/responsibilityevaluation' element={<ResponsibilityE/>}/>
      <Route path="/reviewer" element={<Reviewer/>} />
      <Route path="/evaluationlist" element={<ListEval/>} />
      <Route path="/reviewinglist" element={<ListRev/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;

