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
      addClassModal: false,
      name: '',
      studentMaxNum: 0,
      classAdminPage: false,
      classId: NaN,
      deleteClassId: NaN,
      //是否要刪除班級的modal
      modalDeleteClass: false,
      randomPhotoNum: [1079, 1080, 1081]
    };
  }


  //控制新增班級的modal的彈跳
  toggleAddClass = () => {

    this.setState(({ addClassModal }) => ({ addClassModal: !addClassModal }));
  }
  //控制刪除班級的modal的彈跳
  toggleDeleteClass = (id) => () => {
    console.log(id)
    this.setState(({ modalDeleteClass }) => ({ deleteClassId: id, modalDeleteClass: !modalDeleteClass }));
  }

  //控制班級頁面是否出現，哪個班級的資料跟index也傳進來
  class_AdminPage = (id) => () => {
    this.setState(({ classAdminPage, classId }) => ({
      classAdminPage: !classAdminPage,
      classId: id
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
    this.setState(({ addClassModal, randomPhotoNum }) => ({
      name: "", studentMaxNum: 0, addClassModal: !addClassModal,
      randomPhotoNum: [...randomPhotoNum, randomPhotoNum.push(Math.floor(Math.random() * 100))]
    }))
  }
  //確認是否刪除班級
  handleDeleteClass = () => {
    const { deleteClassId } = this.state
    console.log(deleteClassId)
    this.props.deleteClass({ id: deleteClassId })
    this.setState(({ modalDeleteClass }) => ({ modalDeleteClass: !modalDeleteClass }))
  }


  render() {
    const { addClassModal, classAdminPage, classId, modalDeleteClass, randomPhotoNum } = this.state
    const classDatas = this.props.classDatas
    return (
      <div>

        {(classAdminPage === true) ? (<ClassAdmin class_Id={classId} />) :
          (
            <div>
              <Row style={{ backgroundColor: '#2196f329', height: '13vh' }}>
                <Button outline color="secondary" className="buttonClass" onClick={this.toggleAddClass}>新增班級</Button>
              </Row>
              <Row className="justify-content-between">

                {classDatas.map(({ id, name, studentsNum, studentMaxNum }, index) => (

                  //  <Col xs="4"> => 12/4=3 就是每排可以放3張照片，每3張放在一欄就換一行
                  //  xs 用在1000以下的小螢幕
                  (studentMaxNum > 0) ?
                    <Col xs="12" sm="4">
                      <Card className="content" >
                        {console.log(id)}
                        <CardImg width="100%" height="250vh" src={"https://picsum.photos/800/900?image=" + randomPhotoNum[index]} alt="Card image cap"
                          onClick={this.class_AdminPage(id)}
                        />
                        <i class="fas fa-trash" style={{ backgroundColor: '#ffc0cb59' }}
                          onClick={this.toggleDeleteClass(id)} />
                        <CardBlock>
                          <CardTitle>
                            {name}
                          </CardTitle>
                          <CardText>
                            {studentsNum + "/" + studentMaxNum}
                          </CardText>
                        </CardBlock>
                        {/* 新增後所彈跳出來的Modal */}
                        <Modal isOpen={addClassModal} toggle={this.toggleAddClass}>
                          <ModalHeader toggle={this.toggleAddClass}>新增班級</ModalHeader>
                          <ModalBody>
                            <Form>
                              <FormGroup>
                                <Label for="name">班級名稱</Label>
                                <Input type="text" name="className" id="name" placeholder=""
                                  onChange={this.handleChange} />
                                <Label for="studentMaxNum">人數</Label>
                                <Input type="number" name="classPeopleNum" id="studentMaxNum" placeholder=""
                                  onChange={this.handleChange} />
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
                        <Modal isOpen={modalDeleteClass} toggle={this.toggleDeleteClass(id)}>
                          <ModalHeader toggle={this.toggleDeleteClass(id)}>刪除班級</ModalHeader>
                          <ModalBody>
                            您確定要刪除班級嗎？這將會遺失所有學生資料。
                </ModalBody>
                          <ModalFooter>
                            <Button color="danger" onClick={this.handleDeleteClass}>
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
