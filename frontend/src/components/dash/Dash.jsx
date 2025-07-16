import apiClient from '../../apiClient.js';
import DayLogs from './DayLogs.jsx';
import Calendar from './Calendar.jsx';
import Logout from '../auth/Logout.jsx';
import MetricStats from './MetricStats.jsx';
import Trends from './Trends.jsx';
import { metricConfig } from '../../Metrics.js';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';


function Dash () {
    const [logs, setLogs] = useState({});
    const [analytics, setAnalytics] = useState(null);
    const [selectedDay, setSelectedDay] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [dayLogs, setDayLogs] = useState([]);

    // get data on component render
    useEffect(() => {
        const getLogs = async () => {
            try {
                const response = await apiClient.get('/dash/getlogs');
                const metricsLogs = response.data.metrics_logs;
                // get analytics
                const analytics = response.data.analytics;
                setAnalytics(analytics)
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
    }, []);  

    useEffect(() => {
        // generate default logs for empty day
        if (!logs[selectedDay]) {
            const defaultDay = Object.keys(metricConfig).map(metricName => ({
                metric: metricName,
                value: 1,
            }));
            setDayLogs(defaultDay);
        }
        // else assign logs to day
        else {
            setDayLogs(logs[selectedDay]);
        }
    }, [selectedDay, logs]);

    const handleChange = async (updatedDayLog, day) => {
        // shallow clone logs
        const logsCopy = { ...logs};
        try {
            if (updatedDayLog) {
                // update local copy
                logsCopy[day] = updatedDayLog;
                // log metrics
                for (const metric of updatedDayLog) {
                    await apiClient.post('/log/logmetric', {value: metric.value, name: metric.metric, date: day});
                };
            } else {
                // update local copy
                delete logsCopy[day];
                // delete logs
                await apiClient.delete('/log/deletelog', {data: {date: day}});
            }
        } catch (error) {
            console.error('error saving changes:', error);
        }
        // pessimistic update
        setLogs(logsCopy);
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
                            calendarLogs={logs} 
                            triggerDaySelect={(day) => {
                                setSelectedDay(day);
                            }}
                            selectedDay={selectedDay}
                        />
                    </div>
                    <div className='component-container stretch-container'>
                        <DayLogs 
                            selectedDay={selectedDay}
                            onChange={handleChange}
                            dayLogs={dayLogs}
                        />
                    </div>
                </div>
                {/* row B */}
                <div className='horizontal-flex stretch-row'>
                    <div className='component-container stretch-container'>
                        <MetricStats
                            analytics={analytics}
                        />
                    </div>
                    <div className='component-container stretch-container'>
                        <Trends/>
                    </div>
                </div>
                {/* logout component */}
                <div className='horizontal-full'>
                    <Logout/>
                </div>
            </div>
        </div>
        </>
    );
}

export default Dash;