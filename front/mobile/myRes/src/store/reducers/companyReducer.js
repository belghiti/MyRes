const initState = {
    companies: null
}

const companyReducer = (state = initState, action) => {
    switch(action.type) {
       
        case 'GET_COMPANIES':
                
            //state.token = action.token
            //state.user = action.user
            //console.log(state)
            return {
                ...state,
                companies: action.companies
            }
        default:
            return state
    }
}

export default companyReducer