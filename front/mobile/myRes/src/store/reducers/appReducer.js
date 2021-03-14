import authReducer from "./authReducer";
//import cartReducer from "./cartReducer";
import  {combineReducers} from 'redux'
import companyReducer from "./companyReducer";
import categoryCompanyReducer from "./categoryCompany";

const appReducer = combineReducers({
    auth : authReducer,
    companies : companyReducer,
    catCompany : categoryCompanyReducer
    
})

export default appReducer