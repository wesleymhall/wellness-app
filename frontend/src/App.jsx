import './App.css';
import Auth from "./components/auth/Auth.jsx";
import Profile from "./components/profile/Profile.jsx";
import { Routes, Route, Navigate } from "react-router-dom";


function App() {
  // return JSX to render
  return (
    <>
      {/* define routes for the app */}
      <Routes>
        {/* default route directs to auth */}
        <Route path='/' element={<Navigate to="/auth" />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  );
}

// export component as function to be available for import
export default App;
