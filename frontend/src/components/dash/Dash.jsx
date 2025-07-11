import apiClient from '../../apiClient.js';
import Logout from '../auth/Logout.jsx';
import Calendar from './Calendar.jsx';
import { useState, useEffect } from 'react';
import DayLog from './DayLog.jsx';
import { 
    format,
} from 'date-fns';


function Dash () {
    const [logs, setLogs] = useState({});
    const [correlation, setCorrelation] = useState(null);
    const [refreshLogs, setRefreshLogs] = useState(false);
    const [selectedDay, setSelectedDay] = useState(format(new Date(), 'yyyy-MM-dd'));

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

    const handleSave = async (updatedLogs, day) => {
        // optimistic update
        setLogs(updatedLogs);
        try {
            if (updatedLogs[day]) {
                // log metrics
                for (const metric of updatedLogs[day]) {
                    await apiClient.post('/log/logmetric', {value: metric.value, name: metric.metric, date: day});
                };
            } else {
                // delete logs for day
                await apiClient.delete('/log/deletelog', {data: {date: day}});
            }
        } catch (error) {
            console.error('error saving changes:', error);
        }
        // refresh logs in parent component
        setRefreshLogs(prev => !prev)
    };

    return (
        <>
        <div className='horizontal-flex'>
            <div className='vertical-flex'>
                {/* child components */}
                {/* row A */}
                <div className='horizontal-flex stretch-row'>
                    <div className='component-container stretch-container'>
                        <Calendar 
                            logEntries={logs} 
                            triggerDaySelect={(day) => setSelectedDay(day)}
                            selectedDay={selectedDay}
                        />
                    </div>
                    <div className='component-container stretch-container'>
                        <DayLog 
                            selectedDay={selectedDay}
                            logs={logs}
                            onSave={handleSave}
                        />
                    </div>
                </div>
                {/* row B */}
                <div className='horizontal-flex stretch row'>
                    <div className='component-container stretch-container'>
                        <p>{JSON.stringify(correlation)}</p>
                    </div>
                </div>

                <div className='horizontal-space-between'>
                    <Logout/>
                </div>
            </div>
        </div>
        </>
    );
}

export default Dash;