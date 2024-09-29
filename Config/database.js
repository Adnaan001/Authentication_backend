const mongoose=require('mongoose');

require('dotenv').config()


const dbConnect=()=>
    {
                mongoose.connect(process.env.DB_URL)
                .then(()=>console.log('DB connected successfully'))
                .catch((e)=>console.error("Connection with DB failed due to =>",e.message));
    }


module.exports=dbConnect;