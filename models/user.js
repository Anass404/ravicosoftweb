const mongoose = require('mongoose');
const user = mongoose.Schema({
    activestatus:{type:String,required:false,default:'active'},
    createddate:{type:Date,required:false},
    designation:{type:String,required:false},
    description:{type:String,required:false},
    email:{type:String,required:false},
    emailsecondary:{type:String,required:false},
    fullname:{type:String,required:false},
    facebook:{type:String,required:false},
    lastlogindate:{type:Date,required:false},
    image:{type:String,required:false},
    linkedin:{type:String,required:false},
    phone:{type:String,required:false},
    phonesecondary:{type:String,required:false},
    password:{type:String,required:false},
    profileimage:{type:String,required:false},
    role:{type:String,required:false},
    skype:{type:String,required:false},
    twitter:{type:String,required:false},
    username:{type:String,required:false},
    website:{type:String,required:false},
    whatsapp:{type:String,required:false},
    youtube:{type:String,required:false},
})
module.exports = mongoose.model('user',user,'user');