const {itemsModel} = require("../Models/items.model")

const getItems=async(req,res)=>{
    try{

        let data=await itemsModel.find({})
        res.status(200).json(data)

    }catch(e){
        console.log(e)
        res.status(500).json({message:"Server Error"});
    }
}


module.exports={getItems}