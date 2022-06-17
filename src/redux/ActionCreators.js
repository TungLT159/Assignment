import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl'

export const addStaff = (staff) => ({
    type: ActionTypes.ADD_STAFF,
    payload: staff
})

export const postStaff = (name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, salary) => (dispatch) => {
    const newStaff = {
        name: name,
        doB: doB,
        salaryScale: salaryScale,
        startDate: startDate,
        departmentId: departmentId,
        annualLeave: annualLeave,
        overTime: overTime,
        salary: salary,
    }
    newStaff.image = '/assets/images/alberto.png'
    return fetch(baseUrl + 'staffs', {
            method: 'POST',
            body: JSON.stringify(newStaff),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        .then(res => {
                if (res.ok) {
                    return res
                } else {
                    let err = new Error('Error ' + res.status + ': ' + res.statusText)
                    err.res = res
                    throw err
                }
            },
            err => {
                let errmess = new Error(err.message)
                throw errmess
            })
        .then(res => res.json())
        .then(res => {
            dispatch(addStaff(res))
            alert('Thêm thành công!')
        })
        .catch(error => {
            console.log('Đã xảy ra lỗi: ', error.message)
            alert(error.message)
        })
}

export const removeStaff = (staffRemove) => ({
    type: ActionTypes.DELETE_STAFF,
    payload: staffRemove
})

export const deleteStaff = (staffId) => (dispatch) => {
    fetch(baseUrl + `staffs/${staffId}`, { method: 'DELETE' })
        .then(res => {
                if (res.ok) {
                    return res
                } else {
                    let err = new Error('Error ' + res.status + ': ' + res.statusText)
                    err.res = res
                    throw err
                }
            },
            err => {
                let errmess = new Error(err.message)
                throw errmess
            })
        .then(res => res.json())
        .then(res => {
            dispatch(removeStaff(res))
            alert('Xóa thành công!')
        })
        .catch(err => err.message)
}


export const newStaff = (newStaff) => ({
    type: ActionTypes.UPDATE_STAFF,
    payload: newStaff
})

export const updateStaff = (id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime) => (dispatch) => {
    const updateStaff = {
        id: id,
        name: name,
        doB: doB,
        salaryScale: salaryScale,
        startDate: startDate,
        departmentId: departmentId,
        annualLeave: annualLeave,
        overTime: overTime,
    }
    return fetch(baseUrl + 'staffs', {
            method: 'PATCH',
            body: JSON.stringify(updateStaff),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        .then(res => {
                if (res.ok) {
                    return res
                } else {
                    let err = new Error('Error ' + res.status + ': ' + res.statusText)
                    err.res = res
                    throw err
                }
            },
            err => {
                let errmess = new Error(err.message)
                throw errmess
            })
        .then(res => res.json())
        .then(res => dispatch(newStaff(res)))
        .catch(error => {
            console.log('Đã xảy ra lỗi: ', error.message)
            alert(error.message)
        })
}

export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true))
    return fetch(baseUrl + 'staffs')
        .then(res => {
                if (res.ok) {
                    return res
                } else {
                    let err = new Error('Error ' + res.status + ': ' + res.statusText)
                    err.res = res
                    throw err
                }
            },
            err => {
                let errmess = new Error(err.message)
                throw errmess
            })
        .then(res => res.json())
        .then(staffs => dispatch(addStaffs(staffs)))
        .catch(err => dispatch(staffsFailed(err.message)))
}

export const staffsLoading = () => ({
    type: ActionTypes.LOADING_STAFFS
})

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
})

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
})

export const fetchDepartments = () => (dispatch) => {
    dispatch(departmentsLoading(true))
    return fetch(baseUrl + 'departments')
        .then(res => {
                if (res.ok) {
                    return res
                } else {
                    let err = new Error('Error ' + res.status + ': ' + res.statusText)
                    err.res = res
                    throw err
                }
            },
            err => {
                let errmess = new Error(err.message)
                throw errmess
            })
        .then(res => res.json())
        .then(departments => dispatch(addDepartments(departments)))
        .catch(err => dispatch(departmentsFailed(err.message)))
}

export const departmentsLoading = () => ({
    type: ActionTypes.LOADING_DEPARTMENTS
})

export const departmentsFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errmess
})

export const addDepartments = (departments) => ({
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: departments
})

export const fetchPayrolls = () => (dispatch) => {
    dispatch(payrollsLoading(true))
    return fetch(baseUrl + 'staffsSalary')
        .then(res => {
                if (res.ok) {
                    return res
                } else {
                    let err = new Error('Error ' + res.status + ': ' + res.statusText)
                    err.res = res
                    throw err
                }
            },
            err => {
                let errmess = new Error(err.message)
                throw errmess
            })
        .then(res => res.json())
        .then(payrolls => dispatch(addPayrolls(payrolls)))
        .catch(err => dispatch(payrollsFailed(err.message)))
}

export const payrollsLoading = () => ({
    type: ActionTypes.LOADING_PAYROLLS
})

export const payrollsFailed = (errmess) => ({
    type: ActionTypes.PAYROLLS_FAILED,
    payload: errmess
})

export const addPayrolls = (payrolls) => ({
    type: ActionTypes.ADD_PAYROLLS,
    payload: payrolls
})