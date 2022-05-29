import React, { Component } from 'react';
import { Card, CardText, CardImg, Input } from 'reactstrap';
import { Link } from 'react-router-dom'
import './style.css'


    class StaffList extends Component {
        
        constructor(props) {
            super(props);

            this.state = {
                search: '',
                select: ''
            }
            this.handleInputChange = this.handleInputChange.bind(this)
        }

        handleInputChange(event) {
            const target = event.target
            const value = target.value
            const name = target.name

            this.setState({
                [name]: value
            });
        }

        handleSearch(staffs) {
            const listStaffsSearch = staffs.filter(staff => staff.name.toLowerCase().includes(this.state.search))
            return listStaffsSearch
        }
        
        handleSelect(staffs) {
            const listStaffsSelect = staffs.filter(staff => staff.department.name === this.state.select)
            return listStaffsSelect
        }

        render() {
            // const listStaffs = this.props.staffs.map(staff=>{
            //     return (
            //         <div key={staff.id} className="col-lg-2 col-md-4 col-sm-6 mt-3 mb-3">
            //             <Card>
            //                 <Link to={`/staffs/${staff.id}`}>
            //                     <CardImg width="100%" src={staff.image} alt={staff.name} />
            //                     <CardText className="text-center">{staff.name}</CardText>
            //                 </Link>
            //             </Card>
            //         </div>
            //     )
            // })
            const listStaffs = this.handleSearch(this.props.staffs).map(staff => {
                return (
                    <div key={staff.id} className="col-lg-2 col-md-4 col-sm-6 mt-3 mb-3">
                        <Card>
                            <Link to={`/staffs/${staff.id}`} className="link-item">
                                <CardImg width="100%" src={staff.image} alt={staff.name} />
                                <CardText className="text-center">{staff.name}</CardText>
                            </Link>
                        </Card>
                    </div>
                )
            })
            const listStaffsSelect = this.handleSelect(this.props.staffs).map(staff => {
                return (
                    <div key={staff.id} className="col-lg-2 col-md-4 col-sm-6 mt-3 mb-3">
                        <Card>
                            <Link to={`/staffs/${staff.id}`} className="link-item">
                                <CardImg width="100%" src={staff.image} alt={staff.name} />
                                <CardText className="text-center">{staff.name}</CardText>
                            </Link>
                        </Card>
                    </div>
                )
            })
            return (
                <div className="container bg-custom">
                    <div className="row pt-2">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <h3>Menu</h3>
                                </div>
                                <div className="col-12 col-md-4">
                                    <Input type="select" width="30%" id="select" name="select" value={this.state.select} onChange={this.handleInputChange}>
                                        <option>Tất cả</option>
                                        <option>Sale</option>
                                        <option>HR</option>
                                        <option>IT</option>
                                        <option>Marketing</option>
                                        <option>Finance</option>
                                    </Input>
                                </div>
                                <div className="col-12 col-md-4 m--24">
                                        <i class="fa fa-search search" aria-hidden="true"></i> 
                                        <Input type="text" width="30%" id="search" name="search" placeholder="Nhập tên nhân viên"
                                            value={this.state.search}
                                            onChange={this.handleInputChange}
                                        />
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        {this.state.select === '' || this.state.select === 'Tất cả' ? listStaffs : listStaffsSelect }
                    </div>
                </div>
            )
        } 
    }

export default StaffList;