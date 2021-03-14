const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    
    name : {
        type : String,
        max : 255 ,
        required : true
    },
   
    email : {
        type: String,
        max : 255 ,
        min : 6,
        required : true
        
    },
    users : [
        {
            id: {type : String}
        }
    ],
    worksAt : [
        {
            id: {type : String}
        }
    ],
    
    password : {
        type: String,
        max : 255 ,
        min : 6,
        required : true
    },
    phone_number : {
        type:String,
        required : true 
    },
    id_Role :{
        type: Schema.Types.ObjectId,
        ref : 'Role',
        default : "6005b183cc0ce218846d55dd"
    },
    id_Plan :{
        type: Schema.Types.ObjectId,
        ref : 'Plan'
    }
   
   
});

module.exports = mongoose.model('User',userSchema);