const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    imageSrc:{
        type:String,
        required:true
    }
    // ,
    // isAvailable: {
    //   type: Boolean,
    //   default: true
    // }
  })

const itemsModel=mongoose.model("items",schema)

module.exports={itemsModel}