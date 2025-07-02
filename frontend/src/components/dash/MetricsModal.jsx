import { metricConfig } from '../../Metrics.js';
import { useState } from 'react';

function MetricsModal({ onClose, selectedDay, logs, onSave }) {
    // deep clone logs to avoid mutating original logs
    const [cloneLogs, setCloneLogs] = useState(JSON.parse(JSON.stringify(logs)));
    // if selected day does not exist in logs, create it
    if (!cloneLogs[selectedDay]) {
        cloneLogs[selectedDay] = Object.keys(metricConfig).map((metricName) => ({
          metric: metricName,
          value: 1,
        }));
    }
    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
            <div className='vertical-flex'>
                <div>{selectedDay}</div>
                {cloneLogs[selectedDay].map((log, index) => {
                    const config = metricConfig[log.metric];
                    const metricArray = config.array;
                    return (
                        <div key={index} className='horizontal-full'>
                            <p>{config.emoji}: </p>
                            <input
                                type='range'
                                min='1'
                                max={metricArray.length}
                                step='1'
                                value={log.value}
                                onChange={(e) => {
                                    log.value = Number(e.target.value);
                                    // shallow clone cloneLogs to allow for state update before save
                                    // does not matter if original clone logs is mutated
                                    setCloneLogs({ ...cloneLogs });
                                }}
                                />
                                <p>{log.value}/{metricArray.length}</p>
                                </div>
                            );
                        })}
                <div className='horizontal-full'>
                    <button onClick={onClose}>close</button>
                    <button 
                        onClick={() => {
                            onSave(cloneLogs, selectedDay);
                            onClose();
                        }}
                    >
                        save
                    </button>
                    <button
                        onClick={() => {
                            delete cloneLogs[selectedDay];
                            setCloneLogs({ ...cloneLogs });
                            onSave(cloneLogs, selectedDay);
                            onClose();
                        }}
                    >
                        delete
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
}

export default MetricsModal;