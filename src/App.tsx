import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./page/LoginScreen";
import HomePage from "./page/HomePage";
import PageNotFound from "./page/PageNotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
