import { metricConfig } from '../../Metrics.js';
import { 
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    format,
    addMonths,
    subMonths,
} from 'date-fns';
import { useState, useEffect } from 'react';


function Calendar({ calendarLogs, triggerDaySelect, selectedDay }) {
    const [logs, setLogs] = useState(calendarLogs);
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

    // updated logs upon prop change
    useEffect(() => {
        setLogs(calendarLogs);
    }, [calendarLogs]);

    return (
        <div className='vertical-flex'>
            <div className='horizontal-left'>calendar</div>
            {/* month navigation */}
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
                            onClick={() => triggerDaySelect(day)}
                        >
                            {/* if day has logs, render metric emote with max value */}
                            {logs[day]?.length >= 1 ? (
                                <div>
                                    {
                                        (() => {
                                            {/* reduce iterates logs[day], callback compares log with prev to find max */}
                                            {/* reduce(callback, index) */}
                                            const maxLog = logs[day].reduce((max, log) =>
                                                log.value > max.value ? log : max, logs[day][0]);
                                            {/* access array in metricConfig, find emote that equals value */}
                                            {/* use option chaining to safely access this emote */}
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
