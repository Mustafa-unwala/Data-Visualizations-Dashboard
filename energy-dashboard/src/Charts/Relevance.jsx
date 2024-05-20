import React from 'react';
import { Bubble } from 'react-chartjs-2';
import { Box, Heading } from '@chakra-ui/react';
import ChartLayout from '../Layout/layout';
import { Chart, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const RelevanceChart = ({data}) => {
  const filteredData = data.filter(item => item.start_year && item.intensity && item.relevance);

  const bubbleData = filteredData.map(item => ({
    x: item.start_year,
    y: item.intensity,
    r: item.relevance,
  }));

  const chartData = {
    datasets: [
      {
        label: 'Relevance Bubble Chart',
        data: bubbleData,
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
        borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
        borderWidth: 1,
        hoverBackgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
        hoverBorderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Start Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Intensity',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const { x, y, r } = context.raw;
            return `Year: ${x}, Intensity: ${y}, Relevance: ${r}`;
          },
        },
      },
      legend: {
        display: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <ChartLayout
      info={
        <div>
          <h3>Chart Information</h3>
          <p>The Relevance Chart visualizes the relevance scores of various data points within a dataset. Each segment in the chart represents a data point, with the size or color of the segment indicating the relevance score. Users can assess the importance or significance of different data points and identify key insights or patterns based on their relevance scores.</p>
          
        </div>
      }
    >
      <Box maxHeight="60vh" margin={50} p={4} mt={8} borderRadius={18} boxShadow ='0px 0px 10px rgba(0, 0, 0, 0.1)'>
      <Heading as="h2" mb={4}>Relevance Chart</Heading>
      <Bubble data={chartData} options={chartOptions} />
    </Box>
    </ChartLayout>
  );
};

export default RelevanceChart;