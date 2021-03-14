const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const purchaseSchema = new Schema({
    id_Subscribe : {
        type: Schema.Types.ObjectId,
        ref : 'Subscribe',
        required : true
    },
   payment_method : {
       type : String,
       required : true
   }
   
});

module.exports = mongoose.model('Purchases',purchaseSchema);