import { useState, useEffect } from 'react';
import { metricConfig } from '../../Metrics.js';
import { 
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    format,
    addMonths,
    subMonths,
} from 'date-fns';


function Calendar({ logEntries, triggerDaySelect, selectedDay }) {
    const [logs, setLogs] = useState(logEntries);
    // set default month to current date
    const [currentMonth, setCurrentMonth] = useState(new Date());

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
    const days = eachDayOfInterval({
        start: monthStart,
        end: monthEnd,
    }).map(day => format(day, 'yyyy-MM-dd'));

    // updated logs when logEntry changes
    // important as logEntry is returned from async func in parent
    useEffect(() => {
        setLogs(logEntries);
    }, [logEntries]);

    // dynamic log changes
    const handleDaySelect = (day) => {
        triggerDaySelect(day); // refresh day in parent component
    };

    return (
        <div className='vertical-flex'>
            {/* month navigation */}
            <div className='horizontal-left'>calendar</div>
            <div className='horizontal-space-between'>
                <button onClick={goToPreviousMonth}>&lt;</button>
                <p>{format(currentMonth, 'MMMM yyyy').toLowerCase()}</p>
                <button onClick={goToNextMonth}>&gt;</button>
            </div>
            {/* days grid */}
            <div className='calendar-grid'>
                {/* render each day */}
                {days.map((day) => {
                    const isSelected = day === selectedDay;
                    return (
                        <div 
                            key={day} 
                            className={`calendar-day ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleDaySelect(day)}
                        >
                            {/* if day has logs, render metric emote with max value */}
                            {logs[day]?.length >= 1 ? (
                                <div>
                                    {
                                        (() => {
                                            {/* reduce loops logs[day] callback compares log with prev to find max */}
                                            {/* reduce(callback, index) */}
                                            const maxLog = logs[day].reduce((max, log) =>
                                                log.value > max.value ? log : max, logs[day][0]);
                                            {/* access array in metricConfig, find emote that equals value */}
                                            {/* use option chaining to safely access this emote */}
                                            {/* BUG: not sure why but metricConfig[maxLog.metric] returns undefined 
                                                upon save changes without the option chaining and throws error 
                                                could be timing issue with the api call to backend not sure*/}
                                            return metricConfig[maxLog.metric]?.array?.find(
                                                emote => emote.id === maxLog.value
                                                )?.emote || null;
                                        })()
                                    }
                                </div>
                            ) : (null)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Calendar;
