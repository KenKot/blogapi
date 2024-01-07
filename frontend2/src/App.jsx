import React, { useState, useEffect } from "react";
import "./App.css";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import CreatePostForm from "./components/CreatePostForm";
import LoginForm from "./components/LoginForm"; // Make sure the path is correct
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <h1>Admin Page</h1>
          {isLoggedIn ? (
            <>
              <button onClick={() => setIsLoggedIn(false)}>Logout</button>
              <CreatePostForm /> {/* Include the form here */}
              <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/posts/:id" element={<PostDetail />} />
              </Routes>
            </>
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
