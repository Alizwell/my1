import api from './api.service';

export const getProject = ({
    bUGUID,
    projGUID,
    levelCodes,
    dataFilter
})=>{
    return api.get('/api/ProjectBase/ProjectInfoQuery', {
        params: {
            bUGUID,
            projGUID,
            levelCodes,
            dataFilter
        }
    })
}

export const getProject2 = ( {
    userCode
} ) => {
    return api.get( '/api/ProjectBase/ProjectInfoQuery2', {
        params: {
            userCode
        }
    } )
}
