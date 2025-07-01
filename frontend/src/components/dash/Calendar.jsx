import apiClient from '../../apiClient.js';
import MetricsModal from './MetricsModal';
import { useState, useEffect } from 'react';
import { metricConfig } from '../../Metrics.js';


function Calendar({ logEntries, days, triggerRefresh }) {
    const [logs, setLogs] = useState(logEntries);
    const [selectedDay, setSelectedDay] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // updated logs when logEntry changes
    // important as logEntry is returned from async func in parent
    useEffect(() => {
        setLogs(logEntries);
    }, [logEntries]);

    // dynamic log changes
    const handleDaySelect = (day) => {
        setSelectedDay(day); // day is now a formatted string
        setShowModal(true);
    };
    const handleModalClose = () => {
        setSelectedDay(null);
        setShowModal(false);
    };

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
        triggerRefresh()
    };
    return (
        <div className='vertical-flex'>
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
            {/* if showModal and selectedDay, render metrics modal */}
            {showModal && selectedDay && (
                <MetricsModal
                    onClose={handleModalClose}
                    selectedDay={selectedDay}
                    logs={logs}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}

export default Calendar;
