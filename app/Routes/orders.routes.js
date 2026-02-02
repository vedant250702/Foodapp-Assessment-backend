const express=require("express")
const router=express.Router()
const {getOrders,placeOrder,updateOrderStatus}=require("../Controllers/orders.controller")
const {placeOrderValidator,updateOrderStatusValidator}=require("../Validators/orders.validator")

router.route("/getOrders").get(getOrders)

router.route("/placeOrder").post(placeOrderValidator,placeOrder)

router.patch("/:orderId/status", updateOrderStatusValidator, updateOrderStatus);

const ordersRouter=router
module.exports={ordersRouter}