import React from 'react';
import './app/index.css';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';
import AppWithRedux from "./app/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./app/store";
import {BrowserRouter} from "react-router-dom";

const container  = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <AppWithRedux />
        </BrowserRouter>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

