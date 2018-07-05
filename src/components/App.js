import React, { Component } from 'react';
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import Appcss from './App.css'
import ClassAdmin from './ClassAdmin';
import Class from '../actions/Class'
// import { Link } from 'react-router-dom';
import { addClass } from '../actions/Class'
import { deleteClass } from '../actions/Class'
import { Container, Row, Col, Jumbotron, Button, Card, CardImg, CardBlock, CardTitle, CardSubtitle, CardText, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const mapStateToProps = (state) => {
  console.log(state.datas.data)
  return {
    data: state.datas.data,
  }

}

class ClassPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: '',
      studentMaxNum: 0,
      classAdminPage: false,
      classId: NaN
    };
  }
  //控制modal的彈跳
  toggle = () => {
    this.setState(({ modal }) => ({ modal: !modal }));
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
    this.props.dispatch(addClass({ name, studentMaxNum }))
    this.setState(({ name, studentMaxNum, modal }) => ({ name: "", studentMaxNum: 0, modal: !modal }))
  }


  render() {
    const { modal, classAdminPage, classId } = this.state
    return (
      <div>

        {classAdminPage === true ? (<ClassAdmin class_Id={classId} classAdmin_Page={classAdminPage} />) :
          (
            <div>
              <Row style={{ backgroundColor: '#2196f329', height: '13vh' }}>
                <Button color="secondary" className="buttonClass" onClick={this.toggle}>新增班級</Button>
              </Row>
              <Row className="justify-content-between" >
                {this.props.data.map((data, index) => (

                  //  <Col xs="4"> => 12/4=3 就是每排可以放3張照片，每3張放在一欄就換一行
                  //  xs 用在1000以下的小螢幕
                  <Col xs="12" sm="4">
                    <Card className="content" >
                      <CardImg width="100%" height="250vh" src="https://picsum.photos/800/900?image=1067" alt="Card image cap"
                        onClick={this.classAdminFunc(data, index)}
                      />
                      <i class="fas fa-trash" style={{ backgroundColor: '#ffc0cb59' }} onClick={() => this.props.dispatch(deleteClass({ id: data.id }))} />
                      <CardBlock>
                        <CardTitle>
                          {data.name}
                        </CardTitle>
                        <CardText>
                          {data.studentsNum !== undefined ? data.studentsNum + "/" + data.studentMaxNum : 0 + "/" + data.studentMaxNum}
                        </CardText>
                      </CardBlock>
                    </Card>
                  </Col>
                ))
                }
              </Row>


              {/* 新增後所彈跳出來的Modal */}
              <Modal isOpen={modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>新增班級</ModalHeader>
                <ModalBody>
                  <Form>
                    <FormGroup>
                      <Label for="name">班級名稱</Label>
                      <Input type="text" name="classname" id="name" placeholder=""

                        onChange={
                          (input) => this.handleChange(input)
                        }
                      />
                      <Label for="studentMaxNum">人數</Label>
                      <Input type="number" name="classpeoplenum" id="studentMaxNum" placeholder=""
                        onChange={
                          (input) => this.handleChange(input)
                        }
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

            </div>
          )

        }
      </div>
    )
  }

}
const App = connect(mapStateToProps)(ClassPage);
export default App;
