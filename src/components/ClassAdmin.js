import React, { Component } from 'react';
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import ClassPage from './Class';
import GroupDropdown from './GroupDropdown'
import {
    moveStudentsawayGroup, addStudentstoGroup,
    studentsInfor, deleteGroups, addGroups,
    deleteStudents, editStudents, addStudents
} from '../actions/Class'
import { Row, Col, Button, Card, CardBlock, CardText, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
const mapStateToProps = (state) => {
    return {
        classDatas: state.classDatas.data
    }
}

class ClassStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //新增學生的modal
            modalAddStudents: false,
            //編輯學生的modal
            modalEditStudents: false,
            //點選學生 是否加入群組的modal
            modalStudentsToGroup: false,
            // 新增小組的modal
            modalAddGroup: false,
            name: '',
            studentSeatNum: 0,
            studentUpdateInfoId: NaN,
            studentUpdateInfoName: '',
            studentUpdateInfoNickname: '',
            studentUpdateInfoAccount: '',
            //修改後的暱稱
            updateNickname: '',
            addStudentGroupId: NaN,
            addStudentGroupName: '',
            //新增的group的名字
            groupName: '',
            //是否返回班級列表
            backToClassList: false,
            //要刪除學生的小組id
            deleteStudentGroupId: NaN,



        };
    }


    //控制modal的彈跳
    toggleAddStudents = () => {
        this.setState(({ modalAddStudents }) => ({
            modalAddStudents: !modalAddStudents,
        }));
    }
    toggleStudentsGroup = () => {
        this.setState(({ modalStudentsToGroup }) => ({
            modalStudentsToGroup: !modalStudentsToGroup,
        }));
    }
    //更新新增學生的座位數
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
    //新增學生
    //輸入進來的data存放的地方
    handleSubmit = (studentMaxNum, studentsNum, studentsId) => () => {

        let obj = {}
        const { studentSeatNum } = this.state;
        // 帶入選哪個班級的id
        const nowClass_ID = this.props.class_Id
        for (let i = 1; i <= Number(studentSeatNum); i++) {
            const nowNum = studentsId[studentsId.length - 1] + 1

            obj[nowNum] = { id: nowNum, name: '尚未加入' }

            studentsId[studentMaxNum + i - 1] = nowNum
        }
        // 加總人數
        const studentMaxNumber = Number(studentSeatNum) + Number(studentMaxNum)
        this.props.addStudents({ nowClass_ID, studentMaxNumber, obj, studentsId })
        this.setState(({ modalAddStudents }) => ({ studentSeatNum: 0, modalAddStudents: !modalAddStudents }))
    }
    //控制是否點選學生的彈跳  
    toggleEditStudent = () => {
        this.setState(({ modalEditStudents }) => ({ modalEditStudents: !modalEditStudents }))
    }

    //更新要編輯的學生的id,名字,暱稱,帳戶以及位在哪一個組別的id
    renewStudent = (classId, studentId, groupId, studentName) => () => {
        // 如果id相符的話，就更新匿名跟帳號
        const { classDatas } = this.props
        classDatas.map(classData => {
            if (classData.id === classId) {
                if (studentName !== '尚未加入') {

                    const student = classData.studentsInfo[studentId]

                    //更新帳號
                    const account = student.account
                    //更新匿名
                    const nickName = student.nickname
                    this.setState(({ modalEditStudents, studentUpdateInfoId, studentUpdateInfoName,
                        studentUpdateInfoNickname, studentUpdateInfoAccount, deleteStudentGroupId }) => ({
                            studentUpdateInfoId: student.id,
                            studentUpdateInfoName: student.name,
                            studentUpdateInfoNickname: nickName,
                            studentUpdateInfoAccount: account,
                            modalEditStudents: !modalEditStudents,
                            deleteStudentGroupId: groupId,
                        }));
                } else return ('')
            } else return ('')
        })


    }
    //控制modal的彈跳
    toggleNewGroup = () => {
        this.setState(({ modalAddGroup }) => ({ modalAddGroup: !modalAddGroup }));
    }

    handleChangeGroup = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
    seatArray = ({ studentMaxNum, studentsNum, studentsId, count }) => {
        const studentSeat = {}
        if (studentsNum !== 0) {
            for (let i = 1; i <= (studentMaxNum - studentsNum); i++) {
                const nullStudents = studentsId[studentsId.length - 1] + 1
                studentSeat[nullStudents] = { id: nullStudents, name: '尚未加入' }
                studentsId[studentsNum + i - 1] = nullStudents
            }
            if (count === 0) {
                return [studentSeat, studentsId]
            } else return ('')
        }
        else {
            const studentSeatNewClass = {}
            const arr = []
            for (let i = 1; i <= studentMaxNum; i++) {
                studentSeatNewClass[arr.length + 1] = { id: i, name: '尚未加入' }
                arr.push(i)
            }
            if (count === 0) {
                return [studentSeatNewClass, arr]
            } else return ('')


        }
    }
    componentWillMount() {
        // 處理尚未分組要顯示的座位
        const { classDatas } = this.props
        classDatas.map((classData) => {
            if (classData.id === this.props.class_Id) {

                if (classData.count === 0) {

                    const seatInfo = this.seatArray({ ...classData })

                    return this.props.studentsInfor({ studentsNewInfo: seatInfo[0], studentsId: seatInfo[1], classId: this.props.class_Id, count: 0 })
                } else return ('')
            } else return classData
        })

    }
    //新增組別
    //輸入進來的data存放的地方(儲存班級的id以及小組的名稱)
    handleSubmitGroup = (classId) => () => {
        const { groupName } = this.state;
        this.props.addGroups({ groupName, classId })
        this.setState(({ modalAddGroup }) => ({ modalAddGroup: !modalAddGroup }));
    }
    //當點選學生加入群組時的彈跳
    addStudentsGroup = (Id, Name) => () => {
        this.setState(({ addStudentGroupId, addStudentGroupName, modalStudentsToGroup }) => ({ addStudentGroupId: Id, addStudentGroupName: Name, modalStudentsToGroup: !modalStudentsToGroup }))
    }

    // 處理修改學生的暱稱或刪除該學生的函式
    handleChangeNickName = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
    // 編輯學生暱稱
    handleSubmitNickname = (event) => {
        event.preventDefault();
        const { studentUpdateInfoId, updateNickname } = this.state
        // 帶入選哪個班級的id
        const nowStudentClass_ID = this.props.class_Id
        this.props.editStudents({ nowStudentClass_ID, studentUpdateInfoId, updateNickname })
        this.setState(({ modalEditStudents }) => ({ updateNickname: '', modalEditStudents: !modalEditStudents }))

    }
    // 刪除學生
    handleSubmitDeleteStudent = () => {
        const { studentUpdateInfoId, deleteStudentGroupId } = this.state
        const nowStudentClass_ID = this.props.class_Id
        this.props.deleteStudents({ nowStudentClass_ID, studentUpdateInfoId, deleteStudentGroupId })
        this.setState(({ modalEditStudents }) => ({ modalEditStudents: !modalEditStudents }))

    }

    //傳入要刪除組別的班級classId以及組別的id 也要傳入要移出去的組別的學生id及姓名
    handleSubmitDeleteGroup = (groupStudents, id) => () => {
        const { class_Id: classId } = this.props
        this.props.deleteGroups({ groupStudents, classId, id })
    }

    // 將這個班級的每個組別的id 弄成array
    groupInfoArray = (data) => {
        const groupIdArray = []
        data.groups.map((group) => {
            return groupIdArray.push({ id: group.id, name: group.name })
        })
        return groupIdArray
    }
    // 處理增加學生進入小組 (傳入要加入的空座位的組別的id以及要加入的學生的id,name)
    handleAddstudentsGroup = (classId, groupId) => () => {
        const id = this.state.addStudentGroupId
        const name = this.state.addStudentGroupName
        const addStudentToGroupInfo = { [id]: { id, name } }
        this.setState(({ modalStudentsToGroup }) => ({ modalStudentsToGroup: !modalStudentsToGroup }))
        this.props.addStudentstoGroup({ classId, groupId, id, addStudentToGroupInfo })
    }
    // 處理將學生移開小組 (傳入要移除的組別的id以及要移除的學生的id,name)
    moveStudentAwayGroup = (classId, groupId, id, name) => () => {
        const moveStudentAwayGroupInfo = { [id]: { id, name } }
        this.props.moveStudentsawayGroup({ classId, moveStudentAwayGroupInfo, groupId, id })

    }
    isBackToClassList = () => {
        this.setState(({ backToClassList }) => ({ backToClassList: !backToClassList }))
    }
    render() {
        const { modalAddStudents, modalEditStudents, modalStudentsToGroup, modalAddGroup, studentUpdateInfoName,
            studentUpdateInfoNickname, studentUpdateInfoAccount, backToClassList
             } = this.state

        return (
            <div>
                {(backToClassList) ? (<ClassPage />) : (
                    <div>
                        {/* 選取哪一筆資料 */}
                        <Row style={{ backgroundImage: 'url(' + 'https://picsum.photos/3000/1000?image=947' + ')', float: 'center', display: 'flex' }}>
                            <Col xs="12">
                                <Button color="info" className="buttonStudent" onClick={this.toggleAddStudents} >新增學生</Button>
                                <Button color="secondary" className="backToClassList" onClick={this.isBackToClassList}>返回班級列表</Button>
                            </Col>
                        </Row>
                        {

                            this.props.classDatas.map((classData) => (

                                this.props.class_Id === classData.id ?

                                    (
                                        classData.studentId === [] ? ('Please wait') :
                                            (<div>

                                                <Row className="photo">

                                                    <div className="dropDownColor">
                                                        <GroupDropdown nowClass={classData} />
                                                    </div>
                                                    <Button color="primary" className="buttonGroup" onClick={this.toggleNewGroup}>新增小組</Button>

                                                    <Col xs="9" sm="4" className="classBox">
                                                        <div className="chooseClassName">
                                                            {classData.name}
                                                            <i class="fas fa-user" style={{ color: '#347fc1ba', margin: '5px' }}></i>
                                                            {classData.studentsNum + "/" + classData.studentMaxNum}
                                                        </div>
                                                        <Card className="content">

                                                            <CardBlock>

                                                                <CardText>

                                                                    {classData.groups.length !== 0 ?
                                                                        // 有組別
                                                                        (<div>
                                                                            {classData.groups.map((group) => {

                                                                                return (
                                                                                    <div>

                                                                                        <div style={{ color: '#795548', fontWeight: 'bold', fontSize: '1.2rem' }}>{group.name}</div>
                                                                                        <div>
                                                                                            <Button color="secondary" onClick={this.handleSubmitDeleteGroup(group.students, group.id)} className="deleteGroup">刪除小組</Button>
                                                                                            <Row className="justify-content-between">
                                                                                                {
                                                                                                    classData.studentsId.map((studentId) => {
                                                                                                        return group.students[studentId] ?
                                                                                                            (<div className="groupStudent">

                                                                                                                <i class="fas fa-child" style={{ color: '#4caf50ad' }} onClick={this.moveStudentAwayGroup(classData.id, group.id, group.students[studentId].id, group.students[studentId].name)}></i>
                                                                                                                <div onClick={this.renewStudent(classData.id, studentId, group.id, group.students[studentId].name)}>
                                                                                                                    {group.students[studentId].name}
                                                                                                                </div>

                                                                                                            </div>)
                                                                                                            : ('')
                                                                                                    })

                                                                                                }


                                                                                            </Row>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </div>) : ('')
                                                                    }
                                                                </CardText>
                                                            </CardBlock>
                                                        </Card>
                                                        <Row className="justify-content-around">
                                                            {

                                                                classData.studentsId.map((studentId, i) => {

                                                                    return classData.students[studentId] ?
                                                                        (
                                                                            <div className="noGroupStudent">

                                                                                <i class="fas fa-bookmark" style={{ color: '#795548e3' }} onClick={this.addStudentsGroup(classData.students[studentId].id, classData.students[studentId].name)}></i>

                                                                                <div key={i} style={{ margin: '10px' }} onClick={this.renewStudent(classData.id, studentId, '', classData.students[studentId].name)}>
                                                                                    {classData.students[studentId].name}
                                                                                </div>

                                                                            </div>
                                                                        ) : ('')

                                                                })
                                                            }
                                                        </Row>
                                                    </Col>

                                                    {/* </Col> */}
                                                    {/* 新增學生的Modal */}
                                                    <Modal isOpen={modalAddStudents} toggle={this.toggleAddStudents}>

                                                        <ModalHeader toggle={this.toggleAddStudents}>新增學生</ModalHeader>
                                                        <ModalBody>
                                                            <Form>
                                                                <FormGroup>
                                                                    <Label for="studentSeatNum">座位數</Label>
                                                                    <Input type="number" name="studentSeatNum" id="studentSeatNum" placeholder=""
                                                                        onChange={this.handleChange} />
                                                                </FormGroup>
                                                            </Form>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button onClick={this.handleSubmit(classData.studentMaxNum, classData.studentsNum, classData.studentsId)}>
                                                                儲存
                                            </Button>

                                                        </ModalFooter>
                                                    </Modal>

                                                    {/* 修改學生資料的Modal */}
                                                    <Modal isOpen={modalEditStudents} toggle={this.toggleEditStudent}>
                                                        <ModalHeader toggle={this.toggleEditStudent}>
                                                            {studentUpdateInfoName}
                                                        </ModalHeader>
                                                        <ModalBody>
                                                            <Form>
                                                                <FormGroup>
                                                                    <Label for="updateNickname">暱稱：
                                                        {/* {studentUpdateInfoNickname} */}
                                                                    </Label>
                                                                    <Input type="text" name="updateNickname" id="updateNickname" placeholder={studentUpdateInfoNickname}
                                                                        onChange={this.handleChangeNickName} />
                                                                    <Label for="studentAccount">帳號：{studentUpdateInfoAccount}

                                                                    </Label>
                                                                </FormGroup>
                                                            </Form>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button onClick={this.handleSubmitNickname}>
                                                                儲存
                                            </Button>
                                                            <Button>
                                                                <i class="fas fa-trash" onClick={this.handleSubmitDeleteStudent} />
                                                                刪除
                                            </Button>

                                                        </ModalFooter>
                                                    </Modal>



                                                </Row>

                                                {/* 放尚未加入組別的學生  以及 空座位數 */}
                                                <div>
                                                    {/* 放的是尚未加入組別的學生以及剩下的空坐位數，並將要加入小組的學生的id記錄下來 */}
                                                    <Modal isOpen={modalStudentsToGroup} toggle={this.toggleStudentsGroup}>
                                                        <ModalHeader toggle={this.toggleStudentsGroup}>
                                                            請按下要加入的組別
                                            </ModalHeader>

                                                        <ModalBody>
                                                            {this.groupInfoArray(classData).map((group) => {
                                                                return <div
                                                                    onClick={this.handleAddstudentsGroup(classData.id, group.id)}>{group.name}</div>
                                                            })
                                                            }
                                                        </ModalBody>

                                                    </Modal>
                                                    {/* 新增小組的Modal */}
                                                    <Modal isOpen={modalAddGroup} toggle={this.toggleNewGroup}>
                                                        <ModalHeader toggle={this.toggleNewGroup}>新增小組</ModalHeader>
                                                        <ModalBody>
                                                            <Form>
                                                                <FormGroup>
                                                                    <Label for="groupName">小組名稱</Label>
                                                                    <Input type="text" name="groupName" id="groupName" placeholder=""
                                                                        onChange={this.handleChangeGroup} />
                                                                </FormGroup>
                                                            </Form>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button onClick={this.handleSubmitGroup(classData.id)}>

                                                                儲存
                        </Button>
                                                        </ModalFooter>
                                                    </Modal>
                                                </div>
                                            </div>)
                                    ) :
                                    ('')
                            ))
                        }
                    </div>
                )
                }

            </div>
        );
    }
}
const mapDispatchToProps = {
    studentsInfor,
    deleteStudents,
    addStudents,
    addGroups,
    editStudents,
    deleteGroups,
    addStudentstoGroup,
    moveStudentsawayGroup
}


const ClassAdmin = connect(mapStateToProps, mapDispatchToProps)(ClassStudents);
export default ClassAdmin;


