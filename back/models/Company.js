const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const companySchema = new Schema({
    id_User : {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    name_company : {
        type : String,
        required : true
    },
    category_company : {
        type : Schema.Types.ObjectId,
        ref : 'Categories_Company',
        required : true
    },
    currency : {
        type : String,
        required : true

    }

   
});

module.exports = mongoose.model('Company',companySchema);