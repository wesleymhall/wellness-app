import apiClient from '../../apiClient.js';
import MetricsModal from './MetricsModal';
import { useState, useEffect } from 'react';
import { 
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    format,
    addMonths,
    subMonths,
} from 'date-fns';


function Calendar() {
    // configure react hooks to manage state
    // set default month to current date
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [logs, setLogs] = useState({});
    const [selectedDay, setSelectedDay] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // array of moods
    const moods = [
        { id: 1, mood: '(╥﹏╥)' },
        { id: 2, mood: '(ಥ﹏ಥ)' },
        { id: 3, mood: '(︶︹︶)' },
        { id: 4, mood: '(・_・)' },
        { id: 5, mood: '(^ ‿ ^)' },
        { id: 6, mood: '(๑>◡<๑)' },
        { id: 7, mood: '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧' },
    ];

    // set month bounds
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    // returns array of date objects within bounds
    const days = eachDayOfInterval({
        start: monthStart,
        end: monthEnd,
    });

    // on element mount, get metrics logs data from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/dash/getlogs');
                const metricsLogs = response.data.metrics_logs;
                console.log(metricsLogs)

                // map logs to their corresponding dates
                const logsByDate = {};
                metricsLogs.forEach((metric) => {
                    metric.logs.forEach((log) => {
                        // convert timestamp to date object
                        const date = new Date(log.timestamp).toISOString().split('T')[0];
                        if (!logsByDate[date]) {
                            logsByDate[date] = [];
                        }
                        logsByDate[date].push({
                            value: log.value,
                            metric: metric.metric
                        }); // store log values
                    });
                });

                setLogs(logsByDate);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };
        fetchData();
    }, [currentMonth]); // Refetch logs when the month changes

    // functions to navigate between months
    const goToNextMonth = () => {
        // pass prev month and add 1
        setCurrentMonth((prev) => addMonths(prev, 1));
    };
    const goToPreviousMonth = () => {
        // pass prev month and subtract 1
        setCurrentMonth((prev) => subMonths(prev, 1));
    };

    // functions to select a day and show metrics modal
    const handleDaySelect = (day) => {
        setSelectedDay(day);
        setShowModal(true);
    }
    const handleModalClose = () => {
        setSelectedDay(null);
        setShowModal(false);
    }

    // return JSX to render
    return (
        <div className='centered'>
        <div className='calendar-container'>
            {/* month navigation */}
            <div className='calendar-header'>
                <button className='calendar-nav-button' onClick={goToPreviousMonth}>&lt;</button>
                <p className='calendar-title'>{format(currentMonth, 'MMMM yyyy')}</p>
                <button className='calendar-nav-button' onClick={goToNextMonth}>&gt;</button>
            </div>
            {/* days grid */}
            <div className='calendar-grid'>
                {/* map renders elements array to JSX */}
                {/* assign unique key to each element */}
                {/* format date object as number */}
                {days.map((day) => (
                    <div 
                        key={day.toISOString()} 
                        className='calendar-day'
                        onClick={() => handleDaySelect(day)}
                    >
                        {/* check if day has logs */}
                        {/* if so, render the logs */}
                        {/* else render empty state */}
                        {logs[format(day, 'yyyy-MM-dd')] ? (
                            <div className='calendar-day-logs'>
                                {logs[format(day, 'yyyy-MM-dd')].map((log, index) => (
                                    <div key={index} className='calendar-log'>
                                        {log.metric == 'mood' ? (
                                            moods.find((mood) => mood.id == log.value)?.mood || log
                                        ) : (null)}
                                    </div>
                                ))}
                            </div>
                        ) : (null)}
                    </div>
                ))}
            </div>
            {/* if showModal and selectedDay, render metrics modal */}
            {/* pass selectedDay and handleModalClose as props */}
            {showModal && selectedDay && (
                <MetricsModal
                    onClose={handleModalClose}
                    selectedDay={selectedDay}
                    logs={logs}
                />
            )}
        </div>
        </div>
    );
}

// export functional component for import
export default Calendar;