const initState = {
    companies: null
}

const companyReducer = (state = initState, action) => {
    switch(action.type) {
       
        case 'GET_COMPANIES':
            return {
                ...state,
                companies: action.companies
            }
        default:
            return state
    }
}

export default companyReducer