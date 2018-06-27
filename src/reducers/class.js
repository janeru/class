const initialState = {
    "data": [
        {
            "id": 1,
            "name": "向日葵班",
            "studentMaxNum": 25,
            "studentsNum": 3
        },
        {
            "id": 2,
            "name": "鬱金香班",
            "studentMaxNum": 20,
            "studentsNum": 1
        },
        {
            "id": 3,
            "name": "康乃馨班",
            "studentMaxNum": 15,
            "studentsNum": 2
        }
    ]
}
const classReducer = (state = initialState, action) => {

    switch (action.type) {
        // 班級列表的新增與刪除
        case "ADD_CLASS":
            // console.log(action.payload)
            // console.log([...state.data, action.payload])
            return { ...state, data: [...state.data, action.payload] };

        case "DELETE_CLASS":
            //因為是要刪掉資料，所以放data
            return {
                ...state, data: state.data.filter(({ id }) => {
                    // console.log(id !== action.id)
                    return id !== action.id
                })
            }

        default:
            return state;
    }
};

export default classReducer;