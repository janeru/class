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
            dropDownValue: '選單',
            buttonToChoose: NaN,
            nowClickGroupId: NaN
        };

    }

    //控制下拉式選單
    toggleSheet = () => {
        this.setState(({ dropdownOpen }) => ({ dropdownOpen: !dropdownOpen }));
    }

    changeValue = (name, id, number) => () => {
        this.setState(({ dropDownValue, buttonToChoose, nowClickGroupId }) => ({ dropDownValue: name, nowClickGroupId: id, buttonToChoose: number }))
    }


    render() {
        const { nowClass } = this.props
        const { modal, buttonToChoose, nowClickGroupId } = this.state
        const whole = '全部'
        const noGroup = '未分組'
        const numberWhole = 0
        const numberGroup = 1
        const numberNoGroup = 2



        return (
            <div>

                {/* 如果班級的group長度不為0 => 就顯示組別以及其組員
                但是如果班級的長度為0 => 就顯示學生 */}
                <Col className="dropdownRow">

                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleSheet}>
                        <DropdownToggle caret color="warning" className="dropdownMenu" >
                            {this.state.dropDownValue}
                        </DropdownToggle>

                        <DropdownMenu >
                            <div onClick={this.changeValue(whole, '', numberWhole)}>全部</div>

                            {nowClass.groups.map((group) =>
                                <div onClick={this.changeValue(group.name, group.id, numberGroup)}>{group.name}</div>)
                            }
                            <div onClick={this.changeValue(noGroup, '', numberNoGroup)}>未分組</div>
                        </DropdownMenu>
                        {/* 如果點到全部，有正常名字的都要顯示出來 */}
                        <div className="clickGroupStuentsItem">
                            {(buttonToChoose === 0) ? (


                                <DropdownMenu id="Item">
                                    <div >

                                        <div>

                                            {nowClass.groups.map((group) =>

                                                (group.students.map((student) => {
                                                    if (student.name !== '尚未加入') {
                                                        return <DropdownItem disabled>{student.name}</DropdownItem>
                                                    }
                                                })
                                                )
                                            )
                                            }
                                        </div>

                                        <div>
                                            {nowClass.students.map((student) => {
                                                if (student.name !== '尚未加入') {

                                                    return <DropdownItem disabled>{student.name}</DropdownItem>
                                                }
                                            })}
                                        </div>
                                    </div>
                                </DropdownMenu>
                            ) : ('')}

                            {/* 先確認是點到組別，在確定是點到哪一個組別，並顯示該組別的學生名字 */}
                            {(buttonToChoose === 1) ? (
                                nowClass.groups.length === 0 ? (''

                                ) : (
                                        <DropdownMenu id="Item">
                                            <div >
                                                {/* 顯示是哪一個組別以及組員有誰 */}
                                                {nowClass.groups.map((group) =>
                                                    (group.id === nowClickGroupId) ?

                                                        (group.students.map((student) => {

                                                            if (student.name !== '尚未加入') {
                                                                return <DropdownItem disabled>{student.name}</DropdownItem>
                                                            }
                                                        })
                                                        )
                                                        : ('')

                                                )
                                                }
                                            </div>
                                        </DropdownMenu>
                                    )
                            ) : ('')}

                            {/* 如果點到沒有組別，那麼就要顯示沒有組別的名字 */}
                            {(buttonToChoose === 2) ? (

                                <DropdownMenu id="Item">
                                    <div >

                                        {nowClass.students.map((student) => {
                                            if (student.name !== '尚未加入') {

                                                return <DropdownItem disabled>{student.name}</DropdownItem>
                                            }
                                        })}
                                    </div>
                                </DropdownMenu>)
                                : ('')}

                        </div>
                    </ButtonDropdown>

                </Col>


            </div>
        );
    }
}


const GroupDropdown = connect(mapStateToProps)(GroupSheet);
export default GroupDropdown;


