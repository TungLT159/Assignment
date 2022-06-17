import React, { Component } from 'react';
import { Card, CardText, CardImg, Input, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import { LocalForm, Control, Errors } from 'react-redux-form';
import './style.css'
import { Loading } from './LoadingComponent'


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
 

class StaffList extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            isModalOpen: false,
            doB: '',
            startDate: '',
            isModalUpdateOpen: false
        }
        this.handleInputSearch = this.handleInputSearch.bind(this)
        this.renderSearch = this.renderSearch.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.handleInputDate = this.handleInputDate.bind(this)
        this.renderStaff = this.renderStaff.bind(this)
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen})
    }

    handleSubmit(values) {
        let departmentId = ''
        switch (values.department) {
            case 'Sale':
                departmentId = 'Dept01'
                break;
            case 'HR':
                departmentId = 'Dept02'
                break;
            case 'Marketing':
                departmentId = 'Dept03'
                break;
            case 'IT':
                departmentId = 'Dept04'
                break;
            case 'Finance':
                departmentId = 'Dept05'
                break;
            default: departmentId = ''
        }
        const salary = Math.trunc(values.salaryScale * 3000000 + values.overTime * 200000)

        this.toggleModal();
        this.props.postStaff(values.name, values.doB, Number(values.salaryScale), values.startDate, departmentId, Number(values.annualLeave), Number(values.overTime), salary)
    }

    handleInputSearch() {
        this.setState({ 
            search: this.search.value
            })
    }
    handleInputDate(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        });
    }

    renderStaff(staffs) {
        if(staffs){
            return (
                staffs.map(staff => {
                    return (
                        <div key={staff.id} className="col-lg-2 col-md-4 col-6 mt-3 mb-3">
                            <Card>
                                <Link to={`/staffs/${staff.id}`} className="link-item">
                                    <CardImg width="100%" src={staff.image} alt={staff.name} />
                                    <CardText className="text-center">{staff.name}</CardText>
                                </Link>
                            <Button color="danger" className="btn-custom" onClick={() => this.props.deleteStaff(staff.id)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                            </Card>
                        </div>
                    )
                })
            )
        }else{
            return (<div></div>)
        }
    }

    renderSearch(staffs) {
        const listStaffsSearch = staffs.filter(staff => staff.name.toLowerCase().includes(this.state.search))
        if(listStaffsSearch.length > 0) {
            return listStaffsSearch.map(staff =>{
                return (
                    <div key={staff.id} className="col-lg-2 col-md-4 col-6 mt-3 mb-3">
                        <Card>
                            <Link to={`/staffs/${staff.id}`} className="link-item">
                                <CardImg width="100%" src={staff.image} alt={staff.name} />
                                <CardText className="text-center">{staff.name}</CardText>
                            </Link>
                        <Button color="danger" className="btn-custom" onClick={() => this.props.deleteStaff(staff.id)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                        </Card>
                    </div>
                )
            })
        }else {
            return (
                <div><h4>Không tìm thấy kết quả!</h4></div>
            )
        }
    }

    render() {
        if (this.props.staffsLoading) {
            return (
                <div className="container bg-custom">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        } else if (this.props.staffsErrMess) {
            return (
                <div className="container bg-custom">
                    <div className="row">
                        <div className="col-12">
                            <h4>{this.props.staffsErrMess}</h4>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container bg-custom">
                    <div className="row pt-2">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <h3>Menu</h3>
                                </div>
                                <div className="col-12 col-md-2">
                                    <Button onClick={this.toggleModal} color="dark">
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                    </Button>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="row">
                                        <div className="col-9 col-md-8">
                                            <Input type="text" width="30%" id="search" name="search" 
                                            placeholder="Nhập tên nhân viên" 
                                            innerRef={(input) => this.search = input} />
                                        </div>
                                        <div className="col-3 col-md-4">
                                            <Button color="primary" type="submit" onClick={this.handleInputSearch}>Tìm</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        {this.state.search ? this.renderSearch(this.props.staffs) : this.renderStaff(this.props.staffs)}
                    </div>

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Thêm nhân viên
                    </ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)} className="p-3">
                            <Row className="form-group">
                                <Label htmlFor="name" md={5}>Tên</Label>
                                <Col md={7}>
                                    <Control.text model=".name" name="name" placeholder="Nhập tên" id="name" className="form-control"
                                        validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(30)
                                        }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập',
                                            minLength: 'Yêu cầu nhiều hơn 2 ký tự',
                                            maxLength: 'Yêu cầu ít hơn 30 ký tự'
                                        }}
    
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="doB" md={5}>Ngày sinh</Label>
                                <Col md={7}>
                                    <Control type="date" model=".doB" name="doB" placeholder="Nhập tên" id="doB" className="form-control"
                                        value={this.state.doB}
                                        onChange={this.handleInputDate}
                                        validators={{ required }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".doB"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="startDate" md={5}>Ngày vào công ty</Label>
                                <Col md={7}>
                                    <Control type="date" model=".startDate" name="startDate" placeholder="Nhập tên" id="startDate" className="form-control"
                                        value={this.state.startDate}
                                        onChange={this.handleInputDate}
                                        validators={{ required }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".startDate"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="department" md={5}>Phòng ban</Label>
                                <Col md={7}>
                                    <Control.select model=".department" name="department" placeholder="Nhập tên" id="department" className="form-control" defaultValue="Sale">
                                        <option>Sale</option>
                                        <option>HR</option>
                                        <option>Marketing</option>
                                        <option>IT</option>
                                        <option>Finance</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="salaryScale" md={5}>Hệ số lương</Label>
                                <Col md={7}>
                                    <Control.text model=".salaryScale" name="salaryScale" placeholder="Nhập tên" id="salaryScale" className="form-control"
                                        defaultValue={1}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="annualLeave" md={5}>Số ngày nghỉ còn lại</Label>
                                <Col md={7}>
                                    <Control.text model=".annualLeave" name="annualLeave" placeholder="Nhập tên" id="annualLeave" className="form-control"
                                        defaultValue={0}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="overTime" md={5}>Số ngày đã làm thêm</Label>
                                <Col md={7}>
                                    <Control.text model=".overTime" name="overTime" placeholder="Nhập tên" id="overTime" className="form-control"
                                        defaultValue={0}
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Thêm</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                
            </div>
            )
        }
    } 
}

export default StaffList;