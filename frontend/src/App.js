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
import { AuthProvider } from './config/AuthContext'; 
import ExoplanetDetail from './pages/exoplanet_detail/ExoplanetDetail';
import QuizDetails from './pages/exoquiz/QuizDetails';
import Profile from './pages/profile/Profile';
import ForumDetail from './pages/community/ForumDetail';
import ExoFlex from './pages/exoflex/ExoFlex';


function App() {
  const username= localStorage.getItem('username');
  const user_id= localStorage.getItem('user_id');

  
  return (
    <AuthProvider> 
      <div>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
          
          <Route path="exoquiz" element={<ExoQuiz />} />
          <Route path="/exoquiz/:quizId" element={<QuizDetails/>} />
          <Route path="community" element={<CommunityForum />} />
          <Route path="/forum/:forum_id" element={<ForumDetail />} />

          <Route path="exoshowdown" element={<ExoShowDown />} />
          <Route path="exoflex" element={<ExoFlex />} />

          <Route path="exploreexoplanets" element={<ExploreExoplanets />} />         
          <Route path="/exovision" element={<ExoVision />} />
          
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
