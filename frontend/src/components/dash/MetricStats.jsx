import { metricConfig } from '../../Metrics.js';
import { useState } from 'react';


function MetricStats({ analytics }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const currentMetric = Object.keys(metricConfig)[currentIndex]

    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < Object.keys(metricConfig).length - 1;

    const goToPrevMetric = () => {
        if (hasPrev) {
            setCurrentIndex((prev) => prev - 1)
        }
    }
    const goToNextMetric = () => {
        if (hasNext){
            setCurrentIndex((prev) => prev + 1)
        }
    }   

    return (
        <div className='vertical-flex'>
            <p className='horizontal-left'>stats</p>
            {/* metric navigation */}
            <div className='horizontal-space-between'>
                <button onClick={goToPrevMetric} disabled={!hasPrev}>&lt;</button>
                <p>{metricConfig[currentMetric].emoji}: {metricConfig[currentMetric].prompt}</p>
                <button onClick={goToNextMetric} disabled={!hasNext}>&gt;</button>
            </div>
        </div>
    )
}

export default MetricStats;