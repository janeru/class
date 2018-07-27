// 新增班級列表
import uuid from 'uuid';

export const addClass = ({
    id, name = '', studentMaxNum = 0, studentsNum = 0,
    groups = [], students = [], count = 0 } = {}) =>
    ({
        type: "ADD_CLASS",
        payload: {
            id: uuid(),
            name,
            studentMaxNum,
            groups,
            students,
            studentsNum,
            count
        }
    });

// 刪除班級列表
export const deleteClass = ({ id } = {}) => ({
    type: "DELETE_CLASS",
    //component所傳入的要刪除的id
    id
});
// 將空座位及未分組的學生放入students資訊裡面
export const studentsInfor = ({ classId, studentsNewInfo, studentsId, count = 0 } = {}) =>
    ({
        type: "STUDENTS_INFO",
        payload: {
            studentsNew: studentsNewInfo,
            classId,
            studentsId,
            count
        }
    }
    )
// 新增學生人數
export const addStudents = ({ nowClass_ID, studentMaxNumber, obj, studentsId } = {}) =>
    ({

        type: "ADD_STUDENT",
        payload: {
            nowClass_ID,
            studentMaxNum: studentMaxNumber,
            //每個學生自己的id
            students: obj,
            studentsId
        }
    });
// 修改學生暱稱
export const editStudents = ({ nowStudentClass_ID, studentUpdateInfoId, updateNickname, editStudentGroupId } = {}) =>
    ({
        type: "EDIT_STUDENT",
        payload: {
            nowStudentClass_ID,
            studentUpdateInfoId,
            updateNickname,
            editStudentGroupId,
        }
    }
    )
// 刪除學生暱稱
export const deleteStudents = ({ nowStudentClass_ID, studentUpdateInfoId, deleteStudentGroupId } = {}) =>
    ({
        type: "DELETE_STUDENT",
        payload: {
            nowStudentClass_ID,
            studentUpdateInfoId,
            deleteStudentGroupId
        }
    }
    )

// 新增小組名稱 (需要比對班級後，再將新增的名字加入)
export const addGroups = ({ groupName, classId, students, id } = {}) =>

    (
        {

            type: "ADD_GROUP",
            payload: {
                name: groupName,
                classId: classId,
                students: {},
                id: uuid(),
            }
        }
    )
// 刪除小組 (需要比對要刪除的班級id及班級內要刪除的小組的id，以及要將留在小組的學生們的id及name移出去)
export const deleteGroups = ({ classId, id, groupStudents } = {}) =>
    ({
        type: "DELETE_GROUP",
        payload: {
            classId,
            id,
            groupStudents

        }
    }
    )


// 移動學生加入小組
export const addStudentstoGroup = ({ classId, groupId, addStudentToGroupInfo, id } = {}) =>
    ({
        type: "ADD_STUDENTS_GROUP",
        payload: {
            classId,
            groupId,
            addStudentToGroupInfo,
            id

        }

    }
    )

// 將學生移出小組
export const moveStudentsawayGroup = ({ moveStudentAwayGroupInfo, classId, groupId, id } = {}) =>
    ({
        type: "MOVE_STUDENTS_AWAY_GROUP",
        payload: {
            moveStudentAwayGroupInfo: moveStudentAwayGroupInfo,
            classId,
            groupId,
            id

        }

    }
    )