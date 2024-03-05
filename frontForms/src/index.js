
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import {
  BrowserRouter as Router,
  Routes, 
  Route,
} from 'react-router-dom';


import Pergunta from './pergunta';
import LoginPage from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router >
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/pergunta/:_id" element={<Pergunta />} />
    </Routes>
  </Router>
);


