import s from './styles.module.scss';
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import React from "react";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registrationTC} from "../../redux/registrationReducer";

interface InitialValuesType {
    username: string,
    email: string,
    password_hash: string,
}

export const Registration = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password_hash: '',
        } as InitialValuesType,
        onSubmit: values => {
            dispatch(registrationTC(values))
            formik.resetForm()
        },
    });
    const goBack = () => {
        window.history.go(-1);
    }
    return (
        <div className={s.registerBlock}>
            <div className={s.registerCard}>
                <h3>Регистрация</h3>
                <div className={s.formBlock}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={s.inputWrap}>
                            <TextField
                                className={s.input}
                                label={'Имя'}
                                id="username"
                                name="username"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                            />
                        </div>
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
                            <Button type="submit" variant={'contained'} className={s.formBtn}>Зарегистрироваться</Button>
                        </div>



                    </form>
                    <div className={s.redirectBlock}>
                        <span className={s.redirectSpan}>Уже есть аккаунт?</span>
                        <NavLink to={'/login'} className={s.signBtn}>Войти</NavLink>
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
    )
}