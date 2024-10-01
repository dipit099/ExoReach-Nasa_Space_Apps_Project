import React from 'react';
import './App.css';
import './fonts.css'; 
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import ExoVision from './pages/exovision/ExoVision';
import ExoQuiz from './pages/exoquiz/Exoquiz';
import CommunityForum from './pages/community/CommunityForum';
import ExploreExoplanets from './pages/exploreexoplanets/ExploreExoplanets';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exovision" element={<ExoVision />} />
        <Route path="exoquiz" element={<ExoQuiz />} />
        <Route path="community" element={<CommunityForum />} />
        <Route path="exploreexoplanets" element={<ExploreExoplanets />} />
      </Routes>
    </div>
  );
}


export default App;
