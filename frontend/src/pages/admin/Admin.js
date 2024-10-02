import React, { useState } from 'react';
import AdminExoQuiz from './AdminExoQuiz';
import AdminExoShowdown from './AdminExoShowdown';

const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState(''); // Manage which content to display

  const handleLogin = () => {
    const correctPassword = '1'; // Set your correct password here
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <h2>Admin Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <nav>
            <button onClick={() => handleTabClick('exoquiz')}>ExoQuiz</button>
            <button onClick={() => handleTabClick('exoshowdown')}>ExoShowdown</button>
            <button onClick={() => handleTabClick('forum')}>Forum</button>
          </nav>
          <div>
            {activeTab === 'exoquiz' && (
              <div>
                <h2>ExoQuiz</h2>
                <AdminExoQuiz/>
                {/* Add your ExoQuiz functionality here */}
              </div>
            )}
            {activeTab === 'exoshowdown' && (
              <div>
                <h2>ExoShowdown</h2>
                <AdminExoShowdown/>
                {/* Add your ExoShowdown functionality here */}
              </div>
            )}
            {activeTab === 'forum' && (
              <div>
                <h2>Forum</h2>
                <p>This is the Forum content.</p>
                {/* Add your Forum functionality here */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
