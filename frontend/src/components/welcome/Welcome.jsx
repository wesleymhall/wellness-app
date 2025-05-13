import apiClient from '../../apiClient.js';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Navigate } from 'react-router-dom';


function Welcome () {
    // useState hook to manage user state
    const [user, setUser] = useState('');
    const [hasLogsToday, setHasLogsToday] = useState(false);
    const [userAuth, setUserAuth] = useState(null);
    const [emote, setEmote] = useState('(˶ᵔᵕᵔ˶)')

    // run getUser and checkLogsToday when component mounts
    useEffect(() => {
        getUser();
        checkLogsToday();
    }, []);

    // check if logs exist for the current day
    const checkLogsToday = async () => {
        try {
            const today = format(new Date(), 'yyyy-MM-dd'); 
            const response = await apiClient.get('/dash/getlogs'); 
            const metricLogs = response.data.metrics_logs;
            console.log('metricLogs:', metricLogs)

            // check if any logs exist for today
            const hasLogs = metricLogs.some((metric) =>
                metric.logs.some((log) => {
                    const logDate = new Date(log.timestamp).toISOString().split('T')[0];
                    return logDate === today;
                })
            );
            setHasLogsToday(hasLogs);
        } catch (error) {
            console.error('Error checking logs:', error);
    }};

    const getUser = async (e) => {
        try {
            // use axios instance with endpoint
            const response = await apiClient.get('/welcome/getuser');
            // if success, set user state with username
            setUser(response.data.username)
        } catch (error) { 
            console.error('Error fetching user:', error);
        }
    };

    const checkUserAuth = () => {
        if (userAuth == false) {
            setEmote('(ಥ﹏ಥ)')
        }
    };

    useEffect(() => {
        if (userAuth !== null) {
            checkUserAuth();
        }
    }, [userAuth]);

    // if user has logged today, redirect to dash
    if (hasLogsToday) {
        return <Navigate to='/dash' />;
    }

    if (userAuth == true) {
        return <Navigate to='/moodlog' />
    }

    // return JSX to render
    return (
        <div className='vertical-flex'>
            {/* Welcome user */}
            <p>hi {user} {emote}</p>
            <p>got a sec?</p>
            <div>
                <button onClick={() => setUserAuth(true)}>yes</button>
                <button onClick={() => setUserAuth(false)}>no</button>
            </div>
        </div>
    );
}

// export functional component for import
export default Welcome;