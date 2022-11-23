import React, { useState } from 'react'
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from '../../theme';
import Avatar from 'react-avatar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useSelector } from 'react-redux';
import MenuLinks from '../../menu';

const Sidebar = () => {
    const { userDetails } = useSelector(state => state.auth)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const styles = {
      sideBarHeight: {
        height: "100vh"
      },
    };
  return (
    <Box
    sx={{
      "& .pro-sidebar-inner": {
        background: `${colors.primary[400]} !important`,
      },
      "& .pro-icon-wrapper": {
        backgroundColor: "transparent !important",
      },
      "& .pro-inner-item": {
        padding: "5px 35px 5px 20px !important",
      },
      "& .pro-inner-item:hover": {
        color: "#868dfb !important",
      },
      "& .pro-menu-item.active": {
        color: "#6870fa !important",
      },
    }}
  >
    <ProSidebar style={styles.sideBarHeight} collapsed={isCollapsed}>
      <Menu iconShape="square">
        {/* LOGO AND MENU ICON */}
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          style={{
            margin: "10px 0 20px 0",
            color: colors.grey[100],
          }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="5px"
            >
              <Typography variant="h5" color={colors.grey[100]}>
                Akademik Sohbet Odası
              </Typography>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {!isCollapsed && (
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Avatar color={theme.palette.mode === "dark" ? '#555' : '#999'} className='rounded-full cursor-pointer' name={`${userDetails?.name} ${userDetails?.surname}`} size="70" />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h3"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                {`${userDetails?.name} ${userDetails?.surname}`}
              </Typography>
              <Typography variant="h5" color={colors.greenAccent[500]}>
                {userDetails?.role}
              </Typography>
            </Box>
          </Box>
        )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <MenuLinks />
          </Box>
      </Menu>
    </ProSidebar>
  </Box>
  )
}

export default Sidebar