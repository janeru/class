// 新增班級列表
import uuid from 'uuid';

export const addClass = ({ name = '', studentMaxNum = 0 } = {}) =>
    ({
        type: "ADD_CLASS",
        payload: {
            id: uuid(),
            name,
            studentMaxNum,
        }
    });

// 刪除班級列表
export const deleteClass = ({ id } = {}) => ({
    type: "DELETE_CLASS",
    //component所傳入的要刪除的id
    id
});