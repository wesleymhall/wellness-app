import apiClient from '../../apiClient.js';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Navigate } from 'react-router-dom';


function WelcomeLog () {
    const [user, setUser] = useState('');
    const [hasLogsToday, setHasLogsToday] = useState(false);
    // userAuth asks if user has time for log
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

            // check if any logs exist for today
            const hasLogs = metricLogs.some((metric) =>
                metric.logs.some((log) => {
                    // convert log timestamp to date string without time
                    const logDate = new Date(log.timestamp).toISOString().split('T')[0];
                    return logDate === today;
                })
            );
            setHasLogsToday(hasLogs);
        } catch (error) {
            console.error('error checking logs:', error);
    }};

    // get user name
    const getUser = async (e) => {
        try {
            const response = await apiClient.get('/welcome/getuser');
            // if success, set user state with username
            setUser(response.data.username)
        } catch (error) { 
            console.error('error getting user:', error);
        }
    };

    // if user says no, set emote to sad
    const checkUserAuth = () => {
        if (userAuth == false) {
            setEmote('(ಥ﹏ಥ)')
        }
    };

    // check userAuth state when it changes
    useEffect(() => {
        if (userAuth !== null) {
            checkUserAuth();
        }
    }, [userAuth]);

    // if user has logged today, redirect to dash
    if (hasLogsToday) {
        return <Navigate to='/dash' />;
    }

    // if user says yes, redirect to emotion log
    if (userAuth == true) {
        return <Navigate to='/how do u feel' />
    }

    return (
        <div className='horizontal-flex'>
        <div className='vertical-flex'>
            {/* welcome user and ask for auth to log */}
            <p>hi {user} {emote}</p>
            <p>got a sec?</p>
            <div>
                <button onClick={() => setUserAuth(true)}>yes</button>
                <button onClick={() => setUserAuth(false)}>no</button>
            </div>
        </div>
        </div>
    );
}

export default WelcomeLog;