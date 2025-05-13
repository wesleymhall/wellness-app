import './App.css';
import Auth from "./components/auth/Auth.jsx";
import Dash from "./components/dash/Dash.jsx";
import Welcome from "./components/welcome/Welcome.jsx";
import MoodLog from "./components/welcome/MoodLog.jsx";
import SleepLog from "./components/welcome/SleepLog.jsx";
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
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/dash' element={<Dash />} />
        <Route path='/moodlog' element={<MoodLog />} />
        <Route path='/sleeplog' element={<SleepLog />} />
      </Routes>
    </>
  );
}

// export component as function to be available for import
export default App;
