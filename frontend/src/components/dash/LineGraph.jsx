import { ResponsiveLine } from '@nivo/line';
import { metricConfig } from '../../Metrics.js';


function LineGraph({ logEntries, days }) {
    // get unique metric names
    const metricNames = new Set();
    Object.keys(logEntries).forEach((date) => {
        logEntries[date].forEach((entry) => {
            metricNames.add(entry.metric);
        });
    });
    // create empty datasets for each metric
    const metricsData = {};
    metricNames.forEach((metric) => {
        metricsData[metric] = [];
    });
    // fill datasets
    days.forEach((date) => {
        // get entries at each date or null if no entry
        const entries = logEntries[date] || [];
        // create object with metric : values for date
        const metricValue = {};
        entries.forEach((entry) => {
            metricValue[entry.metric] = entry.value;
        });
        // for each metric push data
        metricNames.forEach((metric) => {
            // if no data then push undefined
            // do not push null, null breaks the line
            metricsData[metric].push(metricValue[metric] !== undefined ? metricValue[metric] : undefined)
        });
    });
    // format data for line graph
    const fdata = Object.entries(metricsData).map(([metric, data]) => ({
        id: metric,
        data: data.map((value, index) => ({
            x: days[index],
            y: value
        }))
    }));
    // format legend data to allow custom emoji
    const legendData = fdata.map(({ id }) => ({
        id,
        label: metricConfig[id].emoji,
        color: metricConfig[id].color,
    }));
    return (
        <div style={{ height: 400, width: '100%' }}>
            <ResponsiveLine 
                data={fdata}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 1, max: 10}}
                colors={({ id }) => metricConfig[id].color}
                useMesh={true}
                axisBottom={{
                    tickSize: 12,
                    format: (value) => {
                        const parts = value.split('-')
                        return `${parseInt(parts[2])}`
                    }
                }}
                axisLeft={{
                    tickSize: 12,
                }}
                legends={[
                    {
                        anchor: 'top-right',
                        direction: 'column',
                        justify: false,
                        translateX: 53,
                        translateY: 0,
                        itemsSpacing: 15,
                        itemDirection: 'left-to-right',
                        itemWidth: 40,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        data: legendData,
                    }
                ]}
                margin={{ top: 25, right: 50, bottom: 40, left: 32 }}
                theme={{
                    axis: {
                        ticks: {
                            text: {
                                fontSize: 12,
                            }
                        }
                    },
                    legends: {
                        text: {
                            fontSize: 16,
                        }
                    }
                }}
                animate={null}
            />
        </div>
    )
}

export default LineGraph