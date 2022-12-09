import React, { useState } from 'react'
import { MenuItem } from 'react-pro-sidebar';
import { Typography, useTheme } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TagIcon from '@mui/icons-material/Tag';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { tokens } from './theme';
import { useSelector } from 'react-redux';

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
  const [selected, setSelected] = useState(location.pathname);
  let menu;

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

      </> : ''}

      {user?.role.includes("Egitimci") ? <>
        <Item
          title="Eğitimci Paneli"
          to="/egitimci"
          icon={<HomeOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
            title="Soru Cevap"
            to="/soru-cevap"
            icon={<QuestionAnswerIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        <Item
          title="Taglar"
          to="/tags"
          icon={<TagIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item 
            title="Projeler"
            to="/projects"
            icon={<EventIcon />}
            selected={selected}
            setSelected={setSelected}
        />
        <Item
          title="Kategoriler"
          to="/categories"
          icon={<CalendarViewMonthIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </> : ''}

      {user?.role.includes("Ogrenci") ? <>
        <Item
            title="AnaSayfa"
            to="/"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Soru Cevap"
            to="/soru-cevap"
            icon={<QuestionAnswerIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
          title="Taglar"
          to="/tags"
          icon={<TagIcon />}
          selected={selected}
          setSelected={setSelected}
        />
          <Item 
            title="Projeler"
            to="/projects"
            icon={<EventIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
          title="Kategoriler"
          to="/categories"
          icon={<CalendarViewMonthIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </> : ''}
    </>
  )

  return menu
}

export default MenuLinks