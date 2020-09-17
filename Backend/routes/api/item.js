const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportAuth = passport.authenticate('jwt', { session: false });

const Item = require('../../models/Item');


//get all items
router.get('/items', function(req, res) {
    console.log("getting all items");
    Item.find({})
        .exec(function(err, items) {
            if (err) {
                res.send('error has occured');
            } else {
                console.log(items);
                res.json(items);
            }
        });
});
//get an item with item id
router.get('/items/:id', function (req, res) {
    console.log('getting one item');
    Item.findOne({
        _id: req.params.id
    })
        .exec(function (err, items) {
            if (err) {
                res.send('error occurred');
            } else {
                console.log(items);
                res.json(items);
            }
        });
});
//create an item
router.post('/items', function (req, res) {
    var newItem = new Item();
    newItem.name = req.body.name;
    newItem.quantity = req.body.quantity;
    newItem.category = req.body.category;
    newItem.price = req.body.price;


    newItem.save(function (err, item) {
        if (err) {
            res.send('error saving items');
        } else {
            console.log(item);
            res.send(item);
        }
    });
});

//update an item
router.put('/items/:id', function (req, res) {
    Item.findByIdAndUpdate({
        _id: req.params.id
    },
        { $set: { name: req.body.name , quantity: req.body.quantity  , price: req.body.price, category: req.body.category }},
        { upsert: true },
        function (err, newItem) {
            if (err) {
                res.send('error occured');
            } else {
                console.log(newItem);
                res.status(204).send();
            }
        });
});

//deleting an item
router.delete('/items/:id', function (req, res) {
    Item.findOneAndRemove({
        _id: req.params.id
    },
        function (err, item) {
            if (err) {
                console.send('error deleteng');
            } else {
                console.log(item);
                res.status(204);
            }
        });
});

module.exports = router;