import React, {FC} from "react";
import {Button, Paper, TextField} from "@mui/material";
import s from './styles.module.scss';
import {useFormik} from "formik";
import {changeProfilePassword} from "../../../redux/ProfileReducer";
import {useDispatch} from "react-redux";
import SHA256 from "crypto-js/sha256";

interface InitialValuesType {
    newPassword: string,
    oldPassword: string,
}

interface IProps {
}

export const PasswordSettingCard: FC<IProps> = ({}) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            newPassword: '',
            oldPassword: '',
        } as InitialValuesType,
        onSubmit: values => {
            dispatch(changeProfilePassword({
                new_password_hash: SHA256(values.newPassword).toString(),
                old_password_hash: SHA256(values.oldPassword).toString()
            }))
        }
    });
    return (
        <Paper className={s.passwordCard}>
            <h5 className={s.title}>Изменить пороль</h5>
            <div className={s.inputsBlock}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.inputWrap}>
                        <h6>Старый пороль</h6>
                        <TextField
                            type={'password'}
                            name={'newPassword'}
                            className={s.input}
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            placeholder={'введите пороль'}/>
                    </div>
                    <div className={s.inputWrap}>
                        <h6>Новый пороль</h6>
                        <TextField
                            type={'password'}
                            name={'oldPassword'}
                            className={s.input}
                            value={formik.values.oldPassword}
                            onChange={formik.handleChange}
                            placeholder={'введите пороль'}/>
                    </div>
                    <div className={s.btnWrap}>
                        <Button variant={'contained'} type={'submit'}>Сохранить интересы</Button>
                    </div>
                </form>
            </div>
        </Paper>
    )
}