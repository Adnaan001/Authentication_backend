const exp=require('express');
const { signUp } = require('../Controllers/signUp');
const { login } = require('../Controllers/login');
const { auth, isStudent, isAdmin } = require('../Controllers/protectedRoute');
const route=exp.Router();



route.post('/signUp',signUp);
route.post('/login',login);

route.get('/student',auth,isStudent,(req,res)=>{
    return res.status(200).json(
        {
            success:true,
            message:"You've successfully entered into the student's portal"
        }
    )
}); 

route.get('/admin',auth,isAdmin,(req,res)=>{
    return res.status(200).json(
        {
            success:true,
            message:"You've successfully entered into the admin's portal"
        }
    )
});


module.exports=route;