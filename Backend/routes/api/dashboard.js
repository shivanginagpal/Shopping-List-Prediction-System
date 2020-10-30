const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportAuth = passport.authenticate("jwt", { session: false });
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Load User Model
const User = require("../../models/User");
const List = require("../../models/List");

router.get("/noOfLists", passportAuth, (req, res) => {
    List.aggregate([
        {
            $match: {
                user: ObjectId(req.user._id)
            }
        },
        {
            $count : "lists"
        }])
        .then(result => {
            console.log("messages retreived", result);
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
})

router.get("/noOfItemsBought", passportAuth, (req, res) => {
    List.aggregate([
        {
            $match: {
                user: ObjectId(req.user._id)
            }
        },
        {
            $unwind: "$item"
        },{
            $match: {
                "item.bought" : true
            }
        },
        {
            $count : "items"
        }])
        .then(result => {
            console.log("messages retreived", result);
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
})

router.get("/noOfItemstoBuy", passportAuth, (req, res) => {
    List.aggregate([
        {
            $match: {
                user: ObjectId(req.user._id)
            }
        },
        {
            $unwind: "$item"
        },{
            $match: {
                "item.bought" : false
            }
        },
        {
            $count : "items"
        }])
        .then(result => {
            console.log("messages retreived", result);
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
})

router.get("/totalexpenditure", passportAuth, (req, res) => {
    List.aggregate([
        {
            $match: {
                user: ObjectId(req.user._id)
            }
        },
        {
            $unwind: "$item"
        },
        {
            $match: {
            "item.bought":true
             }
         },{
            $group:{
                _id:{user: req.user._id},
                total: {
                    //  $sum: {$multiply:["$item.price","$item.quantity"]}
                    $sum: "$item.price"
                     }
            }
        }])
        .then(result => {
            console.log("messages retreived", result);
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
})

module.exports = router;