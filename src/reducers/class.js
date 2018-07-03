
const initialState = {
    data: [
        {
            id: 1,
            name: "向日葵班",
            studentMaxNum: 25,
            studentsNum: 3,
            studentsInfo: [
                {
                    id: 1,
                    nickname: "可愛雞",
                    account: "jane@bonio.com.tw"
                },
                {
                    id: 2,
                    nickname: "母雞",
                    account: "jean@bonio.com.tw"
                },
                {
                    id: 3,
                    nickname: "小雞",
                    account: "lucas@bonio.com.tw"
                }
            ],
            groups: [
                {
                    id: 1,
                    name: "企鵝組",
                    total: 3,
                    students: [
                        {
                            id: 1,
                            name: "Jane"
                        },
                        {
                            id: 2,
                            name: "Jean"
                        },
                    ]
                }
            ],
            students: [
                {
                    id: 3,
                    name: "Lucas"
                },
            ]
        },
        {
            id: 2,
            name: "鬱金香班",
            studentMaxNum: 20,
            studentsNum: 1,
            studentsInfo: [
                {
                    "id": 1,
                    "nickname": "可愛雞",
                    "account": "jane@bonio.com.tw"
                }

            ],
            groups: [
                {
                    id: 2,
                    name: "旅蛙組",
                    total: 5,
                    students: [
                        {
                            id: 1,
                            name: "Jane"
                        },
                    ]
                }
            ],
            students: []
        },
        {
            id: 3,
            name: "幼幼班",
            studentMaxNum: 15,
            studentsNum: 2,
            studentsInfo: [
                {
                    id: 4,
                    nickname: "火雞",
                    account: "casey@bonio.com.tw"
                },
                {
                    id: 5,
                    nickname: "老鷹",
                    account: "neil@bonio.com.tw"
                }

            ],
            groups: [],
            students: [
                {
                    id: 4,
                    name: "Casey"
                },
                {
                    id: 5,
                    name: "Neil"
                }
            ]
        }
    ]

}





const classReducer = (state = initialState, action) => {
    switch (action.type) {
        case "STUDENTS_INFO":
            return {
                ...state, data:
                    state.data.map(data => {
                        //先看看要加入哪個班級
                        console.log(action.payload.studentsNew)
                        if (data.id === action.payload.classId) {
                            return {
                                ...data, students: [...data.students, ...action.payload.studentsNew]
                            }
                        } else return data
                    })
            }
        // 班級列表的新增與刪除
        case "ADD_CLASS":
            // console.log(action.payload)
            // console.log([...state.data, action.payload])
            return { ...state, data: [...state.data, action.payload] };

        case "DELETE_CLASS":
            //因為是要刪掉資料，所以放data
            return {
                // id是第幾筆資料的id
                ...state, data: state.data.filter(({ id }) => {
                    // console.log({ id })
                    // console.log(id !== action.id)

                    return id !== action.id
                })
            }
        case "ADD_STUDENT":
            return {
                ...state, data: state.data.map(data => {
                    if (data.id === action.payload.nowClass_ID) {
                        return { ...data, studentMaxNum: action.payload.studentMaxNum, students: [...data.students, ...action.payload.students] }
                    } else return data
                })
            }
        // data -> 資料 -> studentsInfo -> 某資料的 -> nickname

        case "EDIT_STUDENT":
            return {
                ...state, data:
                    state.data.map(data => {
                        if (data.id === action.payload.nowStudentClass_ID) {
                            return {

                                ...data, studentsInfo: data.studentsInfo.map((stu) => {
                                    if (stu.id === action.payload.studentUpdateInfoId) {
                                        // console.log('stu', stu)
                                        // console.log('action.payload.updateNickname', action.payload.updateNickname)
                                        return { ...stu, nickname: action.payload.updateNickname }
                                    } else return stu
                                }
                                )
                            }

                        } else return data
                    })
            }
        case "DELETE_STUDENT":
            return {
                ...state, data:
                    state.data.map(data => {
                        if (data.id === action.payload.nowStudentClass_ID) {

                            return {
                                ...data, studentsInfo: data.studentsInfo.filter(({ id }) => {
                                    return (id !== action.payload.studentUpdateInfoId)
                                }
                                )


                            }
                        } else return data
                    })
            }

        case "ADD_GROUP":
            return {
                ...state, data:
                    state.data.map(data => {
                        console.log(data)
                        console.log(data.id)
                        console.log(action.payload.classid)
                        if (data.id === action.payload.classid) {
                            console.log(data.id)
                            console.log(action.payload.classid)
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

                                )


                            }
                        } else return data
                    })
            }


        // 先確認點擊的班級是要的  再確認傳進來的組別是否相同，若相同，就將尚未加入組別的學生加入組別(要有學生的id,name)
        case "ADD_STUDENTS_GROUP":
            return {
                ...state, data:
                    state.data.map(data => {
                        console.log(action.payload.classId)
                        if (data.id === action.payload.classId) {

                            return {
                                ...data, groups: data.groups.map((group) => {
                                    if (group.id === action.payload.groupid) {

                                        return { ...group, students: [...group.students, action.payload.addStudentToGroupInfo] }
                                    } else return group
                                }), students: data.students.filter(({ id }) => {
                                    return id !== action.payload.id
                                }
                                )

                            }
                        } else return data

                    }
                    )
            }
        case "MOVE_STUDENTS_AWAY_GROUP":
            return {
                ...state, data:
                    state.data.map(data => {
                        if (data.id === action.payload.classId) {
                            return {
                                ...data, students: [...data.students,
                                action.payload.moveStudentAwayGroupInfo],
                                groups: data.groups.map((group) => {
                                    if (group.id === action.payload.groupId) {
                                        return {
                                            ...group, students: group.students.filter(({ id }) => {
                                                console.log(id)
                                                console.log(action.payload.id)
                                                // console.log(id !== action.payload.id)
                                                return id !== action.payload.id
                                            }
                                            )

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