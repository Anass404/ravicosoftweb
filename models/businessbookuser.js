const mongoose = require('mongoose');
//const bcrypt = require('bcrypt-nodejs');
const validator = require('mongoose-unique-validator');

    const businessbookuser = mongoose.Schema({
        createddate:{type:Date,required:false,default:new Date()},
        membershiptype:{type:String,default:'free'},
        membershipexpirydate:Date,
        password:{type:String,required:false,default:Date.now().toString()},
        softwareshouldrun:{type:Boolean,default:true},
        cansendsms:{type:Boolean,default:false},
    })

    businessbookuser.plugin(validator)
module.exports = mongoose.model('businessbookuser',businessbookuser,'businessbookuser');
