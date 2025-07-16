import apiClient from '../../apiClient.js';
import Login from './Login.jsx';
import Register from './Register.jsx';
import { metricConfig } from '../../Metrics.js';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


function Auth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    // check session to see if user is logged in
    const checkSession = async () => {
        try {
            const response = await apiClient.get('/auth/session')
            setIsLoggedIn(response.data.isLoggedIn);
        } catch (error) {
            console.error('error checking session:', error);
        }
    }

    // run checkSession on component mounts
    useEffect(() => {
        checkSession();
    }, []);

    const toggleRegister = () => {
        setIsRegistering(!isRegistering);
    };

    // if logged in, navigate to destination
    if (isLoggedIn) {
        return <Navigate to={`/log/${Object.keys(metricConfig)[0]}`} />;
    };

    return (
        <div className='centered'>
        <div className='component-container'>
        <div className='horizontal-flex'>
        <div className='vertical-flex'>
            {isRegistering ? (
                <>
                    {/* if registering */}
                    <Register toggleRegister={toggleRegister} />
                    <p>
                        <button onClick={toggleRegister}>login?</button>
                    </p>
                </>
            ) : (
                 <>
                    {/* if not registering */}
                    <Login onLogin={checkSession} />
                    <p>
                        <button onClick={toggleRegister}>register?</button>
                    </p>
                </>
            )}
        </div>
        </div>
        </div>
        </div>
    );
}

export default Auth;