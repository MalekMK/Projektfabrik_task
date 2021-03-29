const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item model
const Order = require("../../models/Order");
const User = require("../../models/User");

// @router GET api/orders
// @desc GET All orders
// @access Private
router.get("/", auth, (req, res) => {
  Order.find()
    .sort({ date: -1 })
    .then((orders) => res.json(orders));
});

// @router POST api/orders
// @desc Create an order
// @access Private
router.post("/add", auth, (req, res) => {
  // adding the username of the order
  User.findById(req.user["id"]).then((user) => {
    const newOrder = new Order({
      name: req.body.name,
      quantity: req.body.quantity,
      username: user.name,
      total: req.body.total
    });

    newOrder.save().then((order) => res.json(order));
  });
});

module.exports = router;
