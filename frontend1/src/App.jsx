import "./App.css";

import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />{" "}
            {/* New route */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
