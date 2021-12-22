const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { product } = require('../model/product');
var { cardProduct } = require('../model/cardProduct')


router.get('/', (req, res) => {
    product.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving products') }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    product.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving products') }
    });
});

router.post('/', async (req, res) => {
    // let productData = req.body.name
    console.log(req.body)
    let existProduct = await (product.findOne({ name: req.body.name }))
    console.log(existProduct)
    if (existProduct) {
        res.status(409).send("Already exist product")
    }
    else {
        var newProduct = new product({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
        });
        newProduct.save((err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in product Save '); }
        });

    }




});

router.put('/:id', (req, res) => {
    console.log(req.body)
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    else {
        var newProduct = {
            // name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
        };
        console.log(newProduct)
        product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true }, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in product Update '); }
        });

    }
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    product.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in product Delete '); }
    });
});

//cardProduct

router.get('/cardProduct/get', (req, res) => {
    cardProduct.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving products '); }
    });
});
router.delete('/cardProduct/remove/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    cardProduct.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in product Delete '); }
    });
});

router.post('/cardProduct', (req, res) => {
    // let getInfo = req.body
    // let oldProducts = await vendor.findOne({ name: getInfo.name })
    // if(oldProducts){
    //     res.status(409).send("This product is already added to card!!")
    // }
    // else{}

        var newCardProduct = new cardProduct({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
        });
        newCardProduct.save((err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in product Save'); }
        });
  


});

module.exports = router;