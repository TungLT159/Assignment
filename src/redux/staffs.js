import * as ActionTypes from './ActionTypes';

export const Staffs = (state = {
    isLoading: true,
    errMess: null,
    staffs: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_STAFFS:
            return {...state, isLoading: false, errMess: null, staffs: action.payload }
        case ActionTypes.LOADING_STAFFS:
            return {...state, isLoading: true, errMess: null, staffs: [] }
        case ActionTypes.STAFFS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, staffs: [] }
        case ActionTypes.ADD_STAFF:
            let staff = action.payload
            return {...state, staffs: staff }
        case ActionTypes.DELETE_STAFF:
            let staffRemove = action.payload
            return {...state, staffs: staffRemove }
        case ActionTypes.UPDATE_STAFF:
            let newStaff = action.payload
            return {...state, staffs: newStaff }
        default:
            return state
    }
}