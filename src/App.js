import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignUp from './Authentication/Components/LoginSignUp/LoginSignUp.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import Main from './components/Main/Main.jsx';
import CreatPoster from './components/CreatPoster/CreatPoster.jsx';
import SubCategories from './components/Main/Components/SubCategories.jsx';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} /> 
          <Route path="/:id" element={<Main />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path='/create-poster' element={<CreatPoster />} />
          <Route path="/subCategories/:id" element={<SubCategories />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
