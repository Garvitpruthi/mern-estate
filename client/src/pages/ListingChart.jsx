import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'; // For bar chart
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ListingsChart = ({ listingsPerMonth }) => {
    console.log(listingsPerMonth, "chart vale m");

    const [chartData, setChartData] = useState({});

    useEffect(() => {
        // Ensure we have data before trying to map
        if (listingsPerMonth && listingsPerMonth.length > 0) {
            const labels = listingsPerMonth.map(item => `${item._id.month}-${item._id.year}`);
            const data = listingsPerMonth.map(item => item.count);

            // Set chart data
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Listings per Month',
                        data: data,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [listingsPerMonth]);

    return (
        <div className="chart-container">
            <h2 className="text-center text-2xl font-bold mb-4">Listings per Month</h2>
            {/* Render the Bar chart if chartData is available */}
            {chartData.labels ? <Bar data={chartData} /> : <p>No data available</p>}
        </div>
    );
};

export default ListingsChart;
