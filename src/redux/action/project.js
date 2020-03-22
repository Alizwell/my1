import { SET_BUGUID, SET_PROJGUID, ADD_BUGUID, ADD_PROJGUID, DEL_BUGUID, DEL_PROJGUID} from '../const/project';

export const setBuGUID = payload =>({
    type: SET_BUGUID,
    payload
})

export const setProjGUID = payload =>({
    type: SET_PROJGUID,
    payload
})


export const addBuGUID = payload =>({
    type: ADD_BUGUID,
    payload
})

export const addProjGUID = payload =>({
    type: ADD_PROJGUID,
    payload
})

export const delBuGUID = payload =>({
    type: DEL_BUGUID,
    payload
})

export const  delProjGUID = payload =>({
    type: DEL_PROJGUID,
    payload
})
