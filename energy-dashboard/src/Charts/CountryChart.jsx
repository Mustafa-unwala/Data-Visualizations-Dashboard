import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import ChartLayout from "../Layout/layout";
import {
  Box,
  Flex,
  Heading,
  Select,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import axios from "axios";

const CountryChart = ({data}) => {
  const { colorMode } = useColorMode();
  const countryList = [...new Set(data.map(item => item.country).filter(country => country))];


  const [selectedCountry, setSelectedCountry] = useState(
    "United States of America"
  );
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const countryData = data.filter(
      (entry) => entry.country === selectedCountry
    );

    const sectors = {};
    countryData.forEach((entry) => {
      if (!sectors[entry.sector]) {
        sectors[entry.sector] = [];
      }
      sectors[entry.sector].push(entry.intensity);
    });

    const sectorLabels = Object.keys(sectors);
    const sectorIntensities = sectorLabels.map(
      (sector) => sectors[sector]
    );

    const chartBackgroundColor =
      colorMode === "light"
        ? "rgba(79, 59, 169, 0.7)"
        : "rgba(144, 104, 190, 0.7)";

    setChartData({
      labels: sectorLabels,
      datasets: [
        {
          label: "Intensity",
          data: sectorIntensities,
          backgroundColor: chartBackgroundColor,
        },
      ],
    });
  }, [selectedCountry, data, colorMode]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        grid: {
          color: colorMode === "light" ? "gray.200" : "gray.900",
        },
      },
    },
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (

    <ChartLayout
      info={
        <div>
          <h3>Country Chart</h3>
          <p>The Country Chart illustrates the distribution of data points across different countries. Each bar in the chart represents a country, with the height of the bar indicating the number of data points associated with that country. Users can compare the data distribution across countries and identify geographic trends or variations within the dataset.</p>
          <Select
          value={selectedCountry}
          onChange={handleCountryChange}
          mb={4}
          w="200px"
          colorScheme="purple"
          icon={<></>}
        >
        {countryList.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
        </Select>
        
        </div>
      }
    >
        <Box pr={6} shadow="md" m={50} height="500px" width={"90%"}>
          {chartData && <Bar data={chartData} options={chartOptions} />}
        </Box>
    </ChartLayout>
  );
};

export default CountryChart;
