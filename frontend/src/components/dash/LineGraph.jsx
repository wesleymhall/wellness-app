import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);


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
    // configure line graph
    const data = {
      labels: days,
      datasets: Object.entries(metricsData).map(([label, data]) => ({
        label: label,
        data: data,
        borderColor: 'rgb(0,0,0)',
        tension: 0.4,
        borderWidth: 1,
        pointRadius: 0,
        spanGaps: true,
      })),
    };
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      scales: {
        x: {
          ticks: {
            display: false,
          },
        },
        y: {
          min: 1,
          max: 10,
        },
      },
    };    
    return <Line data={data} options={options} />;
  }
  
  export default LineGraph;
  