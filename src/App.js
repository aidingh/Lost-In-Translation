import LoginPage from "./components/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TranslationPage from "./components/TranslationPage";
import ProfilePage from "./components/ProfilePage";

//Root object for the application. Contains route objects to be able to navigate the clients to the pages defined in the routes.
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="translation" element={<TranslationPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
