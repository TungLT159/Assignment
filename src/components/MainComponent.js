import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import StaffList from './StaffListComponent'
import Header from './HeaderComponent'
import StaffDetail from './StaffdetailComponent'
import Departments from './DepartmentComponent'
import PayRoll from './PayrollComponent'
import DetailDepartment from './DetailDepartmentComponent'
import Footer from './FooterComponent'
import { fetchStaffs, fetchDepartments, fetchPayrolls, postStaff, deleteStaff, updateStaff } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';



const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    payrolls: state.payrolls,
  }
}

const mapDispatchToProps = dispatch => ({
  deleteStaff: (staffId) => dispatch(deleteStaff(staffId)),
  postStaff: (name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, salary) => dispatch(postStaff(name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, salary)),
  updateStaff: (id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime) => dispatch(updateStaff(id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime)),
  fetchStaffs: () => {dispatch(fetchStaffs())},
  fetchDepartments: () => {dispatch(fetchDepartments())},
  fetchPayrolls: () => {dispatch(fetchPayrolls())},
})

class Main extends Component {


  componentDidMount() {
    this.props.fetchStaffs()
    this.props.fetchDepartments()
    this.props.fetchPayrolls()
  }

 

  render() {


    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail staff={this.props.staffs.staffs.filter(staff => staff.id === parseInt(match.params.staffId,10))[0]}
            staffsLoading={this.props.staffs.isLoading} staffsErrMess={this.props.staffs.errMess}
            updateStaff={this.props.updateStaff}
         />
      )
    }

    const DepartmentWithId = ({ match }) => {
      return (
        <DetailDepartment departmentId={match.params.departmentId} />
      )
    }

    return (
      <div>
        <Header />
        <TransitionGroup> 
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                <Route exact path="/staffs" component={() => <StaffList staffs={this.props.staffs.staffs} staffsLoading={this.props.staffs.isLoading} staffsErrMess={this.props.staffs.errMess} postStaff={this.props.postStaff} deleteStaff={this.props.deleteStaff} />} />
                <Route path="/staffs/:staffId" component={StaffWithId} />
                <Route exact path="/departments" component={() => <Departments department={this.props.departments.departments} departmentsLoading={this.props.departments.isLoading} departmentsErrMess={this.props.departments.errMess} />} />
                <Route path="/departments/:departmentId" component={DepartmentWithId} />
                <Route exact path="/payroll" component={() => <PayRoll staffs={this.props.payrolls.payrolls} payrollsLoading={this.props.payrolls.isLoading} payrollsErrMess={this.props.payrolls.errMess}  />} />
                <Redirect to="/staffs" />
              </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));