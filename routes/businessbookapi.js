var express = require('express');
var router = express.Router();

const model = require('../models/User');

router.post("/updatelocalsetting", async (req, res) => {
    var resp = { status: "failed", data: "cannot proceed" };
    try {
        var userid = req.body.userid;
        var resu;
        if (userid) {
            resu = await model.findById(userid);
        }
        else {
            var o = {
                createddate: new Date(),
                username: Date.now().toString(),
                password: Date.now().toString(),
                businessbookmembershipplan:"Package 1",
                businessbookcanrun:true,
                smsplan:"none",
                role:'user',
            }
            resu = await model.create(o);
        }
        if (resu) {
            resp.status = "success";
            resp.data = resu
        }
    } catch (ex) {
        resp.ex = ex.message;
    }
    res.send(resp);
});

router.post("/updateonlinesetting", async (req, res) => {
    var resp = { status: "failed", data: "cannot proceed" };
    try {
        var reqbody = {...req.body};
        console.log(reqbody);
        var userid = reqbody.userid;
        delete reqbody.userid;
        var resu = await model.findByIdAndUpdate(userid,reqbody);
        if (resu) {
            resp.status = "success";
            resp.data = resu
        }
    } catch (ex) {
        resp.ex = ex.message;
    }
    res.send(resp);
});

router.post("/smsfrombusinessbook", async (req, res) => {
    try
    {
        reqbody ={...req.body};
        if(reqbody.userid==undefined||reqbody.userid=='')
        {
            res.json({status:"failed",data:"user not valid"});
        }
        else{
            res.json({status:"success",data:"message send"});
        }

    }catch(ex)
    {
        res.json({status:"failed",data:"sms not send",ex:ex.message})
    }
    
});

module.exports = router;