const mongoose = require('mongoose')


const connectionString =  process.env.DATABASE


mongoose.connect(connectionString).then(()=>{
    
    console.log('mongobd conncted successfully');
    
}).catch((err)=>{
    console.log(err);
    
})