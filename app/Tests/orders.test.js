const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const { ordersModel } = require("../Models/orders.model");

describe("Orders Controller – Current Behavior Tests", () => {

  /* ---------------- PLACE ORDER ---------------- */

  describe("POST /orders/placeOrder", () => {

    it("should create order with valid payload", async () => {
      const payload = {
        customer: {
          name: "Vedant",
          address: "Pune",
          phone: "9876543210"
        },
        items: [
          {
            itemId: new mongoose.Types.ObjectId().toString(),
            name: "Burger",
            price: 100,
            quantity: 2
          }
        ]
      };

      const res = await request(app)
        .post("/orders/placeOrder")
        .send(payload);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("orderId");
      expect(res.body.totalAmount).toBe(200);
    });

    it("should return 500 if customer name is missing", async () => {
      const payload = {
        customer: {
          address: "Pune",
          phone: "9876543210"
        },
        items: [
          {
            itemId: new mongoose.Types.ObjectId().toString(),
            name: "Burger",
            price: 100,
            quantity: 1
          }
        ]
      };

      const res = await request(app)
        .post("/orders/placeOrder")
        .send(payload);

      expect(res.statusCode).toBe(500);
    });

    it("should return 500 if items array is empty", async () => {
      const payload = {
        customer: {
          name: "Vedant",
          address: "Pune",
          phone: "9876543210"
        },
        items: []
      };

      const res = await request(app)
        .post("/orders/placeOrder")
        .send(payload);

      expect(res.statusCode).toBe(500);
    });
  });

  /* ---------------- GET ORDERS ---------------- */

  describe("GET /orders/getOrders", () => {
    it("should return list of orders", async () => {
      await ordersModel.create({
        customer: {
          name: "Test",
          address: "Addr",
          phone: "9999999999"
        },
        items: [
          {
            itemId: new mongoose.Types.ObjectId(),
            name: "Pizza",
            price: 250,
            quantity: 1
          }
        ],
        totalAmount: 250,
        status: "Order Received"
      });

      const res = await request(app).get("/orders/getOrders");

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.list)).toBe(true);
      expect(res.body.list.length).toBe(1);
    });
  });

  /* ---------------- UPDATE STATUS ---------------- */

  describe("PATCH /orders/:orderId/status", () => {

    it("should update order status when valid", async () => {
      const order = await ordersModel.create({
        customer: {
          name: "Vedant",
          address: "Pune",
          phone: "9876543210"
        },
        items: [
          {
            itemId: new mongoose.Types.ObjectId(),
            name: "Coffee",
            price: 80,
            quantity: 1
          }
        ],
        totalAmount: 80,
        status: "Order Received"
      });

      const res = await request(app)
        .patch(`/orders/${order._id}/status`)
        .send({ status: "Preparing" });

      expect(res.statusCode).toBe(200);

      const updated = await ordersModel.findById(order._id);
      expect(updated.status).toBe("Preparing");
    });

    it("should still return 200 for invalid status (current behavior)", async () => {
      const order = await ordersModel.create({
        customer: {
          name: "Vedant",
          address: "Pune",
          phone: "9876543210"
        },
        items: [
          {
            itemId: new mongoose.Types.ObjectId(),
            name: "Tea",
            price: 30,
            quantity: 1
          }
        ],
        totalAmount: 30,
        status: "Order Received"
      });

      const res = await request(app)
        .patch(`/orders/${order._id}/status`)
        .send({ status: "Delivered" }); // invalid but ignored

      expect(res.statusCode).toBe(200);
    });

    it("should return 404 for invalid orderId format", async () => {
      const res = await request(app)
        .patch("/orders/123/status")
        .send({ status: "Preparing" });

      expect(res.statusCode).toBe(404);
    });
  });

});
