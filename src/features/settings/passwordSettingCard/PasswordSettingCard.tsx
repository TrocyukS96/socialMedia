import React, { FC } from "react";
import { Button, Paper, TextField } from "@mui/material";
import s from "./styles.module.scss";
import {FormikErrors, useFormik} from "formik";
import { changeProfilePassword } from "../../../redux/ProfileReducer";
import { useDispatch } from "react-redux";
import SHA256 from "crypto-js/sha256";

interface InitialValuesType {
  newPassword: string;
  oldPassword: string;
}

interface IProps {}

export const PasswordSettingCard: FC<IProps> = ({}) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      oldPassword: "",
    } as InitialValuesType,
    validate: (values: InitialValuesType) => {
      let errors: FormikErrors<InitialValuesType> = {};
      if (!values.newPassword) {
        errors.newPassword = 'Заполните поле';
      }
      if (!values.oldPassword) {
        errors.oldPassword = 'Заполните поле';
      }

      return errors;
    },
    onSubmit: (values) => {
      dispatch(
        changeProfilePassword({
          new_password_hash: SHA256(values.newPassword).toString(),
          old_password_hash: SHA256(values.oldPassword).toString(),
        })
      );
    },
  });
  return (
    <Paper className={s.passwordCard}>
      <h5 className={s.title}>Изменить пароль</h5>
      <div className={s.inputsBlock}>
        <form onSubmit={formik.handleSubmit}>
          <div className={s.inputWrap}>
            <h6>Старый пароль</h6>
            <TextField
              type={"password"}
              name={"newPassword"}
              className={s.input}
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              placeholder={"введите пароль"}
              style={formik.errors.newPassword ? {border:'2px solid red'} : {}}
            />
            {formik.errors.newPassword && <span style={{color:'red'}}>{formik.errors.newPassword}</span>}

          </div>
          <div className={s.inputWrap}>
            <h6>Новый пароль</h6>
            <TextField
              type={"password"}
              name={"oldPassword"}
              className={s.input}
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              placeholder={"введите пароль"}
              style={formik.errors.oldPassword ? {border:'2px solid red'} : {}}
            />
            {formik.errors.oldPassword && <span style={{color:'red'}}>{formik.errors.oldPassword}</span>}

          </div>
          <div className={s.btnWrap}>
            <Button
              variant={"contained"}
              className={s.applyButton}
              type={"submit"}
            >
              Изменить пароль
            </Button>
          </div>
        </form>
      </div>
    </Paper>
  );
};
