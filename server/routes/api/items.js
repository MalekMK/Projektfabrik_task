const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");

// Item model
const Item = require('../../models/Item');

// @router GET api/item
// @desc GET All items
// @access Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ _id: -1 })
    .then(items => res.json(items));
});

// @router UPDATE api/items/:id
// @desc Updates an item
// @access Public
router.post("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => {
        (item.quantity = req.body.quantity),

      item
        .save()
        .then(() => res.json("Item updated!"))
        .catch(err => {
          res.status(400).json(`Error : ${err}`);
        });
    })
    .catch(err => res.status(400).json(`Error : ${err}`));
});

module.exports = router;
