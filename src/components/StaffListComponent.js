import React, { Component } from 'react';
import { Card, CardText, CardTitle } from 'reactstrap';
import dateFormat from 'dateformat';

import './style.css'
class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStaff: null,
        };
    }

    onStaffSelect(staff) {
        this.setState({ selectedStaff: staff });
    }

    renderStaff(staff) {
        if(staff) {
            return (
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <Card className="mt-2 mb-3 p-3 bg-item">
                        <CardTitle>Họ và tên: {staff.name}</CardTitle>
                        <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Phòng ban: {staff.department.name}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                    </Card>
                </div>
            )
        }else{
            return <p className="m-3">Bấm vào tên nhân viên để xem thông tin</p>
        }
    }
    

    render() {
        const listStaffs = this.props.staffs.map(staff=>{
            return (
                <div key={staff.id} className="col-sm-12 col-md-6 col-lg-4 mt-2 mb-2">
                    <Card className="p-2 bg-item" onClick={()=>this.onStaffSelect(staff)}>
                        <CardText>{staff.name}</CardText>
                    </Card>
                </div>
            )
        })

        return (
            <div className="container bg-custom">
                <div className="row">
                    {listStaffs}
                </div>
                <div className="row">
                    {this.renderStaff(this.state.selectedStaff)}
                </div>
            </div>
        )
    }

}

export default StaffList;