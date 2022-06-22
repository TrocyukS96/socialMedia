import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom";
import React from "react";
import store from './redux/redux-store';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {App} from "./features/app/App";
reportWebVitals();


ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
    </BrowserRouter>,
    document.getElementById('root')
)





