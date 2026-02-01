const express=require("express")
const app=express()
const server=require("http").createServer(app)
const cors=require("cors")
require("dotenv").config()

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