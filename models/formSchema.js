const  mongoose= require('mongoose')


const formSchema= new mongoose.Schema({

    fullname:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true,
       
    },
    phone:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        
    },

   
    userId:{
        type:String,
        required:true

    }
   
})


const griviences = mongoose.model("griviences",formSchema)
module.exports = griviences