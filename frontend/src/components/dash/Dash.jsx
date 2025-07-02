import apiClient from '../../apiClient.js';
import Logout from '../auth/Logout.jsx';
import Calendar from './Calendar.jsx';
import { useState, useEffect } from 'react';


function Dash () {
    const [logs, setLogs] = useState({});
    const [correlation, setCorrelation] = useState(null);
    const [refreshLogs, setRefreshLogs] = useState(false);

    // get logs and analytics on component render and log refresh
    useEffect(() => {
        const getLogs = async () => {
            try {
                const response = await apiClient.get('/dash/getlogs');
                const metricsLogs = response.data.metrics_logs;
                // get correlation analytics
                const correlation = response.data.analytics.correlations;
                setCorrelation(correlation)
                // map logs to dates
                const logsByDate = {};
                metricsLogs.forEach((metric) => {
                    metric.logs.forEach((log) => {
                        // convert timestamp to date object without time
                        const date = new Date(log.timestamp).toISOString().split('T')[0];
                        // create empty dataset if date has no entries
                        if (!logsByDate[date]) {
                            logsByDate[date] = [];
                        }
                        // store log values
                        logsByDate[date].push({
                            value: log.value,
                            metric: metric.metric
                        });
                    });
                });
                setLogs(logsByDate);
            } catch (error) {
                console.error('error getting logs:', error);
            }
        };
        getLogs();
    }, [refreshLogs]);  
    return (
        <>
        <div className='horizontal-flex'>
            <div className='vertical-flex'>
                <div className='horizontal-space-between'>
                    <button>≡</button>
                    <Logout/>
                </div>
                {/* child components */}
                <div className='component-container'>
                    <Calendar 
                        logEntries={logs} 
                        triggerRefresh={() => setRefreshLogs(prev => !prev)}
                    />
                </div>
                <p>{JSON.stringify(correlation)}</p>
            </div>
        </div>
        </>
    );
}

export default Dash;