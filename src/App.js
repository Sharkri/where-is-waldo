import "./css/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
