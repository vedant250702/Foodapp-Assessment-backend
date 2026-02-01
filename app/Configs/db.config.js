const mongoose=require("mongoose")

const connectDB=async()=>{
    await mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database Connected Successfully")
    }).catch((e)=>{
        console.log("MongoDB connectioned failed")
        console.log(e)
    })
}

module.exports={connectDB}