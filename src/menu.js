import React, { useState } from 'react'
import { MenuItem } from 'react-pro-sidebar';
import { Typography, useTheme } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import { Link, useNavigate } from "react-router-dom";
import { tokens } from './theme';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { axiosPrivate } from './api/axios';
import { useDispatch } from "react-redux";
import { login, setUser } from './store/auth';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === to}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(to)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const MenuLinks = () => {
  const location = useLocation();
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(location.pathname);
  const dispatch = useDispatch();
  let menu;

  const Logout = async (e) => {
    e.preventDefault()
    await axiosPrivate.post("/auth/logout", "", {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })

    dispatch(login())
    dispatch(setUser())

    navigate("/auth/giris")
  }

  menu = (
    <>
      {user?.role.includes("Admin") ? <>
        <Item
          title="AnaSayfa"
          to="/admin"
          icon={<HomeOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Kullanıcılar"
          to="/admin/users"
          icon={<PeopleIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Kategoriler"
          to="/admin/categories"
          icon={<CalendarViewMonthIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Projeler"
          to="/admin/projects"
          icon={<EventIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <button
          onClick={Logout}
        >
          <Item
            title="Çıkış Yap"
            icon={<LogoutOutlined />}
            selected={selected}
            setSelected={setSelected}
          />
        </button>

      </> : ''}

      {user?.role.includes("Egitimci") ? <>
        <Item
          title="AnaSayfa"
          to="/"
          icon={<HomeOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Eğitimci Paneli"
          to="/egitimci"
          icon={<HomeOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <button
          onClick={Logout}
        >
          <Item
            title="Çıkış Yap"
            icon={<LogoutOutlined />}
            selected={selected}
            setSelected={setSelected}
          />
        </button>
      </> : ''}

      {user?.role.includes("Ogrenci") ? <>
        <button
          onClick={Logout}
        >
          <Item
            title="Çıkış Yap"
            icon={<LogoutOutlined />}
            selected={selected}
            setSelected={setSelected}
          />
        </button>
      </> : ''}
    </>
  )

  return menu
}

export default MenuLinks