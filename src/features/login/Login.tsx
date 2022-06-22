import React, {useEffect} from "react";
import {NavLink, Redirect, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import SHA256 from 'crypto-js/sha256';

import s from './styles.module.scss';
import {login} from "../../redux/AuthReducer";
import {useFormik} from "formik";
import {Button, TextField} from "@mui/material";
import {AppRootType} from "../../redux/redux-store";
import {device_id} from "../../utils/constants";

interface InitialValuesType {
    email: string,
    password_hash: string,
}

export const Login: React.FC<any> = (props) => {
    //hooks
    const isAuth = useSelector<AppRootType, boolean>(state => state.app.isAuth);
    const isLoggedIn = useSelector<AppRootType, boolean>(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const history = useHistory()
    const formik = useFormik({
        initialValues: {
            email: 'test1@test.com',
            password_hash: '123456',
        } as InitialValuesType,
        onSubmit: values => {
            dispatch(login({email:values.email,password_hash:SHA256(values.password_hash).toString(),device_id:device_id}))
            formik.resetForm()
        },
    });

    if (isAuth ) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={s.loginBlock}>
            <div className={s.inner}>
                <h3>Логин</h3>
                <form onSubmit={formik.handleSubmit} className={s.form}>
                    <div className={s.inputWrap}>
                        <TextField
                            className={s.input}
                            label={'Почта'}
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>
                    <div className={s.inputWrap}>
                        <TextField
                            className={s.input}
                            label={'Пороль'}
                            id="password_hash"
                            name="password_hash"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password_hash}
                        />
                    </div>
                    <div className={s.btnWrap}>
                        <Button type="submit" variant={'contained'} className={s.formBtn}>Войти</Button>
                    </div>



                </form>
                <div className={s.recoveryBlock}>
                    <NavLink to={'/passwordRecovery'} className={s.link}>Восстановить пороль</NavLink>
                </div>
                <div className={s.redirectBlock}>
                    <span className={s.redirectSpan}>Нет аккаунта?</span>
                    <NavLink to={'/registration'} className={s.signBtn}>Зарегестироваться</NavLink>
                </div>
            </div>
        </div>
    )
}

