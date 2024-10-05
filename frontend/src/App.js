import React from 'react';
import './App.css';
import './fonts.css'; 
import { Routes, Route } from 'react-router-dom'; // No need to import Navigate here
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
import ScrollToTop from './components/ScrollToTop';
import ExoShowGallery from './pages/exoshowdown/ExoShowGallery';
import RequireLogin from './components/RequireLogin'; // Import the new wrapper

function App() { 
  return (
    <AuthProvider> 
      <ScrollToTop />
      <div>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<Home />} />
          
          {/* Conditionally render routes based on user_id */}
          <Route path="/profile/:userId" element={<RequireLogin><Profile /></RequireLogin>} />
          <Route path="/exoquiz/:quizId" element={<RequireLogin><QuizDetails /></RequireLogin>} />
          <Route path="/forum/:forum_id" element={<RequireLogin><ForumDetail /></RequireLogin>} />
          <Route path="/exoshowGallery/:exoshowdown_id" element={<RequireLogin><ExoShowGallery /></RequireLogin>} />
          <Route path="/exovision" element={<RequireLogin><ExoVision /></RequireLogin>} />
          
          {/* Routes that require login */}
          <Route path="exoquiz" element={<RequireLogin><ExoQuiz /></RequireLogin>} />
          <Route path="community" element={<RequireLogin><CommunityForum /></RequireLogin>} />
          <Route path="exoshowdown" element={<RequireLogin><ExoShowDown /></RequireLogin>} />

          {/* Public routes */}
          <Route path="exoflex" element={<ExoFlex />} />
          <Route path="exploreexoplanets" element={<ExploreExoplanets />} />
          
          {/* Admin routes */}
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
