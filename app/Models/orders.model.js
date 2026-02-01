const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    customer: {
      name: {
        type: String,
        required: true,
        trim: true
      },
      address: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      }
    },

    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          required: true
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: ["Order Received", "Preparing", "Out for Delivery"],
      default: "Order Received"
    }
  })

const ordersModel=mongoose.model("orders",schema)

module.exports={ordersModel}