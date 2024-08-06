import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./page/LoginScreen";
import HomePage from "./page/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
