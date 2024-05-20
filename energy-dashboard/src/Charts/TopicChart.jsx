import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import ChartLayout from '../Layout/layout';
import { Box, Heading } from '@chakra-ui/react';

const PolarChart = ({data}) => {
  

  const topics = data.map(item => item.topic);

  const chartData = {
    labels: topics,
    datasets: [
      {
        data: data.map(item => item.relevance),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
        legend: {
          display: false, 
        },
      },
    scale: {
      ticks: {
        beginAtZero: true,
        stepSize: 1,
        max: 5,
      },
    },
  };



  return (
    <ChartLayout
      info={
        <div>
          <h3>Chart Information</h3>
          <p>The Topics Chart visualizes the distribution of topics within a dataset. Each segment in the chart represents a different topic, with the size of the segment indicating the frequency or relevance of that topic. Users can quickly identify the most prevalent topics within the dataset and gain insights into the overall theme or focus of the data.</p>
        </div>
      }
    >
    <Box width="30vw">
      <Heading as="h2" mb={4}>
        Topics Chart
      </Heading>
      <PolarArea data={chartData} options={chartOptions} />
    </Box>
    </ChartLayout>
  );
};

export default PolarChart;
