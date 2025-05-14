import { format } from 'date-fns';

function MetricsModal({ onClose, selectedDay, logs }) {
    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                {logs[format(selectedDay, 'yyyy-MM-dd')] ? (
                    <div>
                        {logs[format(selectedDay, 'yyyy-MM-dd')].map((log, index) => (
                            <div key={index}>
                                <input
                                    type='range'
                                    min='0'
                                    max='10'
                                    step='1'
                                    value={log.value}
                                />
                            </div>
                        ))}
                    </div>
                ) : (null)}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

// export functional component for import
export default MetricsModal;