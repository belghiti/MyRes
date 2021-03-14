const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const order_entriesSchema = new Schema({
   
    product_id : {
        type: Schema.Types.ObjectId,
        ref : 'Product',
        required : true
    },
    order_id : {
        type: Schema.Types.ObjectId,
        ref : 'Order',
        required : true
    },
    quantity : {
        type:Number,
        required:true
    }
   
 
   
   
});

module.exports = mongoose.model('Order_Entries',order_entriesSchema);