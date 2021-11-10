import { Routes, Route } from "react-router-dom";
// Import Custom Components
import HomeWelcome from './homeWelcome/HomeWelcome';
import Auth from './pages/Auth';
import RequiredAuth from "./requiredAuth/RequiredAuth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound"
// Import Style
import '../styles/App.scss';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeWelcome />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/logout" element={<Auth />} />
        <Route path="/home" element={<RequiredAuth><Home /></RequiredAuth>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
