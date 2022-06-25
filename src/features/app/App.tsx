import React, {useEffect} from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import {BrowserRouter, HashRouter} from "react-router-dom";

import {Preloader} from "../../components/preloader/Preloader";
import Header from "../../components/header/Header";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../redux/redux-store";
import {Routes} from "../../components/routes/Routes";
import s from './styles.module.scss';
import {getAuthData} from "../../redux/AuthReducer";

export const App = () => {
    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootType, boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(getAuthData())
    }, [])

    if (!isInitialized) {
        return <Preloader/>
    } else
        return (
            <HashRouter>

                <div className={s.appWrapper}>
                    <Header/>
                    <div className={s.inner}>
                        <Routes/>
                    </div>
                    <Sidebar/>
                </div>
            </HashRouter>
        )
}



