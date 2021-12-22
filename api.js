const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

var { customer } = require('../model/customer')
var { vendor } = require('../model/vendor')

const mongoose = require('mongoose')
const db = "mongodb://localhost:27017/ecommerce-web"
mongoose.connect(db, err => {
  if (err) {
    console.log("error" + err)
  }
  else {
    console.log("mongoDb is connected")
  }
})

router.get('/', (req, res) => {
  res.send("from server api")
})
//add customers
router.post('/customerSignup', async (req, res) => {

  let getInfo = req.body
  console.log(getInfo)
  let oldUser = await customer.findOne({ email: getInfo.email });
  if (oldUser) {
    res.status(409).send("Alreadt Exist Email id")
  }
  else {
    let checkMobile = await customer.findOne({ phoneNumber: getInfo.phoneNumber });
    console.log(getInfo)
    if (checkMobile) {
      res.status(409).send("Mobile Number already Exist")
    }
    else {

      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(req.body.password, salt);
      var newCustomer = new customer({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        password: hash,
        email: req.body.email,
        shippingAddress: req.body.shippingAddress,
        billingAddress: req.body.billingAddress,
      })
      console.log(newCustomer),
        newCustomer.save((err) => {
          if (err) {
            console.log(err)
          } else {
            res.status(200).send("Customer added succesfully...")
          }
        })
    }
  }

})
//add vendors
router.post('/vendorSignup' ,async (req, res) => {
  let getInfo = req.body
  let oldUserCheck = await vendor.findOne({ phoneNumber: getInfo.phoneNumber });
  if (oldUserCheck) {
    res.status(409).send("Mobile  number already Exist")
  } else {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    var newVendor = new vendor({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      password: hash
    })
    newVendor.save((err) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).send("vendor added successfully...")
      }
    })
  }
})
//login
router.post('/login', async (req, res) => {

  let password = req.body.password
  
  let checkCus = await customer.findOne({ phoneNumber: req.body.phoneNumber });
  let checkVen = await vendor.findOne({ phoneNumber: req.body.phoneNumber });
  console.log(checkCus)
  console.log(checkVen)
  if (checkCus) {

    let hash = checkCus.password
    let check = bcrypt.compareSync(password, hash)
    if (check == true) {
      let payload = { subject: checkCus._id }
      let token = jwt.sign(payload, 'secretkey')
      let tok  = {"token": token ,"role":"customer"}
      res.send(tok )

    } else {

      res.status(400).send('Invalid password')

    }
  }
  else if (checkVen) {
    let password = req.body.password
    let vendorPassword = checkVen.password
    const check = bcrypt.compareSync(password, vendorPassword)
    console.log(check)
    if (check == true) {
      let payload = { subject: checkVen._id }
      let token = jwt.sign(payload, 'secretkey')
      let tok  = {"token": token ,"role":"vendor"}
      res.send(tok )
    } else {

      res.status(401).send("Invalid Password")
    }
  }
  else {
    res.status(401).send("Invalid mobile number")
  }

})
module.exports = router