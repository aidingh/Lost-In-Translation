
import LoginPage from "./components/LoginPage";
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import TranslationPage from "./components/TranslationPage";
import ProfilePage from "./components/ProfilePage";

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

/*const eventHandler =  () => {
    console.log("event");
}*/

export default App;
