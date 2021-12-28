import jwt from 'jsonwebtoken';

const secret = 'test'

//next is do something and then move on the to the next thing
const auth = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization.split(" ")[1];     //Getting the token from the frontend
        const isCustomAuth = token.length < 500;            //to check whether its our token(>500) or googles token(<500)
    
        let decodedData;

        if(token && isCustomAuth){      //if we have the token and it is our own token and not googles
            decodedData = jwt.verify(token, secret);     //Is going to give us the data from each specific token of the person and their ID so now we know which user is liking things or deleting

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;  //googles name for a specific id that differentiates every single google user like an ID
        }

        /**If a user wants to like a post they would have to like the button and in the middleware it will go andf check auth
         * and then it will see if they are authorized to do so if they are then they will go through the next() to the like controller
         */
        next();
    } catch (error) {   
        console.log(error);
    }
}

export default auth;