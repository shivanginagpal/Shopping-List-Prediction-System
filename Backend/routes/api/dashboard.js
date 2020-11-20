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
         },
         {
            $group:{
                _id:{user: req.user._id},
                total: {
                      $sum: {$multiply:["$item.price","$item.quantity"]}
                    //$sum: "$item.price"
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

router.get("/monthlyCostcoExp", passportAuth, (req, res) => {
    List.aggregate([
        {
            $match: {
                user: ObjectId(req.user._id)
            }
        },{
            $unwind: "$item"
        },{
            $match: {
            "item.bought":true,
            "item.store":"costco"
             }
         },
         {
             $project: {
                month: {"$month" : "$item.date"},
                item:"$item"
             }
         },
         {
            $group:{
                _id:"$month",
                total: {
                      $sum: {$multiply:["$item.price","$item.quantity"]}
                    //$sum: "$item.price"
                     }
            }
        },{
            $sort:{_id:1}
        }
    ]).then(result => {
            console.log("messages retreived", result);
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
})

router.get("/monthlyWalmartExp", passportAuth, (req, res) => {
    List.aggregate([
        {
            $match: {
                user: ObjectId(req.user._id)
            }
        },{
            $unwind: "$item"
        },{
            $match: {
            "item.bought":true,
            "item.store":"walmart"
             }
         },
         {
             $project: {
                month: {"$month" : "$item.date"},
                item:"$item"
             }
         },
         {
            $group:{
                _id:"$month",
                total: {
                      $sum: {$multiply:["$item.price","$item.quantity"]}
                    //$sum: "$item.price"
                     }
            }
        },{
            $sort:{_id:1}
        }
    ]).then(result => {
            console.log("messages retreived", result);
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
})

router.get("/monthlyWholefoodsExp", passportAuth, (req, res) => {
    List.aggregate([
        {
            $match: {
                user: ObjectId(req.user._id)
            }
        },{
            $unwind: "$item"
        },{
            $match: {
            "item.bought":true,
            "item.store":"wholefoods"
             }
         },
         {
             $project: {
                month: {"$month" : "$item.date"},
                item:"$item"
             }
         },
         {
            $group:{
                _id:"$month",
                total: {
                      $sum: {$multiply:["$item.price","$item.quantity"]}
                    //$sum: "$item.price"
                     }
            }
        },{
            $sort:{_id:1}
        }
    ]).then(result => {
            console.log("messages retreived", result);
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
})

router.get("/monthlyExpenditure", passportAuth, (req, res) => {
    List.aggregate([
        {
            $match: {
                user: ObjectId(req.user._id)
            }
        },{
            $unwind: "$item"
        },{
            $match: {
            "item.bought":true,
             }
         },
         {
             $project: {
                month: {"$month" : "$item.date"},
                item:"$item"
             }
         },
         {
            $group:{
                _id:"$month",
                total: {
                      $sum: {$multiply:["$item.price","$item.quantity"]}
                     }
            }
        },{
            $sort:{_id:1}
        }
    ]).then(result => {
            console.log("messages retreived", result);
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
})

router.get("/weekdaysExpenditure", passportAuth, (req, res) => {
    List.aggregate([
        {
            $match: {
                user: ObjectId(req.user._id)
            }
        },{
            $unwind: "$item"
        },{
            $match: {
            "item.bought":true,
             }
         },
         {
             $project: {
            dayOfWeek: { $dayOfWeek: "$date" },
            item:"$item"
                }
         },
         {
            $group:{
                _id:"$dayOfWeek",
                total: {
                      $sum: {$multiply:["$item.price","$item.quantity"]}
                     }
            }
        },{
            $sort:{_id:1}
        }
    ]).then(result => {
            console.log("messages retreived", result);
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.log(err);
            res.end("could not get messages");
        })

})

router.get("/itemsBoughtPerMonth", passportAuth, (req, res) => {
    List.aggregate([
        {
            $match: {
                user: ObjectId(req.user._id)
            }
        },{
            $unwind: "$item"
        },{
            $match: {
            "item.bought":true,
             }
         },
         {
             $project: {
                month: {"$month" : "$item.date"},
                item:"$item"
             }
         },
         {
            $group:{
                _id:"$month",
                count: {
                    $sum: 1
                }
            }
        },{
            $sort:{_id:1}
        }
    ]).then(result => {
            console.log("messages retreived", result);
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
})

router.get("/itemsBoughtdayofweek", passportAuth, (req, res) => {
    List.aggregate([
        {
            $match: {
                user: ObjectId(req.user._id)
            }
        },{
            $unwind: "$item"
        },{
            $match: {
            "item.bought":true,
             }
         },
         {
             $project: {
                dayOfWeek: { $dayOfWeek: "$date" },
                item:"$item"
             }
         },
         {
            $group:{
                _id:"$dayOfWeek",
                count: {
                    $sum: 1
                }
            }
        },{
            $sort:{_id:1}
        }
    ]).then(result => {
            console.log("messages retreived", result);
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
})

router.get("/categoryCount", passportAuth, (req, res) => {
    List.aggregate([
        {
            $match: {
                user: ObjectId(req.user._id)
            }
        },{
            $unwind: "$item"
        },{
            $match: {
            "item.bought":true,
             }
         },
         {
            $group:{
                _id:"$item.category",
                count: {
                    $sum: 1
                }
            }
        }
    ]).then(result => {
            console.log("messages retreived", result);
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
})


router.get("/categoryExpenditure", passportAuth, (req, res) => {
    List.aggregate([
        {
            $match: {
                user: ObjectId(req.user._id)
            }
        },{
            $unwind: "$item"
        },{
            $match: {
            "item.bought":true,
             }
         },
         {
            $group:{
                _id:"$item.category",
                total: {
                        $sum: {$multiply:["$item.price","$item.quantity"]}
                     }
            }
        }
    ]).then(result => {
            console.log("messages retreived", result);
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
})

router.get("/storeExpenditure", passportAuth, (req, res) => {
    List.aggregate([
        {
            $match: {
                user: ObjectId(req.user._id)
            }
        },{
            $unwind: "$item",
        },{
            $match: {
            "item.bought":true,
             }
         },
         {
            $group:{
                _id: "$item.store",
            total: {
                    $sum: {$multiply:["$item.price","$item.quantity"]}
                    }
            }
        },{
            $sort:{
                _id:1
            }
        }
    ]).then(result => {
            console.log("messages retreived", result);
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
})
module.exports = router;