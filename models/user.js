const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const user = mongoose.Schema({
    activestatus:{type:String,default:'active'}, //active,deactive
    address:{type:String},
    addresses:[{type:String}], //new added
    createddate:{type:Date,default:new Date()},
    city:{type:String}, //new added
    country:{type:String}, //new added
    currency:String,
    cnicpassport:String, // new added
    designation:{type:String},
    description:{type:String},
    email:{type:String},
    emails:[{type:String}], // new added
    emailverified:String, // new added
    fullname:{type:String},
    facebook:{type:String},
    lastlogindate:{type:Date,default:new Date()},
    loginhistory:[{}],
    image:{type:String},
    linkedin:{type:String},
    parent:{type:mongoose.Schema.Types.ObjectId,ref:"user",default:null},
    phone:{type:String},
    phones:[{type:String}],// new added
    phoneverified:String, // new added
    password:{type:String,required:true},
    passwordresetcode:String, // new added
    role:{type:String},
    skype:{type:String},
    state:String,// new added
    subparent:{type:mongoose.Schema.Types.ObjectId,ref:"user",default:null},// new added
    twitter:{type:String},
    username:{type:String,required:true,unique:true,default:Date.now().toString()},
    website:{type:String},
    whatsapp:{type:String},
    youtube:{type:String},

    //business book fields
    businessbookmembershipplan:{type:String}, // values are '',undefined,Package 1,Package 2,Package 3,Package 4
    businessbookmembershipexpirydate:Date,
    businessbookcanrun:{type:String,default:"yes"},
    //sms plan fields
    smsplan:{type:String},  // values are '',undefined,Package 1,Package 2,Package 3,Package 4
    smsplanbrandname:{type:String},
    smsplanexpirydate:Date,
    smsplansentsms:{type:String},
})

user.plugin(validator)
module.exports = mongoose.model('user',user,'user');
