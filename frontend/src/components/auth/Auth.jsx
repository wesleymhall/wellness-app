import apiClient from '../../apiClient.js';
import Login from './Login.jsx';
import Register from './Register.jsx';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';


function Auth() {
    // react hooks let us change and track state in functional components
    // const [state, setState] = useState(initialValue)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    // check session to see if user is logged in
    const checkSession = async () => {
        try {
            const response = await apiClient.get('/auth/session')
            setIsLoggedIn(response.data.isLoggedIn);
        } catch (error) {
            console.error('Error checking session:', error);
        }
    }

    // run checkSession function when component mounts
    useEffect(() => {
        checkSession();
    }, []);

    // toggle registering state
    const toggleRegister = () => {
        setIsRegistering(!isRegistering);
    };

    // if logged in, navigate to home page
    if (isLoggedIn) {
        return <Navigate to='/log' />;
    };

    // return JSX to render
    return (
        <div className='centered'>
        <div className='component-container'>
        <div className='horizontal-flex'>
        <div className='vertical-flex'>
            {isRegistering ? (
                <>
                    {/* if registering */}
                    {/* render Register component and pass toggleRegister as prop */}
                    {/* props are used to pass data and logic to child components */}
                    <Register toggleRegister={toggleRegister} />
                    <p>
                        <button onClick={toggleRegister}>login?</button>
                    </p>
                </>
            ) : (
                 <>
                    {/* if not registering */}
                    {/* render Login component and pass checkSession as prop*/}
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

// export functional component for import
export default Auth;