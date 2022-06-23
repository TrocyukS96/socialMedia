import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import s from "./styles.module.scss";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { useDispatch, useSelector } from "react-redux";
import { AppRootType } from "../../redux/redux-store";
import { Button } from "@mui/material";
import { logout } from "../../redux/AuthReducer";
import { device_id } from "../../utils/constants";

function Header() {
  const isAuth = useSelector<AppRootType, boolean>((state) => state.app.isAuth);
  const history = useHistory();
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logout({ device_id: device_id }));
    history.push("/login");
  };
  return (
    <header className={s.header}>
      <div
        onClick={() => {
          history.push("/profile");
        }}
        className={s.logo}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 40 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28.8503 1.39767C26.5897 8.19932 20.0589 8.10254 17.0761 7.20395C15.9458 13.8397 17.8611 18.6783 18.96 20.2681C26.4955 16.2866 28.6934 6.02887 28.8503 1.39767Z"
            fill="white"
          />
          <path
            d="M25.3177 20.268C26.0713 28.2309 22.8059 34.7837 21.079 37.0648C33.3242 34.5764 38.7403 19.8533 39.9178 12.8028C36.9036 20.9316 28.9285 21.1666 25.3177 20.268Z"
            fill="white"
          />
          <path
            d="M13.0531 12.9937C7.36196 13.2987 2.5391 9.59415 0.839054 7.70376C2.89048 19.5212 11.2012 27.3294 15.1002 29.7564C12.0129 26.2316 12.4491 17.1126 13.0531 12.9937Z"
            fill="white"
          />
          <ellipse
            rx="2.11056"
            ry="1.87625"
            transform="matrix(0.985462 -0.169896 0.217026 0.976166 7.58626 6.75186)"
            fill="white"
          />
          <ellipse
            cx="21.7857"
            cy="2.22724"
            rx="2.11936"
            ry="1.8663"
            fill="white"
          />
          <ellipse
            cx="32.618"
            cy="15.4987"
            rx="2.11936"
            ry="1.8663"
            fill="white"
          />
        </svg>

        <span className={s.logoText}>Wires</span>
      </div>

      <div className={s.headerLogin}>
        {isAuth ? (
          <div>
            <Button
              variant={"outlined"}
              onClick={logOutHandler}
              className={s.loginBtn}
            >
              Выйти
            </Button>
          </div>
        ) : (
          <NavLink to={"/login"}>Вход</NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
