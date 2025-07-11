import apiClient from '../../apiClient.js';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { metricConfig } from '../../Metrics.js';



function WelcomeLog () {
    const [user, setUser] = useState('');
    const [hasLogsToday, setHasLogsToday] = useState(false);
    const navigate = useNavigate();

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

    // if user has logged today, redirect to dash
    if (hasLogsToday) {
        navigate('/dash');
    }

    return (
        <div className='centered'>
        <div className='component-container'>
        <div className='horizontal-flex'>
        <div className='vertical-flex'>
            {/* welcome user and ask for auth to log */}
            <p>hi {user} </p>
            <p>got a sec?</p>
            <p>
                <button onClick={() => navigate(`/log/${Object.keys(metricConfig)[0]}`)}>yes</button>
                <button onClick={() => navigate('/dash')}>no</button>
            </p>
        </div>
        </div>
        </div>
        </div>
    );
}

export default WelcomeLog;