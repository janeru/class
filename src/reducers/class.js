const initialState = {
    data: [
        {
            id: 1,
            name: "向日葵班",
            studentMaxNum: 25,
            studentsNum: 3,
            studentsId: [1, 2, 3],
            studentsInfo: {
                1: {
                    id: 1,
                    nickname: "可愛雞",
                    account: "jane@bonio.com.tw"
                },
                2: {
                    id: 2,
                    nickname: "母雞",
                    account: "jean@bonio.com.tw"
                },
                3: {
                    id: 3,
                    nickname: "小雞",
                    account: "lucas@bonio.com.tw"
                }
            }
            ,
            groups: [
                {
                    id: 1,
                    name: "企鵝組",
                    students: {
                        1: { id: 1, name: "Jane" },
                        2: { id: 2, name: "Jean" }
                    }
                }
            ],
            students: {
                3: { id: 3, name: "Lucas" }
            },
            count: 0
        },
        {
            id: 2,
            name: "鬱金香班",
            studentMaxNum: 20,
            studentsNum: 1,
            studentsId: [1],
            studentsInfo: {
                1: {
                    id: 1,
                    nickname: "可愛雞",
                    account: "jane@bonio.com.tw"
                }
            }
            ,
            groups: [
                {
                    id: 2,
                    name: "旅蛙組",
                    total: 5,
                    students: { 1: { id: 1, name: "Jane" } }
                }
            ],
            students: [],
            count: 0
        },
        {
            id: 3,
            name: "幼幼班",
            studentMaxNum: 15,
            studentsNum: 2,
            studentsId: [4, 5],
            studentsInfo: {
                4: {
                    id: 4,
                    nickname: "火雞",
                    account: "casey@bonio.com.tw"
                },
                5: {
                    id: 5,
                    nickname: "老鷹",
                    account: "neil@bonio.com.tw"
                }
            }
            ,
            groups: [],
            students:
                {
                    4: { id: 4, name: "Casey" },
                    5: { id: 5, name: "Neil" }
                },
            count: 0
        }
    ]
}

const classReducer = (state = initialState, action) => {
    switch (action.type) {

        // 班級列表的新增與刪除
        case "ADD_CLASS":
            console.log([...state.data, action.payload])
            return { ...state, data: [...state.data, action.payload] };

        case "DELETE_CLASS":
            //因為是要刪掉資料，所以放data
            return {
                // id是第幾筆資料的id
                ...state, data: state.data.filter(({ id }) => {
                    console.log(id !== action.id)
                    return id !== action.id
                })
            }
        case "STUDENTS_INFO":
            return {
                ...state, data:
                    state.data.map(data => {
                        //先看看要加入哪個班級
                        if (data.id === action.payload.classId) {
                            return {
                                ...data, count: action.payload.count + 1,
                                students: { ...data.students, ...action.payload.studentsNew },
                                studentsId: [...action.payload.studentsId]
                            }
                        } else return data
                    })
            }
        case "ADD_STUDENT":
            return {
                ...state, data: state.data.map(data => {

                    if (data.id === action.payload.nowClass_ID) {
                        return {
                            ...data, studentMaxNum: action.payload.studentMaxNum,
                            students: { ...data.students, ...action.payload.students },
                            studentsId: [...action.payload.studentsId]
                        }
                    } else return data
                })
            }


        case "EDIT_STUDENT":
            return {
                ...state, data:
                    state.data.map(data => {
                        // 跑每一個班，只要是指定要修改的學生，那麼修改了他的暱稱，所有有他在的地方的暱稱都要改掉
                        if (data.studentsInfo[action.payload.studentUpdateInfoId]) {
                            data.studentsInfo[action.payload.studentUpdateInfoId].nickname = action.payload.updateNickname
                            return { ...data, studentsInfo: { ...data.studentsInfo } }
                        } else return data
                    })
            }
        case "DELETE_STUDENT":

            return {
                ...state, data:
                    state.data.map(data => {
                        const del = action.payload.studentUpdateInfoId
                        return {
                            ...data, studentsId: data.studentsId.filter(id => {
                                return del !== id
                            }),
                            studentsInfo:
                                delete data.studentsInfo[del] ? data.studentsInfo : ('')
                            , groups: data.groups.map(group => {
                                if (group.id === action.payload.deleteStudentGroupId) {
                                    delete group.students[del]
                                    return {
                                        ...group, students: group.students
                                    }

                                } else return group
                            }),
                            students:
                                delete data.students[del] ? data.students : (''),
                            studentsNum: data.studentsNum - 1
                        }

                    })

            }


        case "ADD_GROUP":
            return {
                ...state, data:
                    state.data.map(data => {
                        if (data.id === action.payload.classId) {
                            return {
                                ...data, groups: [...data.groups, action.payload]
                            }
                        } else return data
                    })
            }
        case "DELETE_GROUP":
            return {
                ...state, data:
                    state.data.map(data => {
                        if (data.id === action.payload.classId) {
                            return {
                                ...data, groups: data.groups.filter(({ id }) => {
                                    return (id !== action.payload.id)
                                }
                                ), students: { ...data.students, ...action.payload.groupStudents }
                            }
                        } else return data
                    })
            }


        // 先確認點擊的班級是要的  再確認傳進來的組別是否相同，若相同，就將尚未加入組別的學生加入組別(要有學生的id,name)
        case "ADD_STUDENTS_GROUP":
            return {
                ...state, data:

                    state.data.map(data => {
                        const del = action.payload.id
                        if (data.id === action.payload.classId) {
                            return {
                                ...data, groups: data.groups.map((group) => {
                                    if (group.id === action.payload.groupId) {
                                        return {
                                            ...group, students: { ...group.students, ...action.payload.addStudentToGroupInfo }
                                        }
                                    } else return group
                                }
                                ), students:
                                    delete data.students[del] ? (data.students) : ('')


                            }
                        } else return data

                    }
                    )
            }
        case "MOVE_STUDENTS_AWAY_GROUP":
            return {
                ...state, data:
                    state.data.map(data => {
                        const del = action.payload.id
                        if (data.id === action.payload.classId) {
                            return {
                                ...data, students: { ...data.students, ...action.payload.moveStudentAwayGroupInfo },
                                groups: data.groups.map((group) => {
                                    if (group.id === action.payload.groupId) {
                                        return {
                                            ...group, students:
                                                delete group.students[del] ? (group.students) : ('')
                                        }
                                    } else return group
                                })
                            }
                        } else return data
                    })
            }


        default:
            return state;
    }
};

export default classReducer;