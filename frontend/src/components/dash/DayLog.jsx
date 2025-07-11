import { metricConfig } from '../../Metrics.js';
import { useState, useEffect } from 'react';

function DayLog({ selectedDay, logs, onSave }) {
    console.log(logs)
    const [cloneLogs, setCloneLogs] = useState(JSON.parse(JSON.stringify(logs)));
    useEffect(() => {
        setCloneLogs(JSON.parse(JSON.stringify(logs)));
    }, [logs]);
    // if selected day does not exist in logs, create it
    if (cloneLogs && !cloneLogs[selectedDay]) {
        cloneLogs[selectedDay] = Object.keys(metricConfig).map(metricName => ({
          metric: metricName,
          value: 1,
        }));
    }

    return (
        <div className='vertical-space-between'>
            <div>{selectedDay}</div>
            <div className='daylog-list'>
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
                                // save logs immediate upon change
                                onSave(cloneLogs, selectedDay);
                            }}
                            />
                            <p>{log.value}/{metricArray.length}</p>
                            </div>
                        );
                    })}
            </div>
            <div className='horizontal-full'>
                <button
                    onClick={() => {
                        delete cloneLogs[selectedDay];
                        setCloneLogs({ ...cloneLogs });
                        onSave(cloneLogs, selectedDay);
                    }}
                >
                    delete
                </button>
            </div>
        </div>
    );
}

export default DayLog;