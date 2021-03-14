const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderSchema = new Schema({
    user_id : {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    products: [
        {
          name : {
            type: String
          },
          quantity : {
            type : Number,
            default : 1
          },
          price : {
            type : Number
          },
          product : {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Product',
            require:true
          }
        }
      ],
    date : {
        type : String,
        required : true
    },
    total : {
        type:Number,
        required:true
    }
   
 
   
   
});

module.exports = mongoose.model('Order',orderSchema);