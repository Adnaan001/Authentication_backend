const Auth=require('../Models/authSchema');
const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.auth=async (req,res,next)=>{
    try{
        // console.log('req is=>',req.cookies);

        const token=req.cookies.myCookie;
        // const token=req.header('Authorization').replace('Bearer ','');

        // console.log('auth token=>',token);
        if(!token)
        {
            return res.status(400).json(
                {
                    message:"Please login or signup again"
                }
            )
        }
        const user=jwt.verify(token,process.env.JWT_SECRET);
        req.body=user;
        console.log("req.body",req.body);
        next();
    }catch(e)
    {
        console.error('Error occured while fetching token from cookie ERROR:=>',e.message);
        return res.status(400).json(
            {
            succes:false,
            message:"Error occured while fetching token from cookie",
            ERROR:e.message
            }
        )
    }
}

exports.isStudent=async (req,res,next)=>{
    try{
        console.log(req.body);
        if(req.body.role!='student')
            {
                return res.status(400).json(
                    {
                        message:"This is a protected route for students anyone other than students is not allowed to login here"
                    }
                )
            }
            next();
    }catch(e)
    {
        console.log('Error while chking the role ERROR:=>',e.message);

        return res.status(400).json(
            {
                success:false,
                message:"Error while chking the role",
                ERROR:e.message
            }
        )
    }
}


exports.isAdmin=async (req,res,next)=>{
    try{
        if(req.body.role!='admin')
            {
                return res.status(400).json(
                    {
                        message:"This is a protected route for admins anyone other than admin is not allowed to login here"
                    }
                )
            }
            next();
    }catch(e)
    {
        console.log('Error while chking the role ERROR:=>',e.message);

        return res.status(400).json(
            {
                success:false,
                message:"Error while chking the role",
                ERROR:e.message
            }
        )
    }
}