import React, { useContext, useState } from 'react'
import { ColorModeContext, tokens } from '../../theme';
import { Box, IconButton, useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import { useDispatch } from "react-redux";
import { login, setUser, setFirebaseUser } from '../../store/auth';
import { axiosPrivate } from '../../api/axios';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { logout } from '../../utils/firebaseConfig';

const Topbar = () => {
    const { userDetails } = useSelector(state => state.auth); 
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const LogoutUser = async (e) => {
        e.preventDefault()
        await axiosPrivate.post("/auth/logout", "", {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
        await logout()
        
        dispatch(login())
        dispatch(setUser())
        dispatch(setFirebaseUser())

        navigate("/auth/login")
    }

    return (
        <Box display="flex" justifyContent="end" pt={2} pl={2} pr={2} mr={1}>
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <LightModeOutlinedIcon />
                    ) : (
                        <DarkModeOutlinedIcon />
                    )}
                </IconButton>

                    
                <IconButton
                    onClick={handleClick}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Typography>{`${userDetails?.name} ${userDetails?.surname}`}</Typography>
                    <PersonOutlinedIcon />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                > 
                    <Link to="/profile">
                        <MenuItem>  
                         <Avatar /> Profil
                        </MenuItem>
                    </Link>
                    <Divider />
                    <Link to="/settings">
                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Ayarlar
                        </MenuItem>
                    </Link>
                    <MenuItem onClick={LogoutUser}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Çıkış Yap
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    )
}

export default Topbar