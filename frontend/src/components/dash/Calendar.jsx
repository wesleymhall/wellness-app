import apiClient from '../../apiClient.js';
import MetricsModal from './MetricsModal';
import { useState, useEffect } from 'react';
import {emotions} from '../../Metrics.js';
import { 
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    format,
    addMonths,
    subMonths,
} from 'date-fns';


function Calendar() {
    // set default month to current date
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [logs, setLogs] = useState({});
    const [selectedDay, setSelectedDay] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // set month bounds
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    // array of date objects within bounds
    const days = eachDayOfInterval({
        start: monthStart,
        end: monthEnd,
    });

    // on month change, get logs for the month
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
    }, [currentMonth]);

    // navigate between months
    const goToNextMonth = () => {
        // pass prev month, add 1
        setCurrentMonth((prev) => addMonths(prev, 1));
    };
    const goToPreviousMonth = () => {
        // pass prev month, subtract 1
        setCurrentMonth((prev) => subMonths(prev, 1));
    };

    // handle day select and show modal
    const handleDaySelect = (day) => {
        setSelectedDay(day);
        setShowModal(true);
    }
    const handleModalClose = () => {
        setSelectedDay(null);
        setShowModal(false);
    }

    return (
        <div className='vertical-flex'>
            {/* month navigation */}
            <div className='horizontal-space-between'>
                <button onClick={goToPreviousMonth}>&lt;</button>
                <p>{format(currentMonth, 'MMMM yyyy')}</p>
                <button onClick={goToNextMonth}>&gt;</button>
            </div>
            {/* days grid */}
            <div className='calendar-grid'>
                {/* render each day */}
                {days.map((day) => (
                    <div 
                        key={day.toISOString()} 
                        className='calendar-day'
                        onClick={() => handleDaySelect(day)}
                    >
                        {/* if day has logs, render mood emote */}
                        {logs[format(day, 'yyyy-MM-dd')] ? (
                            <div>
                                {logs[format(day, 'yyyy-MM-dd')].map((log, index) => (
                                    <div key={index}>
                                        {log.metric == 'emotion' ? (
                                            emotions.find((emotion) => emotion.id == log.value)?.emote || null
                                        ) : (null)}
                                    </div>
                                ))}
                            </div>
                        ) : (null)}
                    </div>
                ))}
            </div>
            {/* if showModal and selectedDay, render metrics modal */}
            {showModal && selectedDay && (
                <MetricsModal
                    onClose={handleModalClose}
                    selectedDay={selectedDay}
                    logs={logs}
                />
            )}
        </div>
    );
}

export default Calendar;