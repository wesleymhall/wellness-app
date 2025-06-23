import apiClient from '../../apiClient.js';
import Logout from '../auth/Logout.jsx';
import Calendar from './Calendar.jsx';
import LineGraph from './LineGraph.jsx';
import { useState, useEffect } from 'react';
import { 
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    format,
    addMonths,
    subMonths,
} from 'date-fns';


function Dash () {
    const [logs, setLogs] = useState({});
    // set default month to current date
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [refreshLogs, setRefreshLogs] = useState(false);

    // set month bounds
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);

    // navigate between months
    const goToNextMonth = () => {
        // pass prev month, add 1
        setCurrentMonth((prev) => addMonths(prev, 1));
    };
    const goToPreviousMonth = () => {
        // pass prev month, subtract 1
        setCurrentMonth((prev) => subMonths(prev, 1));
    };

    // array of date objects within bounds
    const daysArray = eachDayOfInterval({
        start: monthStart,
        end: monthEnd,
    }).map(day => format(day, 'yyyy-MM-dd'));

    // get logs on component render
    useEffect(() => {
        const getLogs = async () => {
            try {
                const response = await apiClient.get('/dash/getlogs');
                const metricsLogs = response.data.metrics_logs;

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
                {/* month navigation */}
                <div className='horizontal-space-between'>
                    <button onClick={goToPreviousMonth}>&lt;</button>
                    <p>{format(currentMonth, 'MMMM yyyy')}</p>
                    <button onClick={goToNextMonth}>&gt;</button>
                </div>
                {/* child components */}
                <Calendar 
                    logEntries={logs} 
                    days={daysArray}
                    triggerRefresh={() => setRefreshLogs(prev => !prev)}
                />
                <LineGraph logEntries={logs} days={daysArray}/>
                <Logout />
            </div>
        </div>
        </>
    );
}

export default Dash;