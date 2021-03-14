const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const planSchema = new Schema({
    
   name : {
       type : String,
       required : true
   },
   credit_per_month : {
       type : Number,
       required : true
   },
   price_per_month : {
       type : Number,
       required : true
   }
   
});

module.exports = mongoose.model('Plan',planSchema);