import React, { Component } from 'react';
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ClassAdmin from './ClassAdmin';
import { addClass, deleteClass } from '../actions/Class'
import { Row, Col, Button, Card, CardImg, CardBlock, CardTitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const mapStateToProps = (state) => {
  console.log(state.classDatas.data)
  return {
    classDatas: state.classDatas.data,
  }

}
class ClassPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //新增班級的modal
      modal: false,
      name: '',
      studentMaxNum: 0,
      classAdminPage: false,
      classId: NaN,
      //是否要刪除班級的modal
      modalDeleteClass: false
    };
  }
  //控制新增班級的modal的彈跳
  toggle = () => {
    this.setState(({ modal }) => ({ modal: !modal }));
  }
  //控制刪除班級的modal的彈跳
  toggleDeleteClass = () => {
    this.setState(({ modalDeleteClass }) => ({ modalDeleteClass: !modalDeleteClass }));
  }

  //控制班級頁面是否出現，哪個班級的資料跟index也傳進來
  classAdminFunc = (data, index) => () => {
    this.setState(({ classAdminPage, classId }) => ({
      classAdminPage: !classAdminPage,
      classId: data.id
    }))
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }
  //輸入進來的data存放的地方
  handleSubmit = (event) => {
    event.preventDefault();
    const { name, studentMaxNum } = this.state;
    this.props.addClass({ name, studentMaxNum })
    this.setState(({ modal }) => ({ name: "", studentMaxNum: 0, modal: !modal }))
  }
  //確認是否刪除班級
  handleDeleteClass = (data) => () => {

    this.props.deleteClass({ id: data.id })
    this.setState(({ modalDeleteClass }) => ({ modalDeleteClass: !modalDeleteClass }))
  }


  render() {
    const { modal, classAdminPage, classId, modalDeleteClass } = this.state
    const classDatas = this.props.classDatas
    return (
      <div>

        {classAdminPage === true ? (<ClassAdmin class_Id={classId} classAdmin_Page={classAdminPage} />) :
          (
            <div>
              <Row style={{ backgroundColor: '#2196f329', height: '13vh' }}>
                <Button color="secondary" className="buttonClass" onClick={this.toggle}>新增班級</Button>
              </Row>
              <Row className="justify-content-between" >
                {console.log(classDatas)}
                {classDatas.map(classData => (


                  //  <Col xs="4"> => 12/4=3 就是每排可以放3張照片，每3張放在一欄就換一行
                  //  xs 用在1000以下的小螢幕
                  classData.studentMaxNum > 0 ?
                    <Col xs="12" sm="4">
                      <Card className="content" >

                        <CardImg width="100%" height="250vh" src="https://picsum.photos/800/900?image=1067" alt="Card image cap"
                          onClick={this.classAdminFunc(classData)}
                        />
                        <i class="fas fa-trash" style={{ backgroundColor: '#ffc0cb59' }}
                          onClick={this.toggleDeleteClass} />
                        <CardBlock>
                          <CardTitle>
                            {classData.name}
                          </CardTitle>
                          <CardText>
                            {classData.studentsNum + "/" + classData.studentMaxNum}
                          </CardText>
                        </CardBlock>
                        {/* 新增後所彈跳出來的Modal */}
                        <Modal isOpen={modal} toggle={this.toggle}>
                          <ModalHeader toggle={this.toggle}>新增班級</ModalHeader>
                          <ModalBody>
                            <Form>
                              <FormGroup>
                                <Label for="name">班級名稱</Label>
                                <Input type="text" name="className" id="name" placeholder=""
                                  onChange={this.handleChange} />
                                <Label for="studentMaxNum">人數</Label>
                                <Input type="number" name="classPeopleNum" id="studentMaxNum" placeholder=""
                                  onChange={this.handleChange}
                                />
                              </FormGroup>
                            </Form>
                          </ModalBody>
                          <ModalFooter>
                            <Button onClick={this.handleSubmit}>
                              儲存
                </Button>
                          </ModalFooter>
                        </Modal>
                        {/* 刪除班級所詢問的modal */}
                        <Modal isOpen={modalDeleteClass} toggle={this.toggleDeleteClass}>
                          <ModalHeader toggle={this.toggleDeleteClass}>刪除班級</ModalHeader>
                          <ModalBody>
                            您確定要刪除班級嗎？這將會遺失所有學生資料。
                </ModalBody>
                          <ModalFooter>
                            <Button color="danger" onClick={this.handleDeleteClass(classData)}>
                              確認刪除
                </Button>
                          </ModalFooter>
                        </Modal>

                      </Card>

                    </Col>
                    : ('')
                ))
                }


              </Row>



            </div>
          )

        }
      </div>
    )
  }

}

const mapDispatchToProps = {
  addClass,
  deleteClass,
}
const Class = connect(mapStateToProps, mapDispatchToProps)(ClassPage);
export default Class;
