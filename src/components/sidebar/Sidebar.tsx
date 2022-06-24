import React from "react";
import s from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import SettingsIcon from "@mui/icons-material/Settings";
import ChatIcon from '@mui/icons-material/Chat';
const Sidebar = () => {
  return (
    <nav className={s.sidebar}>
      <ul className={s.sidebarList}>
        <li className={s.sidebarItem}>
          <NavLink activeClassName={s.activeLink} to="/profile">
            <AccountCircleIcon
              className={s.logoIcon}
              fontSize={"large"}
            />
          </NavLink>{" "}
        </li>
        <li className={s.sidebarItem}>
          <NavLink
            className={s.sidebarLink}
            activeClassName={s.activeLink}
            to="/posts"
          >
            <MarkAsUnreadIcon
              className={s.logoIcon}
              fontSize={"large"}
            />
          </NavLink>{" "}
        </li>
        <li className={s.sidebarItem}>
          <NavLink
            className={s.sidebarLink}
            activeClassName={s.activeLink}
            to="/channels"
          >
            <ChatIcon
              className={s.logoIcon}
              fontSize={"large"}
            />
          </NavLink>{" "}
        </li>
        <li className={s.sidebarItem}>
          <NavLink
            className={s.sidebarLink}
            activeClassName={s.activeLink}
            to="/settings"
          >
            <SettingsIcon
              className={s.logoIcon}
              fontSize={"large"}
            />
          </NavLink>{" "}
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
