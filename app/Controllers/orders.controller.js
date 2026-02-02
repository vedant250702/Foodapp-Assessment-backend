const { ordersModel } = require("../Models/orders.model");
const { matchedData } = require("express-validator");

// 1. Get all orders
const getOrders=async(req,res)=>{
  try {
    const orders = await ordersModel.find().sort({createdAt:-1});
    res.status(200).json({list:orders});
  } catch(err) {
    res.status(500).json({message:"Server Error"});
  }
};

// 2. Place a new order
const placeOrder=async(req,res)=>{
  try {
    const data = matchedData(req,{locations:['body']});

    const totalAmount = data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = await ordersModel.create({
      customer: data.customer,
      items: data.items,
      totalAmount,
      status: "Order Received"
    });

    res.status(200).json({orderId: newOrder._id,status: newOrder.status,totalAmount});
  } catch(err) {
    res.status(500).json({message:"Server Error"});
  }
};


// 3. Update order status
const updateOrderStatus = async (req,res) => {
  try {
    const data = matchedData(req, {locations:['params','body']}); 

    const order = await ordersModel.findById(data.orderId);
    if (!order) return res.status(404).json({message:"Order not found"});

    order.status = data.status;
    await order.save();

    res.status(200).json({message:"Order Updated Successfully"});
  } catch (err){
    res.status(500).json({message:"Server Error"});
  }
};

module.exports = {getOrders, placeOrder, updateOrderStatus};
