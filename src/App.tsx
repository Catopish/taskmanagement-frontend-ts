import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import PageNotFound from "./page/PageNotFound";
import { LoginCard } from "./components/LoginCard";
import { SignUpCard } from "./components/SignUpCard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}>
          // <Route path="login" element={<LoginCard />} />
          // <Route path="signup" element={<SignUpCard />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
