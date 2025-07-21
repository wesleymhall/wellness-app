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
        <div className='horizontal-flex'>
        <div className='vertical-flex'>
        <div className='component-container'>
            {isRegistering ? (
                <>
                    {/* if registering */}
                    <Register toggleRegister={toggleRegister} />
                    <button type='plaintext' onClick={toggleRegister}>already have an account</button>
                </>
            ) : (
                 <>
                    {/* if not registering */}
                    <Login onLogin={checkSession} />
                    <button type='plaintext' onClick={toggleRegister}>create an account</button>
                </>
            )}
        </div>
        </div>
        </div>
        </div>
    );
}

export default Auth;