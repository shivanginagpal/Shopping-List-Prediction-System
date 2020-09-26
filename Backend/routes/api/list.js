const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportAuth = passport.authenticate('jwt', { session: false });
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Load User Model
const User = require('../../models/User');
const List = require('../../models/List');

//get the user
router.get('/getUser',
    passportAuth,
    (req,res) => {
        User.findOne({ _id: req.user._id }).then(
            user => res.json(user)
        ).catch(err =>
            res.status(404).json({ user: 'There is no such user' })
          );
    }
)

//Create New Shopping List
router.post(
    '/createNewList',
    passportAuth,
    (req, res) => {

        console.log("body ", req.body);

        User.findOne({ _id: req.user._id }).then(user => {
            const newList = {
                listName: req.body.listName
            };

            console.log(user);

            // Add to lists array
            user.lists.unshift(newList);
            //console.log(user);
            user.save().then(user => res.json(user));
        });
    }
);

router.post('/addList',(req, res) => {
    console.log('body ', req.body);
    User.findOne({_id: req.body.id}).then(user => {
        const newList = {
          listName: req.body.listName,
        };
        user.lists.unshift(newList);
        user.save().then(lists => res.status(200).json(lists))
        //res.sendStatus(200)
    })
})

router.put("/getList", (req, res) => {
    User.aggregate([
      {
        $match: {
          "_id": ObjectId(req.body.id),
        },
      },
      {
        $unwind: "$lists",
      },
      {
        $project: {
          lists: "$lists",
        },
      },
    ])
      .then((result) => {
        console.log("messages retreived", result);
        res.end(JSON.stringify(result));
      })
      .catch((err) => {
        console.log(err);
        res.end("could not get messages");
      });
})

router.delete(
    '/deleteList/:list_id',
    passportAuth,
    (req, res) => {

        console.log("body ", req.body);

        User.findOne({ _id: req.user._id }).then(user => {
            const removeList = user.lists
                .map(item => item.id)
                .indexOf(req.params.list_id);

            console.log(removeList);
            console.log(req.params.list_id);
            user.lists.splice(removeList, 1);
            console.log(user);
            //save
            user.save().then(user => res.json(user));
        })
            .catch(err => res.status(404).json(err));
    }
);

//Adding Item To List
router.post('/addItemToList',(req, res) => {
        console.log("body ", req.body);
        User.updateOne(
            { "_id": req.body.id, "lists._id": req.body.listid },
                {
                    "$push":
                    {
                        "lists.$.item":
                        {
                            "itemName": req.body.itemName,
                            "quantity": req.body.Quantity,
                            "brandName":req.body.brandName,
                            "price":req.body.Price,
                            "store" : req.body.store
                        }
                    }
            })
            .then(user => res.status(200).json(user))
            .catch(err => res.status(404).json(err));
    }
);

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
router.put("/getitemsfromList", (req, res) => {
  User.aggregate([
    {
      $match: {
        _id: ObjectId(req.body.id),
      },
    },
    {
      $unwind: "$lists",
    },
    {
      $match: {
        "lists._id": ObjectId(req.body.listid),
      },
    },
    {
      $unwind: "$lists.item",
    },{
        $project: {
            items:"$lists.item"
        }
    }
  ])
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
router.delete('/deleteItemFromList',(req,res) => {
        console.log(req.body);
        User.updateOne(
            { "_id": req.body.id, 
            "lists._id": req.body.listid},
                {
                    "$pull":
                    {
                        "lists.$.item": {_id:req.body.itemid}   
                    }
                }
        ).then(user => {
            res.json(user);
            //console.log(user)
        }
        )
        .catch(err => res.status(404).json(err));
    }
)

module.exports = router;