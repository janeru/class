import React, { Component } from 'react';
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import Class from '../actions/Class'
import { Link } from 'react-router-dom';
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
            //控制下拉式選單
            dropdownOpen: false,

        };
    }

    //控制下拉式選單
    toggleSheet = () => {
        this.setState(({ dropdownOpen }) => ({ dropdownOpen: !dropdownOpen }));
    }
    render() {
        const { nowClass } = this.props
        const { modal } = this.state

        return (
            <div>

                {/* 如果班級的group長度不為0 => 就顯示組別以及其組員
                但是如果班級的長度為0 => 就顯示學生 */}
                <Col className="dropdownRow">

                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleSheet}>
                        <DropdownToggle caret color="warning" className="dropdownMenu">
                            全部

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
                                                            {group.name}
                                                        </div>
                                                        <div>
                                                            {group.students.map((student) => {
                                                                return student.name === '尚未加入' ? ('') : (
                                                                    <DropdownItem>{student.name}</DropdownItem>)
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

                </Col>


            </div>
        );
    }
}


const GroupDropdown = connect(mapStateToProps)(GroupSheet);
export default GroupDropdown;


