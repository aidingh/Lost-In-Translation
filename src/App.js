//import logo from './logo.svg';
//import './App.css';
import LoginPage from "./components/LoginPage";
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
//import {BrowserRouter, Routes, Route} from "react-router-dom";
//import { Routes, Route } from "react-router-dom"
import TranslationPage from "./components/TranslationPage";

function App() {
  return (
    
    
    <div className="App">
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="translation" element={<TranslationPage />} />

    </Routes>
  </Router>



    </div>

    
  );
}

/*const eventHandler =  () => {
    console.log("event");
}*/

export default App;
