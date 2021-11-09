import { Routes, Route } from "react-router-dom";
// Import Custom Components
import Home from './pages/Home';
import Auth from './pages/Auth';
// Import Style
import '../styles/App.scss';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
