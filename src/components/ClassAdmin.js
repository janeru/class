import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Jumbotron, Button, Card, CardImg, CardBlock, CardTitle, CardSubtitle, CardText, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class ClassAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            addPeoNum: 0,
            dataAdd: [{ addPeoNum: 0 }],
            dropdownOpen: false
        };
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    //控制modal的彈跳
    toggle2 = () => {
        this.setState(({ modal }) => ({ modal: !modal }));
    }
    handleChangePeople = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }
    //輸入進來的data存放的地方
    handleSubmitPeople = (e) => {
        e.preventDefault();
        const { addPeoNum } = this.state;
        // console.log(ClassName)
        // console.log(SelectPeoNum)
        const dataAdd = {
            addPeoNum
        }
        const testAddData = this.state.dataAdd
        testAddData.push(dataAdd)
        this.setState(({ dataAdd, modal }) => ({ datas: testAddData, modal: !modal }))
        console.log(dataAdd)

        // this.props.dispatch({
        //   type: 'ADD_CLASS',
        //   data
        // });
        // this.getClassName.value = '';
        // this.getSelectPeoNum.value = '';

    }
    render() {
        const { modal, dataAdd } = this.state
        return (
            <div>
                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        Button Dropdown
        </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>

                <Button color="secondary" onClick={this.toggle2}>新增學生</Button>
                {/* 新增後所彈跳出來的Modal */}
                <Modal isOpen={modal} toggle={this.toggle2}>
                    <ModalHeader toggle={this.toggle2}>新增學生</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="ClassName">座位數</Label>
                                <Input type="text" name="className" id="addPeoNum" placeholder=""
                                    onChange={(input) => this.handleChangePeople(input)} />


                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleSubmitPeople}>
                            儲存
            </Button>
                    </ModalFooter>
                </Modal>
                {/* 新增人數要顯示的圖像？ */}
                {/* {

                    dataAdd.map((data, index) => {
                        <div>
                            <i class="fas fa-user-circle" key={index}></i>
                        </div>
                    })
                } */}
            </div>
        );
    }
}
export default ClassAdmin