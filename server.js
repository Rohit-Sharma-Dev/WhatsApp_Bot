const express = require('express')
const path= require('path');
const connectDB= require('./config/db')
const Answers = require('./schema/Answer')

const app = express()
connectDB()
app.use(express.json({extended:false}))




app.get('/',async(req,res)=>{

    res.send("Api is running")
})
app.post('/answer',async(req,res)=>{
const answer = new Answers({
    userName:req.body.userName,
    answers : req.body.answers
})
    await answer.save()
    res.send("saved")
})


app.use('/api/questions',require('./routs/api/question'))



const PORT = process.env.PORT || 2000 ;


app.listen(PORT,()=> console.log(`server is running on port ${PORT}`))


















// id:191725715449-5jdmrm34gq3r6em2j0aapjarlskdhtuq.apps.googleusercontent.com
// secret:K91nr9IynZZgiIeuhqD8WrLo
// 1BfC2cLzfzqPxA9ARHPJGn28pBj2-7h8IYkoK2rC7ego