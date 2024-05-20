import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useColorModeValue, Heading } from "@chakra-ui/react";
import ChartLayout from "../Layout/layout";

const LikelihoodChart = ({ data }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const countryList = [...new Set(data.map(item => item.country).filter(country => country))];


  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const filteredData = selectedCountry
    ? data.filter(item => item.country === selectedCountry)
    : data;

  const chartData = {
    labels: filteredData.map((entry) => entry.country),
    datasets: [
      {
        label: "Likelihood",
        data: filteredData.map((entry) => entry.likelihood),
        backgroundColor: useColorModeValue(
          "rgba(79, 59, 169, 0.7)",
          "rgba(144, 104, 190, 0.7)"
        ),
        borderColor: useColorModeValue(
          "rgba(79, 59, 169, 1)",
          "rgba(144, 104, 190, 1)"
        ),
        borderWidth: 2,
        pointBackgroundColor: useColorModeValue("white", "black"),
        pointBorderColor: useColorModeValue(
          "rgba(79, 59, 169, 1)",
          "rgba(144, 104, 190, 1)"
        ),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 5,
        stepSize: 1,
      },
    },
  };

  return (
    <ChartLayout
      info={
        <div>
          <h3>Likelihood Chart</h3>
          <p>The Likelihood Chart illustrates the likelihood scores assigned to different data points within a dataset. Each segment in the chart represents a data point, with the size or color of the segment indicating the likelihood score. Users can evaluate the probability or likelihood of various outcomes associated with the data points, aiding in decision-making and risk assessment processes.</p>
          <Box display="flex">
            <Box display="flex" justifyContent="space-between" alignItems="center" mr="2vw">
              <FormControl variant="outlined" size="small">
                <InputLabel>Countries</InputLabel>
                <Select
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  label="Countries"
                  style={{ width: '150px' }}
                >
                  <MenuItem value="">
                    <em>All Countries</em>
                  </MenuItem>
                  {countryList.map((country, index) => (
                    <MenuItem key={index} value={country}>{country}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </div>
      }
    >
      <Box pt={6} pb={60} maxHeight="70vh">
        <Heading as="h2" mb={4} ml={6}>
          Likelihood Chart
        </Heading>
        <Radar data={chartData} options={chartOptions} />
      </Box>
    </ChartLayout>
  );
};

export default LikelihoodChart;
