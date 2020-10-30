const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportAuth = passport.authenticate("jwt", { session: false });
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Load User Model
const User = require("../../models/User");
const List = require("../../models/List");

//get the user
router.get("/getUser", passportAuth, (req, res) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ user: "There is no such user" }));
});

router.delete("/deleteList", passportAuth, (req, res) => {
  //console.log(req.body.list_id);
  List.deleteOne({ _id: req.body.list_id }).then(() =>
    res.status(200).json({ success: true })
  );
});

//Create New Shopping List
router.post("/createNewList", passportAuth, (req, res) => {
  //console.log("body ", req.body);
  const listFields = {};
  listFields.user = req.user._id;
  listFields.listName = req.body.listName;

  const list = new List(listFields);
  list
    .save()
    .then((list) => res.status(200).json(list))
    .catch((err) => console.log(err));
});

router.get("/getList", passportAuth, (req, res) => {
  //console.log("body :", req.user._id);
  List.find({ user: ObjectId(req.user._id) })
    .then((result) => {
      console.log("messages retreived", result);
      //res.end(JSON.stringify(result));
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.end("could not get messages");
    });
});

router.put("/addItemToList", passportAuth, (req, res) => {
  //console.log("body ", req.body);
  List.findOne({ _id: req.body.list_id }).then((list) => {
    const newItem = {};
    if (req.body.itemName) newItem.itemName = req.body.itemName;
    if (req.body.quantity) newItem.quantity = req.body.quantity;
    if (req.body.store) newItem.store = req.body.store;
    if (req.body.brandName) newItem.brandName = req.body.brandName;
    if (req.body.price) newItem.price = req.body.price;
    if (req.body.product_id) newItem.product_id = req.body.product_id;

    // Add to item array
    list.item.unshift(newItem);
    list.save().then((list) => res.status(200).json(list));
  });
});

//getting items from the list
router.put("/getitemsfromList", passportAuth, (req, res) => {
  console.log("In ")
  List.findOne({ _id: ObjectId(req.body.list_id) }, { "item": 1, "_id": 0 })
    .then((result) => {
      console.log("messages retreived", result);
      //res.end(JSON.stringify(result));
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.end("could not get messages");
    });
});

//Deleting Item To List
router.delete("/deleteItemFromList", passportAuth, (req, res) => {
  //console.log(req.body);

  List.findOne({ _id: req.body.list_id })
    .then((list) => {
      // Get remove index
      const removeIndex = list.item
        .map((item) => item.id)
        .indexOf(req.body.item_id);

      // Splice out of array
      list.item.splice(removeIndex, 1);

      // Save
      list.save().then((list) => res.status(200).json(list));
    })
    .catch((err) => res.status(404).json(err));
});

router.post("/updateItemToList", passportAuth, async (req, res) => {
  //console.log("body ", req.body);
  let item = {};
  if (req.body.itemName) item.itemName = req.body.itemName;
  if (req.body.quantity) item.quantity = req.body.quantity;
  if (req.body.store) item.store = req.body.store;
  if (req.body.brandName) item.brandName = req.body.brandName;
  if (req.body.price) item.price = req.body.price;
  if (req.body.product_id) item.product_id = req.body.product_id;

  await List.findOneAndUpdate(
    { _id: req.body.list_id, "item._id": req.body.item_id },
    {
      $set: { "item.$": item },
    },
    {
      new: true,
    }
  )
    .then((list) => res.status(200).json(list))
    .catch((err) => res.status(404).json(err));
});

router.post("/buyItemFromList", passportAuth, (req, res) => {
  List.update(
    {
      _id: req.body.list_id,
      "item._id": req.body.item_id,
    },
    {
      $set: {
        "item.$.bought": true,
      },
    }
  )
    .then((list) => res.status(200).json(list))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
