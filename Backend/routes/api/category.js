const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportAuth = passport.authenticate('jwt', { session: false });

const Category = require('../../models/Category');


//get all categories
router.get('/categories', function(req, res) {
    Category.aggregate([


        {
            $lookup:{
                from: "items",       
                localField: "name",   
                foreignField: "category",          
       as: "category_name" ,        
            }
        },
    ]);
    console.log("getting all categories");
    Category.find({})
        .exec(function(err, categories) {
            if (err) {
                res.send('error has occured');
            } else {
                console.log(categories);
                res.json(categories);
            }
        });
});
//get an categories with categories id
router.get('/categories/:id', function (req, res) {
    console.log('getting one categories');
    Category.findOne({
        _id: req.params.id
    })
        .exec(function (err, categories) {
            if (err) {
                res.send('error occurred');
            } else {
                console.log(categories);
                res.json(categories);
            }
        });
});
//create an Category
router.post('/categories', function (req, res) {
    var newCategory= new Category();
    newCategory.name = req.body.name;
    newCategory.description = req.body.description;
    newCategory.save(function (err, categories) {
        if (err) {
            res.send('error saving categories');
        } else {
            console.log(categories);
            res.send(categories);
        }
    });
});

//update an Category
router.put('/categories/:id', function (req, res) {
    Category.findByIdAndUpdate({
        _id: req.params.id
    },
        { $set: { name: req.body.name , quantity: req.body.quantity  , price: req.body.price, category: req.body.category }},
        { upsert: true },
        function (err, categories) {
            if (err) {
                res.send('error occured');
            } else {
                console.log(categories);
                res.status(204).send();
            }
        });
});

//deleting an Category
router.delete('/categories/:id', function (req, res) {
    Category.findOneAndRemove({
        _id: req.params.id
    },
        function (err, categories) {
            if (err) {
                console.send('error deleteng');
            } else {
                console.log(categories);
                res.status(204);
            }
        });
});

module.exports = router;