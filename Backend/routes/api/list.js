const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportAuth = passport.authenticate('jwt', { session: false });
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Load User Model
const User = require('../../models/User');

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
                        "lists.$[].item":
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
router.post(
    '/deleteItemFromList',
    passportAuth,
    (req,res)=>{
        console.log(req.body);

        User.updateOne(
            { "_id": req.user._id, 
            "lists._id": req.body.list_id},
                {
                    "$pull":
                    {
                        "lists.$.item": {_id:req.body.item_id}   
                    }
                }
        ).then(user => {
            res.json(user);
            console.log(user)}
        )
        .catch(err => res.status(404).json(err));
    }
)

module.exports = router;