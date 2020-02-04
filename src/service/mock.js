const createHttpResponse = (status, context, message)=>{
    return {
        HttpContent: context,
        StatusCode: status,
        HttpRequestMessage: message
    }
}

export const login = ()=>{
    return new Promise((resolve, reject)=>{
        resolve(createHttpResponse(200, {}, 'login success'))
    })
}

export const loginFail = ()=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(createHttpResponse(500, {}, 'login fail'))
        }, 2000)
    })
}