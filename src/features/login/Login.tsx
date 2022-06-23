import React, { useEffect } from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SHA256 from "crypto-js/sha256";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import s from "./styles.module.scss";
import { login } from "../../redux/AuthReducer";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { AppRootType } from "../../redux/redux-store";
import { device_id } from "../../utils/constants";

interface InitialValuesType {
  email: string;
  password_hash: string;
}

export const Login: React.FC<any> = (props) => {
  //hooks
  const isAuth = useSelector<AppRootType, boolean>((state) => state.app.isAuth);
  const isLoggedIn = useSelector<AppRootType, boolean>(
    (state) => state.auth.isLoggedIn
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "test1@test.com",
      password_hash: "123456",
    } as InitialValuesType,
    onSubmit: (values) => {
      dispatch(
        login({
          email: values.email,
          password_hash: SHA256(values.password_hash).toString(),
          device_id: device_id,
        })
      );
      formik.resetForm();
    },
  });

  if (isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className={s.loginBlock}>
      <div className={s.inner}>
        <div>
          <svg
            width="177"
            height="201"
            viewBox="0 0 177 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 150.354V49.8543L84.7606 0L177 49.8543V150.354L84.7606 201L0 150.354Z"
              fill="#002DE3"
            />
            <path
              d="M108.516 50.7063C102.36 71.7391 84.5758 71.4398 76.4534 68.6611C73.3754 89.1809 78.5909 104.143 81.5833 109.059C102.103 96.7475 108.088 65.0274 108.516 50.7063Z"
              fill="white"
            />
            <path
              d="M98.8959 109.059C100.948 133.683 92.056 153.946 87.3535 161C120.698 153.305 135.447 107.777 138.653 85.9746C130.445 111.111 108.728 111.838 98.8959 109.059Z"
              fill="white"
            />
            <path
              d="M65.4986 86.5649C50.0012 87.508 36.8682 76.0525 32.2388 70.2069C37.825 106.75 60.4558 130.895 71.0729 138.4C62.6662 127.501 63.8539 99.3018 65.4986 86.5649Z"
              fill="white"
            />
            <circle
              cx="50.6121"
              cy="67.2632"
              r="5.77119"
              transform="rotate(-11.0772 50.6121 67.2632)"
              fill="white"
            />
            <circle cx="89.278" cy="53.2712" r="5.77119" fill="white" />
            <circle cx="118.775" cy="94.3106" r="5.77119" fill="white" />
          </svg>
        </div>
        <div className={s.textBlock}>
          <p className={s.Title}>Social Community App</p>
          <p className={s.Text}>Events are in one place</p>
        </div>
        <h3>Вход в аккаунт</h3>
        <form onSubmit={formik.handleSubmit} className={s.form}>
          <div className={s.inputWrap}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AlternateEmailIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                className={s.input}
                id="email"
                name="email"
                label={"Почта"}
                variant="standard"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Box>
          </div>
          <div className={s.inputWrap}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                className={s.input}
                id="password_hash"
                name="password_hash"
                label={"Пароль"}
                variant="standard"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password_hash}
              />
            </Box>
          </div>
          <div className={s.btnWrap}>
            <Button type="submit" variant={"contained"} className={s.formBtn}>
              Войти
            </Button>
          </div>
        </form>
        <div className={s.redirectBlock}>
          <span className={s.redirectSpan}>Нет аккаунта?</span>
          <NavLink to={"/registration"} className={s.signBtn}>
            Зарегистрироваться
          </NavLink>
        </div>
      </div>
    </div>
  );
};
