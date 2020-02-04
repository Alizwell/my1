import api from './api.service';

export const getProject = ({
    bUGUID,
    projGUID,
    levelCodes,
    dataFilter
})=>{
    return api.get('/api/ProjectBase/ProjectInfoQuery', {
        bUGUID,
        projGUID,
        levelCodes,
        dataFilter
    })
}
