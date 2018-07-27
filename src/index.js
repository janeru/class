import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import { createStore, applyMiddleware } from 'redux';
import Class from "./components/Class";

const createStoreWithMiddleware = applyMiddleware()(createStore)
const jsx = (
    <Provider store={createStoreWithMiddleware(store)}>
        <Class />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));

