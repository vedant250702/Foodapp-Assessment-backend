const { body, param } = require("express-validator");

// Validations to be done before the placing the order.
const placeOrderValidator = [
  body("customer.name")
    .notEmpty()
    .withMessage("Customer name is required")
    .isString()
    .withMessage("Customer name must be a string"),

  body("customer.address")
    .notEmpty()
    .withMessage("Customer address is required")
    .isString()
    .withMessage("Customer address must be a string"),

  body("customer.phone")
    .notEmpty()
    .withMessage("Customer phone is required")
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),

  body("items")
    .isArray({ min: 1 }).withMessage("At least one item is required"),

  body("items.*.itemId")
    .notEmpty().withMessage("Item ID is required")
    .isMongoId().withMessage("Invalid item ID"),
  
  body("items.*.name")
    .notEmpty().withMessage("Item name is required")
    .isString().withMessage("Item name must be a string"),

  body("items.*.price")
    .notEmpty().withMessage("Item price is required")
    .isFloat({ min: 0 }).withMessage("Price must be a positive number"),

  body("items.*.quantity")
    .notEmpty().withMessage("Quantity is required")
    .isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
];


const validStatuses = ["Order Received", "Preparing", "Out for Delivery"];

const updateOrderStatusValidator = [
  // Validate orderId in URL
  param("orderId")
    .notEmpty()
    .withMessage("Order ID is required")
    .isMongoId()
    .withMessage("Invalid order ID"),

  // Validate new status in body
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(validStatuses)
    .withMessage(`Status must be one of: ${validStatuses.join(", ")}`)
];


const getOrderByIdValidator = [
  param("orderId")
    .notEmpty()
    .withMessage("Order ID is required")
    .isMongoId()
    .withMessage("Invalid order ID")
];

module.exports = { placeOrderValidator, updateOrderStatusValidator, getOrderByIdValidator };
