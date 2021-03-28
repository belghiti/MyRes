const initState = {
    product : [],  
    showPopover: false,
    showPopover2: false,
     event: undefined ,
     name:'',
     category_Product_name : [],
     price : '',
     image : null,
     cat_pro_id : "60173921fe4a5216c8330fdf",
     status : "in_stock",
     id_Product : "",
}

const productReducer = (state = initState, action) => {
    switch(action.type) {
       
        case 'GET_PRODUCT':
            return {
                ...state,
                products: action.product
            }
        default:
            return state
    }
}

export default productReducer