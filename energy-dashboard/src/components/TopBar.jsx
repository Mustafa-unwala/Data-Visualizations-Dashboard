import { Box, IconButton, useTheme,Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const TopBar = ({ numDocuments, setNumDocuments }) => {
  const handleNumDocumentsChange = (event) => {
    setNumDocuments(Number(event.target.value));
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" 
    justifyContent="space-between" 
    alignItems="center" 
    p={2} 
    sx={{
      position: 'fixed',
      top: 0,
      left: "5vw",
      right: 0,
      zIndex: 1100,
      backgroundColor: colors.primary[400],
    }}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor="white"
        borderRadius="30px"
      >
        <InputBase sx={{ ml: 2, flex: 1}} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 , pr:1}}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
      <Box display="flex" justifyContent="space-between" alignItems="center" mr="2vw">
      <FormControl variant="outlined" size="small" >
        <InputLabel>Number of Documents</InputLabel>
        <Select
          value={numDocuments}
          onChange={handleNumDocumentsChange}
          label="Number of Documents"
          style={{ width: '150px' }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={200}>200</MenuItem>
          <MenuItem value={500}>500</MenuItem>
          <MenuItem value={1000}>All</MenuItem>
        </Select>
      </FormControl>
    </Box>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;