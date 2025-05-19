import './App.css';
import Auth from './components/auth/Auth.jsx';
import Dash from './components/dash/Dash.jsx';
import WelcomeLog from './components/welcome/WelcomeLog.jsx';
import Log from './components/welcome/Log.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import {emotions, sleeps} from './Metrics.js';


function App() {
  return (
    <>
    <img src='/images/gif.gif' className='gif-container'/>
    {/* define routes for the app */}
    <div className='centered'>
    <div className='app-container'>
      <Routes>
        {/* default route directs to auth */}
        <Route path='/' element={<Navigate to="/welcome" />} />
        <Route path='/welcome' element={<Auth />} />
        <Route path='/log' element={<WelcomeLog />} />
        <Route path='/dash' element={<Dash />} />
        {/* daily log routes */}
        <Route path='/how do u feel' element={<Log 
          metric='emotion' 
          array={emotions} 
          prompt='how do u feel?'
          destination='/how much u sleep'
        />} />
        <Route path='/how much u sleep' element={<Log 
          metric='sleep'
          array={sleeps}
          prompt='how much u sleep?'
          destination='/dash'
        />} />
      </Routes>
    </div>
    </div>
    </>
  );
}

// export component as function to be available for import
export default App;
