const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categoriesCompanySchema = new Schema({
 
    name : {
        type : String,
        required : true
    },
  
});

module.exports = mongoose.model('Categories_Company',categoriesCompanySchema);