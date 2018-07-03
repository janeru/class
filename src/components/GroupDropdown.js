import React, { Component } from 'react';
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import Class from '../actions/Class'
import { Link } from 'react-router-dom';
import { addGroups } from '../actions/Class'
import { deleteStudents } from '../actions/Class'
import { editStudents } from '../actions/Class'
import { addStudents } from '../actions/Class'
import { deleteClass } from '../actions/Class'
import { addClass } from '../actions/Class'
import { Container, Row, Col, Jumbotron, Button, Card, CardImg, CardBlock, CardTitle, CardSubtitle, CardText, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        data: state.datas.data,
    }
}


class GroupSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //新增小組的modal
            modal: false,
            //控制下拉式選單
            dropdownOpen: false,
            //新增的group的名字
            groupName: ''

        };

        console.log(this.props.nowClass)
    }


    //控制下拉式選單
    toggleSheet = () => {
        this.setState(({ dropdownOpen }) => ({ dropdownOpen: !dropdownOpen }));
    }
    //控制modal的彈跳
    toggle = () => {
        this.setState(({ modal }) => ({ modal: !modal }));
    }

    handleChangeGroup = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
    //新增組別
    //輸入進來的data存放的地方(儲存班級的id以及小組的名稱)
    handleSubmitGroup = (event) => {

        const { groupName } = this.state;
        console.log(groupName)
        const { nowClass } = this.props
        const classid = nowClass.id
        console.log(groupName)
        console.log(classid)
        this.props.dispatch(addGroups({ groupName, classid }))
        this.setState(({ dropdownOpen, modal }) => ({ dropdownOpen: !dropdownOpen, modal: !modal }));
    }


    render() {
        const { nowClass } = this.props
        const { modal } = this.state
        console.log('nowClass', nowClass)
        console.log('modal', modal)
        return (
            <div>
                <Button color="secondary" onClick={this.toggle}>新增小組</Button>

                {/* 如果班級的group長度不為0 => 就顯示組別以及其組員
                但是如果班級的長度為0 => 就顯示學生 */}
                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleSheet}>
                    <DropdownToggle caret>
                        全部
                        {console.log(nowClass.id)}
                    </DropdownToggle>

                    <DropdownMenu>
                        {nowClass.groups.length === 0 ? (''

                        ) : (
                                <div>
                                    {//顯示是哪一個組別以及組員有誰
                                        nowClass.groups.map((group) => {
                                            return (
                                                <div>

                                                    <div>

                                                        {group.name}</div>
                                                    <div>
                                                        {group.students.map((student) => {
                                                            return <DropdownItem>{student.name}</DropdownItem>
                                                        })}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    <div>未分組</div>
                                    <div>
                                        {nowClass.students.map((student) => {
                                            if (student.name !== '尚未加入') {
                                                return <DropdownItem>{student.name}</DropdownItem>
                                            }
                                        })}
                                    </div>
                                </div>)
                        }
                    </DropdownMenu>
                </ButtonDropdown>
                {/* 新增小組的Modal */}
                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>新增小組</ModalHeader>
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
                        <Button onClick={this.handleSubmitGroup}>
                            儲存
                        </Button>

                    </ModalFooter>
                </Modal>


            </div>
        );
    }
}


const GroupDropdown = connect(mapStateToProps)(GroupSheet);
export default GroupDropdown;


