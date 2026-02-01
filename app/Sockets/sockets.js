const {Server}=require("socket.io")

const initializeSocket=(server)=>{
    console.log("Socket initializing ...")
    const io=new Server(server,{cors:process.env.FRONTEND_BASEURL,credentials:true})

    io.on("connection",(socket)=>{
        console.log("Socket Connection successful",socket.id)

        socket.on("notification",(payload)=>{
            socket.broadcast.emit("notification-client",payload)
        })

    })

}

module.exports={initializeSocket}