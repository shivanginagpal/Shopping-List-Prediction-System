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
  console.log(req.body.list_id);
  List.deleteOne({ _id: req.body.list_id }).then(() =>
    res.json({ success: true })
  );
});

//Create New Shopping List
router.post("/createNewList", passportAuth, (req, res) => {
  console.log("body ", req.body);
  const listFields = {};
  listFields.user = req.user._id;
  listFields.listName = req.body.listName;

  const list = new List(listFields);
  list
    .save()
    .then((list) => res.json(list))
    .catch((err) => console.log(err));
});

router.get("/getList", passportAuth, (req, res) => {
  List.find({ user: ObjectId(req.user._id) })
    .then((result) => {
      console.log("messages retreived", result);
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.end("could not get messages");
    });
});

//Adding Item To List
router.put("/addItemToList", passportAuth, (req, res) => {
  console.log("body ", req.body);
  List.findOne({ _id: req.body.list_id }).then((list) => {
    const newItem = {};
    if (req.body.itemName) newItem.itemName = req.body.itemName;
    if (req.body.quantity) newItem.quantity = req.body.quantity;
    if (req.body.store) newItem.store = req.body.store;
    if (req.body.brandName) newItem.brandName = req.body.brandName;
    if (req.body.price) newItem.price = req.body.price;

    // Add to item array
    list.item.unshift(newItem);

    list.save().then((list) => res.json(list));
  });
});

router.post("/updateItemToList", async (req, res) => {
    console.log("body ", req.body);
    // let i ={};
    // i.itemName = req.body.itemName
    // i.quantity = req.body.Quantity
    // i.brandName = req.body.brandName
    // i.price = req.body.Price
    // i.store = req.body.store
    User.find({
      _id: req.body.id,
      "lists._id": req.body.listid,
    },{
     
    }
    ).then(user => {
      console.log(JSON.stringify(user));
    })
      // await User.findOneAndUpdate(
      //   {
      //     _id: req.body.id,
      //     "lists._id": req.body.listid,
      //     "lists.item._id": req.body.itemid,
      //   },
      //   {
      //     "$set": {
      //       "itemName": i.itemName
      //     },
      //   }
      // )
      //   var input = await User.aggregate([
      //   {
      //     $match: {
      //       _id: ObjectId(req.body.id),
      //     },
      //   },
      //   { $unwind: "$lists" },
      //   {
      //     $match: {
      //       "lists._id": ObjectId(req.body.listid),
      //     },
      //   },
      //   { $unwind: "$lists.item" },
      //   {
      //     $match: {
      //       "lists.item._id": ObjectId(req.body.itemid),
      //     },
      //   },
      //   {
      //     $project : {
      //       item : "$lists.item"
      //     }
      //   }
      //   // {
      //   //   "$set": {
      //   //     "lists.item.itemName": req.body.itemName,
      //   //   },
      //   // },
      // ])
      // .then((user) => {
      //   console.log("this is print" + JSON.stringify(user[0]._id));

      //   res.status(200).json(user);
      // })
      // .catch((err) => res.status(404).json(err));
      //console.log("this is print" + JSON.stringify(input[0].item.quantity));
});

//getting items from the list
router.get("/getitemsfromList", passportAuth, (req, res) => {
  List.findOne({ _id: ObjectId(req.body.list_id) })
    .then((result) => {
      console.log("messages retreived", result);
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.end("could not get messages");
    });
});

//Deleting Item To List
router.delete("/deleteItemFromList", passportAuth, (req, res) => {
  console.log(req.body);

  List.findOne({ _id: req.body.list_id })
    .then((list) => {
      // Get remove index
      const removeIndex = list.item
        .map((item) => item.id)
        .indexOf(req.body.item_id);

      // Splice out of array
      list.item.splice(removeIndex, 1);

      // Save
      list.save().then((list) => res.json(list));
    })
    .catch((err) => res.status(404).json(err));
});

router.post("/updateItemToList", passportAuth, async (req, res) => {
  console.log("body ", req.body);
  let item = {};
  if (req.body.itemName) item.itemName = req.body.itemName;
  if (req.body.quantity) item.quantity = req.body.quantity;
  if (req.body.store) item.store = req.body.store;
  if (req.body.brandName) item.brandName = req.body.brandName;
  if (req.body.price) item.price = req.body.price;
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

module.exports = router;
