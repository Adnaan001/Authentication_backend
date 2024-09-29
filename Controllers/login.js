const Auth=require('../Models/authSchema');
const bcrypt=require('bcrypt');
const cookie=require('cookie');
const jwt=require('jsonwebtoken');

require('dotenv').config();

exports.login=async (req,res)=>{

    const{email,password}=req.body;

    if(!email || !password)
    {
        return res.status(400).json(
            {
                message:"Please fill the details"
            }
        )
    }

    try{   
        let userRes=await Auth.findOne({email});
        if(!userRes)
        {
            return res.status(400).json(
                {
                    message:"Dont have an account ? signUp!!!"
                }
            )
        }
        console.log('userRes=>',userRes);
        const payload={
            email:email,
            id:userRes._id,
            role:userRes.role
        }

        if(await bcrypt.compare(password,userRes.password))
        {
            console.log("password matched, creating token")
            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'2h'});
            userRes=userRes.toObject();
            userRes.token=token;
            userRes.password="";

            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }
            return res.cookie('myCookie',token,options).status(200).json(
                {
                    success:true,
                    token:token,
                    userRes:userRes
                }
            )

        }

        return res.status(400).json(
            {
                message:"Password doesn't match"
            }
        )
    }catch(e)
    {
        console.error('Error while finding email=>',e.message)

        return res.status(400).json(
            {
                success:false,
                message:"Error while finding the email in DB",
                Error:e.message
            }
        )
    }

}