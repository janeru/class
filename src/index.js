import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../src/registerServiceWorker';
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import App from "./components/App";

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
