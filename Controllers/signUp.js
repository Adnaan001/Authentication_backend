const Auth=require('../Models/authSchema');
const bcrypt=require('bcrypt');


exports.signUp=async (req,res)=>{
    const {name,email,password,role}=req.body;
    try{
        const emailchk=await Auth.findOne({email});

        if(emailchk)
        {
            return res.status(208).json(
                {
                    message:"Email already exists"
                }
            )
        }
    try{
        const hashedPassword=await bcrypt.hash(password,10);     

        const response=await Auth.create(
            {
                name,
                email,
                password:hashedPassword,
                role
            }
        );

        return res.status(200).json(
            {
                success:true,
                message:"Account created successfully",
                response:response
            }
        )
    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"Error while storing data in DB",
                Error:e.message
            }
        )
    }


    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"Error while chk",
                Error:e.message
            }
        )
    }


}