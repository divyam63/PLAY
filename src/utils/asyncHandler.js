
//highet order function to handle async errors
// fn=> extract (req,res,next) from controller 
//wrapper function

// const asyncHandller = (fn) => (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch(next);
// };

const asyncHandller =(fn)=>async(req,res,next) =>{
    try{
        await fn(req,res,next);
    } catch (error) {
        res.status(error.code || 500).json({message:error.message || "Internal Server Error"});

    }
}




export default asyncHandller;