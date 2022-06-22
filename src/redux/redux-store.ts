import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import {profileReducer} from "./ProfileReducer";
import {authReducer} from "./AuthReducer";
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import {appReducer} from "./appReducer";
import {registrationReducer} from "./registrationReducer";
import {postsReducer} from "./PostsReducer";

let reducers = combineReducers({    //special function to combine reducers
    profilePage:profileReducer,          // create an obj, with property profileReducer and value profileReducer
    postsReducer:postsReducer,          // create an obj, with property profileReducer and value profileReducer
    auth:authReducer,
    registration:registrationReducer,
    app:appReducer,
    form: formReducer
});

export type AppRootType = ReturnType<typeof reducers>
let store: Store = createStore(reducers, applyMiddleware(thunk));


type PropertiesTypes<T> = T extends {[key:string]:infer U} ? U : never
export type InferActionsTypes<T extends {[key:string]: (...args:any[])=>any}> = ReturnType<PropertiesTypes<T>>
export default store;

