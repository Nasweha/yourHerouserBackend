// import dotenv
require('dotenv').config()

// import express
const express = require('express')

// import cors
const cors = require('cors')
const router = require('./router')
require('./DB/conncetion')

//create server
const superheroServer = express()

superheroServer.use(cors())

superheroServer.use(express.json())

superheroServer.use(router)


// port
const PORT = 3000 || process.env.PORT

// run server
superheroServer.listen(PORT,()=>{
    console.log((` superhero server running successfully at port ${PORT}`));
    
})




