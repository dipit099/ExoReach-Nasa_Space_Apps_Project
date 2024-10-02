import React from 'react';
import './App.css';
import './fonts.css'; 
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import ExoVision from './pages/exovision/ExoVision';
import ExoQuiz from './pages/exoquiz/ExoQuiz';
import CommunityForum from './pages/community/CommunityForum';
import ExploreExoplanets from './pages/exploreexoplanets/ExploreExoplanets';
import ExoShowDown from './pages/exoshowdown/ExoShowDown';
import AdminPage from './pages/admin/Admin';
import AdminExoQuiz from './pages/admin/AdminExoQuiz';
import AdminExoShowdown from './pages/admin/AdminExoShowdown';
import AdminForum from './pages/admin/AdminForum';
import { AuthProvider } from './context/AuthContext'; 
import ExoplanetDetail from './pages/exoplanet_detail/ExoplanetDetail';
import QuizDetails from './pages/exoquiz/QuizDetails';

function App() {
  return (
    <AuthProvider> 
      <div>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/exovision" element={<ExoVision />} />
          
          <Route path="exoquiz" element={<ExoQuiz />} />
          <Route path="/exoquiz/:quizId" element={<QuizDetails/>} />

          <Route path="community" element={<CommunityForum />} />
          <Route path="exploreexoplanets" element={<ExploreExoplanets />} />
          <Route path="exoshowdown" element={<ExoShowDown />} />

          
          <Route path="exoquiz/admin" element={<AdminExoQuiz />} />
          <Route path="exoshowdown/admin" element={<AdminExoShowdown />} />
          <Route path="forum/admin" element={<AdminForum />} />
          <Route path="/exoplanet/:pl_name" element={<ExoplanetDetail />} /> 
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
