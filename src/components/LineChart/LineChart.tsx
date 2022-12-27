import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type LineChartProps = {
    dataset: number[],
    borderColor: string,
    backgroundColor: string,
}

function LineChart({ dataset, borderColor, backgroundColor }: Partial<LineChartProps>) {

    const data = {
        labels: dataset,
        datasets: [
            {
                data: dataset,
                borderColor,
                backgroundColor,
                tension: 0.5,
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: { display: false },
                grid: {
                    display: false
                }
            },
            y: {
                ticks: { display: false },
                grid: {
                    display: false
                }
            }
        }
    }

    return (
        <Line options={options} data={data} />
    );
}

export default LineChart;