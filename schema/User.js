const mongoose = require ('mongoose');

const UserShcema = new mongoose.Schema({
    userId:{
        type: String,
        required : true
    },
    question : {
        type : Number
    },
    score:{
        type : Number
    }
});


module.exports=User=mongoose.model('user',UserShcema)