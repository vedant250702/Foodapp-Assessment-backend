const express=require("express")
const app=express()
const server=require("http").createServer(app)
const rateLimit = require("express-rate-limit");
const cors=require("cors")
require("dotenv").config()

// RATE LIMIT MIDDLEWARE
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 100,                
  message: "Too many requests, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

// DATABASE IMPORTS
const {connectDB}=require("./app/Configs/db.config")

//SOCKET INTIALIZATION IMPORT
const {initializeSocket}=require("./app/Sockets/sockets")

//CONFIGURATIONS
const PORT= process.env.PORT || 5000


// MIDDLEWARES USED
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:process.env.FRONTEND_BASEURL,credentials:true}))
app.use(limiter);

//ROUTES IMPORTS
const {itemsRouter}=require("./app/Routes/items.routes")
const {ordersRouter}=require("./app/Routes/orders.routes")

app.use("/items",itemsRouter)
app.use("/orders",ordersRouter)


connectDB()
.then(()=>{
    initializeSocket(server)
    server.listen(PORT,()=>{
        console.log("Application is running ")
    })
}).catch((e)=>{
    console.log(e)
})

module.exports=server