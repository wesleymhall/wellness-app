import apiClient from '../../apiClient.js';
import { useState, useEffect } from 'react';
import MoodLog from './MoodLog.jsx';


function Welcome () {
    // useState hook to manage user state
    const [user, setUser] = useState('');
    // run getUser function when component mounts
    useEffect(() => {
        getUser();
    }, []);

    const getUser = async (e) => {
    try {
        // use axios instance with endpoint
        const response = await apiClient.get('/welcome/getuser');
        // if success, set user state with username
        setUser(response.data.username)
    } catch (error) { 
        console.log(response.data.error)
    }
    };
    // return JSX to render
    return (
        <div className='vertical-flex'>
            {/* Welcome user */}
            <h1>hi {user} how do u feel today?</h1>
            {/* render MoodLog component */}
            <MoodLog />
        </div>
    );
}

// export functional component for import
export default Welcome;