import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();


const PORT = process.env.PORT || 8000;  

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Error starting the server:", error);
});