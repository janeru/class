//新增後的學生資料
const initialState = {
    students: []
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_STUDENTS:
            return { ...state, students: [...state.students, action.payload] }
        default:
            return state

    }

};
export default rootReducer;