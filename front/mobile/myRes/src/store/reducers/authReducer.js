const initState = {
    token: null,
    user: null
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
       
        case 'LOGIN_USER':
                
     
            return {
                ...state,
                token: action.token,
                user: action.user
            }
        default:
            return state
    }
}

export default authReducer