function MetricsModal({ onClose }) {
    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

// export functional component for import
export default MetricsModal;