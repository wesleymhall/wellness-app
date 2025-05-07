import MetricsModal from './MetricsModal';
import { useState } from 'react';
import { 
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    format,
    addMonths,
    subMonths,
    set,
} from 'date-fns';


function Calendar() {
    // configure react hooks to manage state
    // set default month to current date
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // set month bounds
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    // returns array of date objects within bounds
    const days = eachDayOfInterval({
        start: monthStart,
        end: monthEnd,
    });

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
        <div className='calendar-container'>
            {/* month navigation */}
            <div className='calendar-header'>
                <button className='calendar-nav-button' onClick={goToPreviousMonth}>&lt;</button>
                <h2 className='calendar-title'>{format(currentMonth, 'MMMM yyyy')}</h2>
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
                        {format(day, 'd')}
                    </div>
                ))}
            </div>
            {/* if showModal and selectedDay, render metrics modal */}
            {/* pass selectedDay and handleModalClose as props */}
            {showModal && selectedDay && (
                <MetricsModal
                    selectedDay={selectedDay}
                    onClose={handleModalClose}
                />
            )}
        </div>
    );
}

// export functional component for import
export default Calendar;