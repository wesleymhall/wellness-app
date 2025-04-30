function MetricsModal({ selectedDay, onClose }) {
    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h2>{selectedDay.toDateString()}</h2>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

// export functional component for import
export default MetricsModal;