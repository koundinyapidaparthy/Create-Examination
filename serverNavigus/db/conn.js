const mongoose = require('mongoose');
const DB=process.env.DATABASE
mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex:true
}).then(()=>{console.log("success")}).catch(e=>{console.log(e)})
