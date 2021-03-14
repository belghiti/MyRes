/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const subscribeSchema = new Schema({
    id_Customer : {
        type: Schema.Types.ObjectId,
        ref : 'Customer',
        required : true
    },
    id_Plan : {
        type: Schema.Types.ObjectId,
        ref : 'Plan',
        required : true
    },
    sucscribe_start : {
        type : Date,
        default : Date.now(),
        required : true
    },
    subscribe_end : {
        type : Date,
        required : true
    }
   
   
   
   
});

module.exports = mongoose.model('Subscribe',subscribeSchema);*/