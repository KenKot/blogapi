import "./App.css";

import PostList from "./components/PostList";

import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<PostList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
