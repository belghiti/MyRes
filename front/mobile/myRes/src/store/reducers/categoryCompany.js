const initState = {
    catCompanies: null
}

const categoryCompanyReducer = (state = initState, action) => {
    switch(action.type) {
       
        case 'GET_CATEGORIE_COMPANIES':
                
            //state.token = action.token
            //state.user = action.user
            //console.log(state)
            return {
                ...state,
                catCompanies: action.catCompanies
            }
        default:
            return state
    }
}

export default categoryCompanyReducer