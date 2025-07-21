import { metricConfig } from '../../Metrics.js';
import { useState, useEffect } from 'react';


function MetricStats({ analytics }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currCorrelations, setCurrCorrelations] = useState({});
    const [span, setSpan] = useState('week')
    const currentMetric = Object.keys(metricConfig)[currentIndex];

    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < Object.keys(metricConfig).length - 1;

    const goToPrevMetric = () => {
        if (hasPrev) {
            setCurrentIndex((prev) => prev - 1);
        }
    };
    const goToNextMetric = () => {
        if (hasNext){
            setCurrentIndex((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const getCurrCorrelations = () => {
            const correlations = analytics?.['correlations'][`${metricConfig[currentMetric].name}`][span];
            console.log('correlations: ', correlations);
            const tempObject = {};
            for (const key in correlations) {
                if (key != metricConfig[currentMetric].name) {
                    tempObject[key] = correlations[key]
                };
            };
            setCurrCorrelations(tempObject)
        };
        getCurrCorrelations();
    }, [currentIndex, analytics, span]);

    return (
        <div className='vertical-flex'>
            <div className='horizontal-space-between'>
                <p>stats</p>
                <select
                  value={span}
                  onChange={(e) => {setSpan(e.target.value)}}
                >
                    <option value='week'>week</option>
                    <option value='month'>month</option>
                    <option value='year'>year</option>
                </select>
            </div>
            {/* metric navigation */}
            <div className='horizontal-space-between'>
                <button onClick={goToPrevMetric} disabled={!hasPrev}>&lt;</button>
                <p>{metricConfig[currentMetric].emoji}: {metricConfig[currentMetric].name}</p>
                <button onClick={goToNextMetric} disabled={!hasNext}>&gt;</button>
            </div>
            <div className='horizontal-space-between'>
                {/* correlations */}
                <div>
                    <p className='horizontal-left'>correlations: </p>
                    <div className='horizontal-left'>
                        <ul>
                        {Object.entries(currCorrelations).map(([key, value]) =>
                            <li key={key}>
                                <div className='horizontal-space-between'>
                                    <div>{metricConfig[key].emoji}:</div>
                                    <div>{Math.round(value*100)/100}</div>
                                </div>
                            </li>
                        )}
                        </ul>
                    </div>
                </div>
                {/* averages */}
            </div>
        </div>
    )
}

export default MetricStats;