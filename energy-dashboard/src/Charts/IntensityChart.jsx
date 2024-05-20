import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import ChartLayout from '../Layout/layout';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Heading } from '@chakra-ui/react';

const IntensityChart = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState('');
  
  const filteredData = data.filter(item => item.sector);

  const uniqueYears = [...new Set(filteredData.map(item => item.start_year))].filter(year => year);

  useEffect(() => {
    if (filteredData.length === 0) return;

    const intensityByYearAndSector = filteredData.reduce((acc, item) => {
      const year = item.start_year;
      const sector = item.sector;
      if (!acc[year]) {
        acc[year] = {};
      }
      if (!acc[year][sector]) {
        acc[year][sector] = 0;
      }
      acc[year][sector] += item.intensity;
      return acc;
    }, {});

    const years = Object.keys(intensityByYearAndSector).sort();

    const datasets = Object.entries(intensityByYearAndSector).map(([year, sectorIntensity]) => {
      const sectors = Object.keys(sectorIntensity);
      const intensities = Object.values(sectorIntensity);
      const backgroundColors = sectors.map((_, index) => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`);
      return {
        label: year,
        data: intensities,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      };
    });

    const chartInstance = new Chart('intensityChart', {
      type: 'bar',
      data: {
        labels: Object.keys(intensityByYearAndSector[years[0]]),
        datasets: selectedYear ? datasets.filter(dataset => dataset.label === selectedYear) : datasets,
      },
      options: {
        indexAxis: 'y',
        plugins: {
          tooltip: {
            callbacks: {
              label: context => {
                const sector = context.dataset.label;
                const intensity = context.parsed;
                return `${sector}: ${intensity}%`;
              },
            },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [filteredData, selectedYear]);

  return (
    <ChartLayout
      info={
        <div>
          <h3>Chart Information</h3>
          <p>
            The Intensity Chart displays the intensity levels of various data points over time. Each bar in the chart represents a different data point, with the x-axis indicating the time period and the y-axis representing the intensity level. The color of each bar indicates the sector to which the data point belongs. Users can observe how the intensity of different sectors fluctuates over time, aiding in the analysis of sector-specific trends and patterns.
          </p>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <FormControl variant="outlined" size="small">
              <InputLabel>Start Year</InputLabel>
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                label="Start Year"
                style={{ width: '150px' }}
              >
                <MenuItem value="">
                  <em>All Years</em>
                </MenuItem>
                {uniqueYears.map((year, index) => (
                  <MenuItem key={index} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
      }
    >
      <Heading as="h2" mb={4}>Intensity Chart</Heading>
      <canvas id="intensityChart" />
    </ChartLayout>
  );
};

export default IntensityChart;
