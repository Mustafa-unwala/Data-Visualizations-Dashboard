import React from 'react';
import {Box} from '@mui/material';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';

const ChartLayout = ({ children, info }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.colors)
  return (
    <Box display= "flex"
    overflow="hidden"
    justifyContent="center"
    flexDirection={{ xs: 'column', md: 'row' }}
    flex={{ base: "1", md: "0.5" }}
          p={5}
          boxShadow={`0 0 10px ${colors.grey[900]}`}
          borderRadius={20}
    >
      <Box flex={{ xs: '1 1 auto', md: '0 0 75%' }}
        bgcolor={colors.chartbg[100]}
        width={{ xs: '100%', md: '50vw' }}
        p={2}
        borderRadius={20}
        mb={{ xs: 2, md: 0 }}>
        {children}
      </Box>
      <Box flex={{ xs: '1 1 auto', md: '0 0 25%' }}
        p={2}>
        {info}
      </Box>
    </Box>
  );
};

export default ChartLayout;
