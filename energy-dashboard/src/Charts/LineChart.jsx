import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ChartLayout from '../Layout/layout';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Heading } from '@chakra-ui/react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
  const [selectedSector, setSelectedSector] = useState('');

  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };

  const filteredData = selectedSector ? data.filter(item => item.sector === selectedSector) : data;

  const processedData = filteredData.reduce((acc, item) => {
    const { start_year, intensity, sector } = item;
    if (!start_year) return acc;

    if (!acc[start_year]) {
      acc[start_year] = {};
    }

    if (!acc[start_year][sector]) {
      acc[start_year][sector] = 0;
    }

    acc[start_year][sector] += intensity;
    return acc;
  }, {});

  const years = Object.keys(processedData).sort((a, b) => a - b);
  const sectors = [...new Set(filteredData.map(item => item.sector))];
  const sectorslist = [...new Set(data.map(item => item.sector))].filter(sector => sector);

  const chartData = {
    labels: years,
    datasets: sectors.map((sector, index) => ({
      label: sector,
      data: years.map(year => processedData[year][sector] || 0),
      borderColor: `hsl(${(index * 360) / sectors.length}, 100%, 50%)`,
      fill: false,
      tension: 0.1,
    })),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Intensity Over Years by Sector',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
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
  };

  return (
    <ChartLayout
      info={
        <div>
          <h3>Chart Information</h3>
          <p>
            The Line Chart visualizes the intensity of various sectors over the years. Each line in the chart represents a different sector, with the x-axis indicating the years and the y-axis representing the intensity level.
            <br />
            The chart allows for easy comparison of intensity trends across different sectors over time. The intensity values are aggregated and plotted against each corresponding year, providing insights into how the intensity of each sector has evolved over the specified time period.
            <br />
            Users can observe patterns, fluctuations, and trends in the intensity levels of different sectors, aiding in decision-making processes and strategic planning. This visualization helps stakeholders gain a comprehensive understanding of sector-specific dynamics and identify areas of growth or concern.
          </p>
          <Box display="flex">
            <Box display="flex" justifyContent="space-between" alignItems="center" mr="2vw">
              <FormControl variant="outlined" size="small">
                <InputLabel>Sectors</InputLabel>
                <Select
                  value={selectedSector}
                  onChange={handleSectorChange}
                  label="Sectors"
                  style={{ width: '150px' }}
                >
                  <MenuItem value="">
                    <em>All Sectors</em>
                  </MenuItem>
                  {sectorslist.map((sector, index) => (
                    <MenuItem key={index} value={sector}>{sector}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </div>
      }
    >
      <Heading as="h2" mb={4}>Line Chart</Heading>
      <Line data={chartData} options={chartOptions} />
    </ChartLayout>
  );
};

export default LineChart;
