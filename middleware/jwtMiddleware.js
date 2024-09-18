//middleware is used to verify  jsonwebtoken

//import jwt
const jwt = require('jsonwebtoken')


const jwtmiddleware = (req,res,next)=>{
    //logic
    console.log('inside jwt middleware');
    //access token
    const token =req.headers["authorization"].split(' ')[1]
    //  console.log(token);


    //verify
    try {
        
        const jwtResponse = jwt.verify(token,'supersecretkey')
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()

    } catch (error) {
        res.status(401).json('autherization failed...please login',error)
    }
    


   
}

module.exports = jwtmiddleware



// const jwt = require('jsonwebtoken');

// const jwtmiddleware = (req, res, next) => {
//     console.log('inside jwt middleware');

//     // Access token from the authorization header
//     const authHeader = req.headers["authorization"];
    
//     // Check if the authorization header is present
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Authorization token missing or invalid' });
//     }

//     // Extract the token from the Bearer scheme
//     const token = authHeader.split(' ')[1];

//     // Verify the token
//     try {
//         const jwtResponse = jwt.verify(token, 'supersecretkey');
//         console.log(jwtResponse);

//         // Attach the userId to the request for further use
//         req.payload = jwtResponse.userId;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Authorization failed, please login', error });
//     }
// };

// module.exports = jwtmiddleware;
