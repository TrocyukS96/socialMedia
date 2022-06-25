import s from "./styles.module.scss";
import { Button, TextField } from "@mui/material";
import { FormikErrors, useFormik } from "formik";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registrationTC } from "../../redux/registrationReducer";
import SHA256 from "crypto-js/sha256";

interface InitialValuesType {
  username: string;
  email: string;
  password_hash: string;
}

export const Registration = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password_hash: "",
    } as InitialValuesType,
    validate: (values: InitialValuesType) => {
      let errors: FormikErrors<InitialValuesType> = {};
      if (!values.email) {
        errors.email = "Заполните поле";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Неправильный email адрес";
      }
      if (!values.password_hash) {
        errors.password_hash = "Введите пароль";
      }
      if (!values.username) {
        errors.password_hash = "Заполните поле";
      }
      return errors;
    },
    onSubmit: (values) => {
      dispatch(
        registrationTC({
          username: values.username,
          email: values.email,
          password_hash: SHA256(values.password_hash).toString(),
        })
      );
      formik.resetForm();
    },
  });
  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <div className={s.registerBlock}>
      <div className={s.registerCard}>
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
        <h3>Регистрация</h3>
        <div className={s.formBlock}>
          <form onSubmit={formik.handleSubmit}>
            <div className={s.inputWrap}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircleIcon
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  className={s.input}
                  id="username"
                  name="username"
                  label={"Имя пользователя"}
                  variant="standard"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  style={
                    formik.errors.username ? { border: "2px solid red" } : {}
                  }
                />
                {formik.errors.username && (
                  <span style={{ color: "red", marginLeft: "5px" }}>
                    {formik.errors.username}
                  </span>
                )}
              </Box>
            </div>
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
                  style={formik.errors.email ? { border: "2px solid red" } : {}}
                />
              </Box>
              {formik.errors.email && (
                <span style={{ color: "red", marginLeft: "5px" }}>
                  {formik.errors.email}
                </span>
              )}
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
                  style={
                    formik.errors.password_hash
                      ? { border: "2px solid red" }
                      : {}
                  }
                />
                {formik.errors.password_hash && (
                  <span style={{ color: "red", marginLeft: "5px" }}>
                    {formik.errors.password_hash}
                  </span>
                )}
              </Box>
            </div>
            <div className={s.btnWrap}>
              <Button type="submit" variant={"contained"} className={s.formBtn}>
                Зарегистрироваться
              </Button>
            </div>
          </form>
          <div className={s.redirectBlock}>
            <span className={s.redirectSpan}>Уже есть аккаунт?</span>
            <NavLink to={"/login"} className={s.signBtn}>
              Войти
            </NavLink>
          </div>
          {/*<div className={s.inputItem}>*/}
          {/*    <label htmlFor="registration/password">Password</label>*/}
          {/*    <Input placeholder="Enter password..."*/}
          {/*           type="password"*/}
          {/*        // value={password}*/}
          {/*        // onChange={onChangePasswordHandler}*/}
          {/*           id={'registration/password'}*/}
          {/*           autoComplete={'new-password'}*/}
          {/*        // view="submit"*/}
          {/*        // errorMessage={errorPasswordMessage}*/}
          {/*    />*/}

          {/*</div>*/}
          {/*<div className={s.inputItem}>*/}
          {/*    <label htmlFor="registration/checkPassword">Confirm password</label>*/}
          {/*    <Input placeholder="Confirm password..."*/}
          {/*           type="password"*/}
          {/*        // value={checkPassword}*/}
          {/*        // onChange={onChangePasswordCheckHandler}*/}
          {/*           id={'registration/checkPassword'}*/}
          {/*           autoComplete={'new-password'}*/}
          {/*        // view="submit"*/}
          {/*        // errorMessage={errorPasswordMessage}*/}
          {/*    />*/}
          {/*</div>*/}
          {/*/!*{!emailValidation(email) &&*!/*/}
          {/*/!*    <div style={{color: 'red'}}>{serverErrorMessage} </div>}*!/*/}
          {/*<div className={s.buttonsBlock}>*/}
          {/*    <button className={s.cancel} onClick={goBack}>Cancel</button>*/}
          {/*    <button*/}
          {/*        type="submit"*/}
          {/*        className={s.register}*/}
          {/*        // onClick={onRegistrationHandler}*/}
          {/*        // disabled={appStatus === 'loading'}*/}
          {/*        // disabled={disabledBtnSubmit}*/}
          {/*    >*/}
          {/*        Register*/}
          {/*    </button>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};
