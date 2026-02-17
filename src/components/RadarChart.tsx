
'use client';

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip, // Legend removed for cleaner look or kept if needed
    Legend
);

export function RadarChart({ data }: { data: any }) {
    const chartData = {
        labels: ['Sovereignty', 'Binding', 'Human-Centricity', 'Economic Weight'],
        datasets: [
            {
                label: 'Agreement Score',
                data: [
                    data.sovereignty_score,
                    data.binding_score,
                    data.human_centricity_score,
                    data.economic_weight,
                ],
                backgroundColor: 'rgba(0, 51, 153, 0.2)', // Reflex Blue transparent
                borderColor: '#003399', // Reflex Blue
                borderWidth: 2,
                pointBackgroundColor: '#FFCC00', // Gold
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#FFCC00',
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                pointLabels: {
                    font: {
                        family: 'Inter',
                        size: 12,
                        weight: 700,
                    },
                    color: '#334155', // Slate
                },
                ticks: {
                    display: false, // Hide the numbers on the axis for cleaner look
                    stepSize: 20,
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#334155',
                titleFont: { family: 'Inter' },
                bodyFont: { family: 'Merriweather' },
            },
        },
        maintainAspectRatio: false,
    };

    return <div className="h-64 w-full"><Radar data={chartData} options={options} /></div>;
}
