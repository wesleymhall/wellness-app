import * as Metrics from '../../Metrics.js';
import { format } from 'date-fns';
import { useState } from 'react';

function MetricsModal({ onClose, selectedDay, logs }) {
    // shallow clone logs to allow for state update
    // logs will be mutated in the modal
    const [cloneLogs, setCloneLogs] = useState({ ...logs });
    const emojis = {
        emotion: '😊',
        sleep: '😴',
    }
    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
            <div className='vertical-flex'>
                {cloneLogs[format(selectedDay, 'yyyy-MM-dd')] ? (
                    <>
                        {cloneLogs[format(selectedDay, 'yyyy-MM-dd')].map((log, index) => {
                            const metricArray = Metrics[log.metric + 's'];
                            return (
                                <div key={index} className='horizontal-left'>
                                    <p>{emojis[log.metric] ? emojis[log.metric] : null}</p>
                                    <input
                                        type='range'
                                        min='0'
                                        max={metricArray.length - 1}
                                        step='1'
                                        value={log.value}
                                        onChange={(e) => {
                                             log.value = e.target.value;
                                             // shallow clone cloneLogs to allow for state update before save
                                             // does not matter if original clone logs is mutated
                                             setCloneLogs({ ...cloneLogs });
                                        }}
                                    />
                                    <p>{log.value}/{metricArray.length - 1}</p>
                                </div>
                            );
                        })}
                    </>
                ) : null}
                <div className='horizontal-full'>
                    <button onClick={onClose}>close</button>
                    <button>save</button>
                </div>
            </div>
            </div>
        </div>
    );
}

export default MetricsModal;