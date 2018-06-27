import { createStore, combineReducers } from 'redux';
import classReducer from "../reducers/class";
//要匯入reducer
// 將Reducer匯集一起
export const store = createStore(
    combineReducers({
        datas: classReducer
        // expenses: expensesReducer,
        // filters: filtersReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
