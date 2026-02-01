const express=require("express")
const router=express.Router()
const {body}=require("express-validator")
const {getItems} =require("../Controllers/items.controller")

router.route("/getItems").get(getItems)

const itemsRouter=router
module.exports={itemsRouter}