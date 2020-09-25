const mongoose = require('mongoose');
const user = mongoose.Schema({
    activestatus:{type:String,required:false,default:'active'},
    createddate:{type:Date,required:false,default:new Date()},
    designation:{type:String,required:false},
    description:{type:String,required:false},
    email:{type:String,required:false},
    emailsecondary:{type:String,required:false},
    fullname:{type:String,required:false},
    facebook:{type:String,required:false},
    lastlogindate:{type:Date,required:false,default:new Date()},
    image:{type:String,required:false},
    linkedin:{type:String,required:false},
    phone:{type:String,required:false},
    phonesecondary:{type:String,required:false},
    password:{type:String,required:true},
    profileimage:{type:String,required:false},
    role:{type:String,required:false},
    skype:{type:String,required:false},
    twitter:{type:String,required:false},
    username:{type:String,required:true},
    website:{type:String,required:false},
    whatsapp:{type:String,required:false},
    youtube:{type:String,required:false},


    //business book fields
    businessbookmembershipplan:{type:String,default:'Package 1'}, // values are Package 1,Package 2,Package 3
    businessbookmembershipexpirydate:Date,
    businessbookcanrun:{type:Boolean,default:true},
    //sms plan fields
    smsplan:{type:String,default:'none'},  // values are none,Package 1,Package 2,Package 3,Package 4
    smsplanbrandname:{type:String},
    smsplanexpirydate:Date,
    smsplansentsms:{type:String},
})
mongoose.models = {}
module.exports = mongoose.model('user',user,'user');
