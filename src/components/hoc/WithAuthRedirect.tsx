import React from "react";
import {Redirect} from "react-router-dom";
import {AppRootType} from "../../redux/redux-store";
import {connect} from "react-redux";

// type MapStateToPropsType = {
//     isAuth: boolean
// }
// const mapStateToProps = (state: AppRootType): MapStateToPropsType => {
//     // return {
//     //     isAuth: state.auth.isAuth
//     // }
// }

export const WithAuthRedirect = (Component:any) => {

    class RedirectComponent extends React.Component<any, any> {
        render() {
            if (!this.props.isAuth) return <Redirect to={'Login'}/>
            return < Component {...this.props} />
        }
    }

    const ConnectedComponent = connect()(RedirectComponent)

    return ConnectedComponent

}