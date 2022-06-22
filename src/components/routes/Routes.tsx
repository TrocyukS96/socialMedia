import {Redirect, Route} from "react-router-dom";
import {WithSuspense} from "../hoc/WithSuspense";
import Profile from "../../features/profile/Profile";
import {Login} from "../../features/login/Login";
import {Registration} from "../../features/registration/Registration";
import React from "react";
import {Posts} from "../../features/posts/Posts";
import {Settings} from "../../features/settings/Settings";

export const Routes = () => {
    return (
        <>
            <Route path={"/profile/:userId?"}
                   render={WithSuspense(
                       Profile)}/>
            <Route path={"/posts"}
                   render={WithSuspense(Posts)}/>
            <Route path={"/login"}
                   render={() => <Login/>}/>
            <Route path={"/registration"}
                   render={() => <Registration/>}/>
            <Route path={"/settings"}
                   render={() => <Settings/>}/>
            <Redirect from='/' to='/Profile'/>
        </>
    )
}