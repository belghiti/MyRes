const initState = {
   Order : []
}

const orderReducer = (state = initState, action) => {
    switch(action.type) {
       
        case 'Get_Order':
            return {
                ...state,
                Order : action.Order
            }
        default:
            return state
    }
}

export default orderReducer