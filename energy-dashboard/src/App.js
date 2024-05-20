import { useState, useEffect } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import { ColorModeContext, tokens, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import LineChart from './Charts/LineChart';
import TopicsChart from './Charts/TopicChart';
import IntensityChart from './Charts/IntensityChart';
import CountryChart from './Charts/CountryChart';
import PieChart from './Charts/SectorChart';
import RegionChart from './Charts/RegionChart';
import { Box, Flex } from '@chakra-ui/react';
import RelevanceChart from './Charts/Relevance';
import LikelihoodChart from './Charts/LikeliHoodChart';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [numDocuments, setNumDocuments] = useState(50); 
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const colors= tokens(theme.palette.colors);

  useEffect(() => {
    axios.get('http://localhost:5000/assignment1')
      .then(response => {
        const fetchedData = response.data;
        setData(fetchedData);
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, []);

  const slicedData = data.slice(0, numDocuments);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SideBar isSidebar={isSidebar} />
          <main className="content" style={{ paddingTop: '10vh' }}>
            <TopBar setIsSidebar={setIsSidebar} numDocuments={numDocuments} setNumDocuments={setNumDocuments} />
            <LineChart data={slicedData} />
            <IntensityChart data={slicedData} />
            <TopicsChart data={slicedData} />
            <CountryChart data={slicedData} />
            <Flex direction={{ base: "column", md: "row" }} m={50}>
              <Box
                flex={{ base: "1", md: "0.5" }}
                width="50%"
                p={5}
                m={2}
                boxShadow={`0 0 10px ${colors.grey[900]}`}
                borderRadius={20}
              >
                <PieChart data={slicedData} />
              </Box>
              <Box
                flex={{ base: "1", md: "0.5" }}
                width="50%"
                p={5}
                m={2}
                boxShadow={`0 0 10px ${colors.grey[900]}`}
                borderRadius={20}
              >
                <RegionChart data={slicedData} />
              </Box>
            </Flex>
            <RelevanceChart data={slicedData} />
            <LikelihoodChart data={slicedData} />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
