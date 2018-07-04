import React, { Component } from 'react';
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import GroupDropdown from './GroupDropdown'
import Class from '../actions/Class'
import { Link } from 'react-router-dom';
import { moveStudentsawayGroup } from '../actions/Class'
import { awayfromNoGroup } from '../actions/Class'
import { addStudentstoGroup } from '../actions/Class'
import { studentsInfor } from '../actions/Class'
import { deleteGroups } from '../actions/Class'
import { addGroups } from '../actions/Class'
import { deleteStudents } from '../actions/Class'
import { editStudents } from '../actions/Class'
import { addStudents } from '../actions/Class'
import { deleteClass } from '../actions/Class'
import { addClass } from '../actions/Class'
import { Container, Row, Col, Jumbotron, Button, Card, CardImg, CardBlock, CardTitle, CardSubtitle, CardText, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import uuid from 'uuid';
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        data: state.datas.data,
    }
}

class ClassStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modal2: false,
            modal3: false,
            modal4: false,
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
            groupName: ''



        };

        // console.log(this.props.class_Id)
    }
    //控制modal的彈跳
    toggle = () => {
        this.setState(({ modal }) => ({
            modal: !modal,
        }));
    }
    toggleStudentsGroup = () => {
        this.setState(({ modal3 }) => ({
            modal3: !modal3,
        }));
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
    //新增學生
    //輸入進來的data存放的地方
    handleSubmit = (data) => () => {

        const addStudentsArray = []
        const { studentSeatNum } = this.state;
        // 帶入選哪個班級的id
        console.log(this.props.class_Id)
        const nowClass_ID = this.props.class_Id
        for (let i = 0; i < (Number(studentSeatNum)); i++) {
            console.log(i)
            addStudentsArray.push({ id: uuid(), name: '尚未加入' })
        }
        // 加總人數
        const studentMaxNumber = Number(studentSeatNum) + Number(data.studentMaxNum)
        // console.log(studentMaxNumber)

        this.props.dispatch(addStudents({ nowClass_ID, studentMaxNumber, addStudentsArray }))
        this.setState(({ studentSeatNum, modal }) => ({ studentSeatNum: 0, modal: !modal }))
    }
    //控制是否點選學生的彈跳  
    toggleStudent = () => {
        this.setState(({ modal2 }) => ({ modal2: !modal2 }))
    }

    //更新要編輯的學生的id,名字,暱稱,帳戶
    renewStudent = (data, studentId, name) => () => {
        data.studentsInfo.map(info => {
            // 如果id相符的話，就更新匿名跟帳號
            if (info.id === studentId) {
                //更新帳號
                const account = info.account
                //更新匿名
                const nickName = info.nickname
                this.setState(({ modal2, studentUpdateInfoId, studentUpdateInfoName,
                    studentUpdateInfoNickname, studentUpdateInfoAccount }) => ({

                        studentUpdateInfoId: studentId,
                        studentUpdateInfoName: name,
                        studentUpdateInfoNickname: nickName,
                        studentUpdateInfoAccount: account,
                        modal2: !modal2


                    }));

            }
        })


    }
    //控制modal的彈跳
    toggleNewGroup = () => {
        this.setState(({ modal4 }) => ({ modal4: !modal4 }));
    }

    handleChangeGroup = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
    //新增組別
    //輸入進來的data存放的地方(儲存班級的id以及小組的名稱)
    handleSubmitGroup = (data) => () => {

        const { groupName } = this.state;
        console.log(groupName)
        const classid = data.id
        console.log(groupName)
        console.log(classid)
        this.props.dispatch(addGroups({ groupName, classid }))
        this.setState(({ dropdownOpen, modal4 }) => ({ dropdownOpen: !dropdownOpen, modal4: !modal4 }));
    }
    //當點選學生加入群組時的彈跳
    addStudentsGroup = (Id, Name) => () => {
        console.log(Id)
        console.log(Name)
        this.setState(({ addStudentGroupId, addStudentGroupName, modal3 }) => ({ addStudentGroupId: Id, addStudentGroupName: Name, modal3: !modal3 }))
    }



    // 處理修改學生的暱稱或刪除該學生的函式
    handleChangeNickName = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
    // 編輯學生暱稱
    handleSubmitNickname = (event) => {
        console.log(this.state.modal2)
        event.preventDefault();
        const { studentUpdateInfoId, updateNickname } = this.state
        // 帶入選哪個班級的id
        console.log(this.props.class_Id)
        const nowStudentClass_ID = this.props.class_Id
        this.props.dispatch(editStudents({ nowStudentClass_ID, studentUpdateInfoId, updateNickname }))
        this.setState(({ updateNickname, modal2 }) => ({ updateNickname: '', modal2: !modal2 }))

    }
    // 刪除學生
    handleSubmitDeleteStudent = (event) => {
        event.preventDefault();
        const { studentUpdateInfoId } = this.state
        console.log(this.props.class_Id)
        const nowStudentClass_ID = this.props.class_Id
        this.props.dispatch(deleteStudents({ nowStudentClass_ID, studentUpdateInfoId }))
        this.setState(({ modal2 }) => ({ modal2: !modal2 }))

    }

    //傳入要刪除組別的班級classId以及組別的id
    handleSubmitDeleteGroup = (id) => () => {

        // const { studentUpdateInfoId } = this.state
        console.log(this.props.class_Id)
        const { class_Id } = this.props
        const classId = class_Id
        this.props.dispatch(deleteGroups({ classId, id }))
    }
    // 處理尚未分組要顯示的座位

    seatArray = (data) => {
        const studentSeat = []
        for (let i = 0; i < (data.studentMaxNum - data.studentsNum); i++) {
            console.log(i)
            studentSeat.push({ id: uuid(), name: '尚未加入' })
        }
        console.log(studentSeat)
        return studentSeat
    }


    componentWillMount() {
        for (let i = 0; i < (this.props.data.length); i++) {
            console.log(i)
            if (this.props.data[i].id === this.props.class_Id) {
                const data = this.props.data[i]
                this.props.dispatch(studentsInfor({ studentsNew: this.seatArray(data), classId: this.props.class_Id }))
            }
        }
    }

    // 將這個班級的每個組別的id 弄成array
    groupInfoArray = (data) => {
        const groupIdArray = []
        data.groups.map((group) => {
            console.log(group)
            groupIdArray.push({ id: group.id, name: group.name })
        })
        console.log(groupIdArray)
        return groupIdArray
    }


    // 處理增加學生進入小組 (傳入要加入的空座位的組別的id以及要加入的學生的id,name)
    handleAddstudentsGroup = (classId, group) => () => {
        const groupid = group.id
        const id = this.state.addStudentGroupId
        const name = this.state.addStudentGroupName
        const addStudentToGroupInfo = { id, name }
        this.props.dispatch(addStudentstoGroup({ classId, groupid, id, addStudentToGroupInfo }))
    }
    // 處理將學生移開小組 (傳入要移除的組別的id以及要移除的學生的id,name)
    moveStudentAwayGroup = (classId, groupId, id, name) => () => {
        const moveStudentAwayGroupInfo = { id, name }
        console.log(moveStudentAwayGroupInfo)
        this.props.dispatch(moveStudentsawayGroup({ classId, moveStudentAwayGroupInfo, groupId, id }))

    }
    render() {
        const { modal, modal2, modal3, modal4, studentModal, studentUpdateInfoId, studentUpdateInfoName,
            studentUpdateInfoNickname, studentUpdateInfoAccount, updateNickname, addStudentGroupId, addStudentGroupName
             } = this.state

        return (
            <div>
                {/* 選取哪一筆資料 */}
                <Row style={{ backgroundColor: '#ffeb3b29', float: 'center' }}>
                    <Button color="info" className="buttonStudent" onClick={this.toggle} >新增學生</Button>
                </Row>
                {
                    this.props.data.map((data, index) => (

                        this.props.class_Id === data.id ?

                            (
                                <div>

                                    <Row className="photo" style={{ backgroundColor: '#9e9e9e1f' }}>
                                        <div className="dropDownColor">
                                            <GroupDropdown nowClass={data} />
                                        </div>
                                        <Button color="primary" className="buttonGroup" onClick={this.toggleNewGroup}>新增小組</Button>
                                        <Col xs="4" className="classBox">

                                            <div className="chooseClassName">

                                                {data.name}
                                                <i class="fas fa-user" style={{ color: '#347fc1ba', margin: '5px' }}></i>
                                                {data.studentsNum !== undefined ? data.studentsNum + "/" + data.studentMaxNum : 0 + "/" + data.studentMaxNum}
                                            </div>
                                            <Card className="content">

                                                <CardBlock>

                                                    <CardText>
                                                        {data.groups.length !== 0 ?
                                                            (<div>

                                                                {data.groups.map(group => {

                                                                    return (
                                                                        <div>
                                                                            <div style={{ color: '#795548', fontWeight: 'bold', fontSize: '1.2rem' }}>{group.name}</div>
                                                                            <div>
                                                                                <Button color="secondary" onClick={this.handleSubmitDeleteGroup(group.id)} className="deleteGroup">刪除小組</Button>
                                                                                <Row className="justify-content-between">
                                                                                    {

                                                                                        group.students.map(student => {

                                                                                            return (<div key={student.id} onClick={this.renewStudent(data, student.id, student.name)}>
                                                                                                <i class="fas fa-child" style={{ color: '#4caf50ad' }} onClick={this.moveStudentAwayGroup(data.id, group.id, student.id, student.name)}></i>
                                                                                                {student.name}
                                                                                            </div>)


                                                                                        })

                                                                                    }
                                                                                </Row>


                                                                            </div>

                                                                        </div>
                                                                    )
                                                                }
                                                                )
                                                                }

                                                            </div>)
                                                            :
                                                            (
                                                                <div>

                                                                </div>
                                                            )

                                                        }
                                                    </CardText>
                                                </CardBlock>
                                            </Card>
                                            {/* <Col xs="3" className="classBox2"> */}
                                            <Row className="justify-content-around">
                                                {

                                                    data.students.map((student) => {
                                                        return <div key={student.id} style={{ margin: '10px' }}>
                                                            <i class="fas fa-bookmark" style={{ color: '#795548e3' }} onClick={this.addStudentsGroup(student.id, student.name)}></i>
                                                            {student.name}
                                                        </div>

                                                    })
                                                }
                                            </Row>

                                        </Col>
                                        {/* </Col> */}
                                        {/* 新增學生的Modal */}
                                        <Modal isOpen={modal} toggle={this.toggle}>

                                            <ModalHeader toggle={this.toggle}>新增學生</ModalHeader>
                                            <ModalBody>
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="studentSeatNum">座位數</Label>
                                                        <Input type="number" name="studentSeatNum" id="studentSeatNum" placeholder=""
                                                            onChange={
                                                                (input) => this.handleChange(input)
                                                            }
                                                        />
                                                    </FormGroup>
                                                </Form>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button onClick={this.handleSubmit(data)}>
                                                    儲存
                                            </Button>

                                            </ModalFooter>
                                        </Modal>

                                        {/* 修改學生資料的Modal */}
                                        <Modal isOpen={modal2} toggle={this.toggleStudent}>
                                            <ModalHeader toggle={this.toggleStudent}>
                                                {studentUpdateInfoName}
                                            </ModalHeader>
                                            <ModalBody>
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="updateNickname">暱稱：
                                                        {/* {studentUpdateInfoNickname} */}
                                                        </Label>
                                                        <Input type="text" name="updateNickname" id="updateNickname" placeholder={studentUpdateInfoNickname}
                                                            onChange=
                                                            {
                                                                (input) => this.handleChangeNickName(input)
                                                            }
                                                        />
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



                                        <Modal isOpen={modal3} toggle={this.toggleStudentsGroup}>
                                            <ModalHeader toggle={this.toggleStudentsGroup}>
                                                請按下要加入的組別
                                            </ModalHeader>

                                            <ModalBody>
                                                {this.groupInfoArray(data).map((group) => {
                                                    console.log(group.name)
                                                    return <div
                                                        onClick={this.handleAddstudentsGroup(data.id, group)}>{group.name}</div>
                                                })
                                                }
                                            </ModalBody>

                                        </Modal>
                                        {/* 新增小組的Modal */}
                                        <Modal isOpen={modal4} toggle={this.toggleNewGroup}>
                                            <ModalHeader toggle={this.toggleNewGroup}>新增小組</ModalHeader>
                                            <ModalBody>
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="groupName">小組名稱</Label>
                                                        <Input type="text" name="groupName" id="groupName" placeholder=""
                                                            onChange={
                                                                (input) => this.handleChangeGroup(input)
                                                            }
                                                        />
                                                    </FormGroup>
                                                </Form>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button onClick={this.handleSubmitGroup(data)}>
                                                    儲存
                        </Button>

                                            </ModalFooter>
                                        </Modal>
                                    </div>
                                </div>) :
                            (<div> </div>)
                    ))
                }
            </div>
        );
    }
}


const ClassAdmin = connect(mapStateToProps)(ClassStudents);
export default ClassAdmin;


