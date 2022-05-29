import React from 'react';
import { CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'
import './style.css'


    function RenderStaff({ staff }){
        if(staff){
            return (
                <div className="row pb-3">
                    <div className="col-sm-12 col-md-4 col-lg-3">
                        <CardImg src={staff.image} />
                    </div>
                    <div className="col-sm-12 col-md-8 col-lg-9">
                        <CardTitle>Họ và tên: {staff.name}</CardTitle>
                        <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Phòng ban: {staff.department.name}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                    </div>
                </div>
            )
        }else{
            return <div></div>
        }
    }

    const StaffDetail = (props) => {
        if (props.staff){
            return (
                <div className="container bg-custom">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/staffs">Nhân viên</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                {props.staff.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.staff.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <RenderStaff staff={props.staff} />
                </div>
             )
        }else {
            return <div></div>
        }
    }
        



export default StaffDetail;