const mongoose = require('mongoose');
const NavigusSchema=new mongoose.Schema({
    username:{
        type:String,
    },
    useremail:{
        type:String,
    },
    userphoto:{
        type:String
    },
    userage:{
        type:Number
    },
    UniqueId:{
        type:Number
    },
    userprofession:{
        type:String,
    }
})
const NavigusModel=new mongoose.model("NavigusSchema",NavigusSchema);
module.exports= NavigusModel;