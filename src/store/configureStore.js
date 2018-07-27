import { combineReducers } from 'redux';
import classDatas from "../reducers/class";
//要匯入reducer
// 將Reducer匯集一起
export const store =
    combineReducers({ classDatas })

