import Auth from "./components/auth/Auth.jsx";
import Home from "./components/home/Home.jsx";
import { Routes, Route, Navigate } from "react-router-dom";


function App() {
  // return JSX to render
  return (
    <>
      {/* define routes for the app */}
      <Routes>
        {/* default route directs to auth page */}
        <Route path='/' element={<Navigate to="/auth" />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  );
}

// export component as function to be available for import
export default App;
