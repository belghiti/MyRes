import authReducer from "./authReducer";
//import cartReducer from "./cartReducer";
import  {combineReducers} from 'redux'
import companyReducer from "./companyReducer";
import categoryCompanyReducer from "./categoryCompany";
//import companyReducer from "./companyReducer";
import orderReducer from "./orderReducer";

const appReducer = combineReducers({
    auth : authReducer,
    companies : companyReducer,
    catCompany : categoryCompanyReducer,
    order : orderReducer
    
})

export default appReducer