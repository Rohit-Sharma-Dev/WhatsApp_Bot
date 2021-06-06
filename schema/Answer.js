const mongoose = require ('mongoose');

const AnswerSchema = new mongoose.Schema({
   question:{
       type:String,
       required: true
   },
   answer: { 
       type:String,
       required:true
   }
});


module.exports=Answers=mongoose.model('answer',AnswerSchema)