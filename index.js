const exp=require('express');
const app=exp();

app.use(exp.json());
require('dotenv').config();



const db=require('./Config/database');
db();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use('/api/v1',require('./Routes/route'));


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log('Server started');
}) 

