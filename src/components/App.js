import React, { Component } from 'react';
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
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
    // console.log(data)
    // console.log(index)
    this.setState(({ classAdminPage, classId }) => ({
      classAdminPage: !classAdminPage,
      classId: data.id
    }))
    // console.log(this.state.classAdminPage)
    // console.log(this.state.classId)
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
              <Button color="secondary" onClick={this.toggle}>新增班級</Button>

              <div>
                {this.props.data.map((data, index) => (

                  <Row className="photo">
                    <Col sm={6} md={4} className="mb-3">
                      <Card className="content" >
                        <CardImg width="100%" src="https://picsum.photos/800/900?image=1067" alt="Card image cap"
                          onClick={this.classAdminFunc(data, index)}
                        />
                        <i class="fas fa-trash" onClick={() => this.props.dispatch(deleteClass({ id: data.id }))} />
                        <CardBlock>
                          <CardTitle>
                            {data.name}
                            {/* {data.id} */}
                          </CardTitle>
                          <CardText>
                            {data.studentsNum !== undefined ? data.studentsNum + "/" + data.studentMaxNum : 0 + "/" + data.studentMaxNum}
                          </CardText>
                        </CardBlock>
                      </Card>
                    </Col>
                  </Row>

                ))
                }
              </div>

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
