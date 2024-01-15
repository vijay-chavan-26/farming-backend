
import mongoose from "mongoose";

export const connectDb = () =>{
    try {
        mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })

          console.log("db connected succesfully")
    } catch (error) {
        console.log("error", error)
    }
}