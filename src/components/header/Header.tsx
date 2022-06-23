import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import s from "./styles.module.scss";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { useDispatch, useSelector } from "react-redux";
import { AppRootType } from "../../redux/redux-store";
import { Button } from "@mui/material";
import { logout } from "../../redux/AuthReducer";
import { device_id } from "../../utils/constants";
import LogoSVG from "../../assets/LogoSVG.svg";

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
        <img src={LogoSVG} alt="Logo" />
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
