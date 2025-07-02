import './App.css';
import Auth from './components/auth/Auth.jsx';
import Dash from './components/dash/Dash.jsx';
import WelcomeLog from './components/welcome/WelcomeLog.jsx';
import Log from './components/welcome/Log.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import { metricConfig } from './Metrics.js';


function App() {
  return (
    <>
      <Routes>
        {/* default route directs to auth */}
        <Route path='/' element={<Navigate to="/welcome" />} />
        <Route path='/welcome' element={<Auth />} />
        <Route path='/log' element={<WelcomeLog />} />
        <Route path='/dash' element={<Dash />} />
        {/* dynamic daily log routes */}
        {/* name is key, config is value */}
        {Object.entries(metricConfig).map(([name, config], index, arr) => {
          const path = `/log/${name}`;
          const nextPath = index + 1 < arr.length
            ? `/log/${arr[index + 1][0]}`
            : '/dash';
          return (
            <Route
              key={name}
              path={path}
              element={
                <Log
                  metric={name}
                  array={config.array}
                  prompt={config.prompt}
                  emoji={config.emoji}
                  destination={nextPath}
                />
              }
            />
          )
        })}
      </Routes>
    </>
  );
}

// export component as function to be available for import
export default App;
