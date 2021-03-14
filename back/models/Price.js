const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const priceSchema = new Schema({
   value : {
       type: Number,
       required: true
   },
   currency : {
       type : String,
       required: true
   }
   
 
   
   
});

module.exports = mongoose.model('Price',priceSchema);