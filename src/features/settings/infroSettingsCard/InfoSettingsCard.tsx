import React, { FC, useState } from "react";
import { Button, Paper, TextField } from "@mui/material";
import s from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../redux/ProfileReducer";
import { useFormik } from "formik";

interface InitialValuesType {
  first_name: string;
  last_name: string;
}

interface IProps {
  firstName: string;
  lastName: string;
}

export const InfoSettingsCard: FC<IProps> = ({ lastName, firstName }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      first_name: firstName,
      last_name: lastName,
    } as InitialValuesType,
    onSubmit: (values) => {
      dispatch(
        updateProfile({
          first_name: values.first_name,
          last_name: values.last_name,
        })
      );
    },
  });
  return (
    <Paper className={s.infoCard}>
      <h5 className={s.title}>Личная информация</h5>
      <div className={s.inputsBlock}>
        <form onSubmit={formik.handleSubmit}>
          <div className={s.inputWrap}>
            <h6>Имя</h6>
            <TextField
              type={"text"}
              value={formik.values.first_name}
              className={s.input}
              name={"first_name"}
              onChange={formik.handleChange}
              placeholder={"введите текст"}
            />
          </div>
          <div className={s.inputWrap}>
            <h6>Фамилия</h6>
            <TextField
              type={"text"}
              name={"last_name"}
              value={formik.values.last_name}
              className={s.input}
              onChange={formik.handleChange}
              placeholder={"введите текст"}
            />
          </div>
          <div className={s.btnWrap}>
            <Button variant={"contained"} className={s.applyButton} type={"submit"}>
              Изменить данные
            </Button>
          </div>
        </form>
      </div>
    </Paper>
  );
};
