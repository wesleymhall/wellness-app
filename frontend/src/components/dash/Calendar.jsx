import apiClient from '../../apiClient.js';
import MetricsModal from './MetricsModal';
import { useState, useEffect } from 'react';
import { emotions } from '../../Metrics.js';


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
                    await apiClient.post('/log/logmetric', {name: metric.metric, value: metric.value, date: day});
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
                            {/* if day has logs, render mood emote */}
                            {logs[day] ? (
                                <div>
                                    {logs[day].map((log, index) => (
                                        <div key={index}>
                                            {log.metric == 'emotion' ? (
                                                emotions.find((emotion) => emotion.id == log.value)?.emote || null
                                            ) : (null)}
                                        </div>
                                    ))}
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
