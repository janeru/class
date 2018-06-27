import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import AppRouter from '../src/react-router/router'
import registerServiceWorker from '../src/registerServiceWorker';
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import { render } from "react-dom";
// import App from "./components/App";


// render(
//     <Provider store={store}>
//         <AppRouter />
//     </Provider>,
//     document.getElementById("app")
// );
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));


// ReactDOM.render(<AppRouter />, document.getElementById('root'));
registerServiceWorker();
