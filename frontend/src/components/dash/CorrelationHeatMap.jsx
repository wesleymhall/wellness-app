import { ResponsiveHeatMap } from '@nivo/heatmap';
import { metricConfig } from '../../Metrics.js';


function CorrelationHeatMap({ data }) {
    // format data for heatmap
    const fdata = Object.entries(data).map(([rowMetric, valuesObj]) => ({
        id: rowMetric,
        data: Object.entries(valuesObj).map(([colMetric, value]) => ({
            x: colMetric,
            y: value
        }))
    }))
    console.log(fdata)
    // return heatmap component
    return (
        <div style={{ height: 400, width: '100%' }}>
            <ResponsiveHeatMap
                data={fdata}
                keys={Object.keys(fdata[0]).filter(k => k !== 'id')} // keys without id
                indexBy='id'
                colors={cell => {
                    // use helper to blend metric colors for correlation comparison
                    return averageRGB({
                        rgbA: metricConfig[cell.serieId].color, 
                        rgbB: metricConfig[cell.data.x].color 
                    });
                }}
                axisTop={null}
                axisBottom={{}}
                animate={null}
            />
        </div>
    )
}

export default CorrelationHeatMap


function averageRGB({ rgbA, rgbB }) {
    // use match and regex to parse rgb for digit pairs
    // map array to convert digit pair str to numbers
    const arrA = rgbA.match(/\d+/g).map(Number);
    const arrB = rgbB.match(/\d+/g).map(Number);
    // average two arrays
    const avg = arrA.map((value, i) => Math.round((value + arrB[i]) / 2));
    // format avg for rgb
    return `rgb(${avg.join(', ')})`
}