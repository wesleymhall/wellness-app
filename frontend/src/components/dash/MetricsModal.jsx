import * as Metrics from '../../Metrics.js';
import { format } from 'date-fns';
import { useState } from 'react';

function MetricsModal({ onClose, selectedDay, logs, onSave }) {
    // deep clone logs to avoid mutating original logs
    const [cloneLogs, setCloneLogs] = useState(JSON.parse(JSON.stringify(logs)));
    const fselectedDay = format(selectedDay, 'yyyy-MM-dd');
    const emojis = {
        emotion: '😊',
        sleep: '😴',
    };
    // if selected day does not exist in logs, create it
    if (!cloneLogs[fselectedDay]) {
        cloneLogs[fselectedDay] = [
            { metric: 'emotion', value: 0 },
            { metric: 'sleep', value: 0 }
        ];
    };
    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
            <div className='vertical-flex'>
                {cloneLogs[fselectedDay].map((log, index) => {
                    const metricArray = Metrics[log.metric + 's'];
                    return (
                        <div key={index} className='horizontal-full'>
                            <p>{emojis[log.metric] ? emojis[log.metric] : null}</p>
                            <input
                                type='range'
                                min='1'
                                max={metricArray.length}
                                step='1'
                                value={log.value}
                                onChange={(e) => {
                                    log.value = e.target.value;
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
                            onSave(cloneLogs);
                            onClose();
                        }}
                    >
                        save
                    </button>
                    <button
                        onClick={() => {
                            delete cloneLogs[fselectedDay];
                            setCloneLogs({ ...cloneLogs });
                            onSave(cloneLogs);
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