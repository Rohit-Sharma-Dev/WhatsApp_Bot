const express = require('express')
const router = express.Router();
const keys = require('../../config/credentials.json')
const {google} = require('googleapis');
const User = require('../../schema/User')
const Answer = require('../../schema/Answer');
const { findOne } = require('../../schema/Answer');
let k = 2;
router.get('/',async(req,res)=>{


    const client = new google.auth.JWT(
        keys.client_email,
        null,
        keys.private_key,
        ['https://www.googleapis.com/auth/spreadsheets']
    )
    client.authorize((err,token)=>{
        if(err){
            console.error(err.message)
            res.send("Server error")
        }else{
            console.log("connected")
            gsrun(client)
        }

    })

  const gsrun = async(cl)=>{
        const gsapi = google.sheets({
            version:'v4',
            auth:cl
        })
        const opt = {
            spreadsheetId:'1iQ9OsiUn7CkRSgmS7ycpFU5647i4FiXFZtdZjmhf448',
            range:`Data!A${k}:c${k}`
        }
        
      const data = await  gsapi.spreadsheets.values.get(opt)
      const mainData=data.data.values[0]
     const question = mainData[0]
     const answer = mainData[1]
     const options = mainData[2].split(',')

    const user = await User.findOne({userId:req.body.userId})
    if (user){
        res.json({question,options})
    }else{
        const user = new User({
            userId:req.body.userId
        })
        await user.save()
        res.json({question,options})

    }
   const ans= await Answer.findOne({question})
   if(!ans){
    const qus = new Answer({
        question,
        answer
    })
    await qus.save()}
    }



    k++

})

module.exports=router;
// 1iQ9OsiUn7CkRSgmS7ycpFU5647i4FiXFZtdZjmhf448