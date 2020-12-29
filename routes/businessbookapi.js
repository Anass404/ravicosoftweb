var express = require('express');
var router = express.Router();

const model = require('../models/User');

router.post("/updatelocalsetting", async (req, res) => {
    console.log('updatelocalsetting')
    var resp = { status: "failed", data: "cannot proceed" };
    try {
        var userid = req.body.userid;
        var resu;
        if (userid) {
            resu = await model.findById(userid);
            if(resu==null){
                var o = {
                    activestatus: 'active',
                    createddate: new Date(),
                    username: Date.now().toString(),
                    password: Date.now().toString(),
                    businessbookmembershipplan: "Package 1",
                    businessbookcanrun: 'yes',
                    role: 'user',
                }
                resu = await model.create(o);    
            }
        }
        else {
            var o = {
                activestatus: 'active',
                createddate: new Date(),
                username: Date.now().toString(),
                password: Date.now().toString(),
                businessbookmembershipplan: "Package 1",
                businessbookcanrun: 'yes',
                role: 'user',
            }
            resu = await model.create(o);
        }
        if (resu) {
            resu = JSON.parse(JSON.stringify(resu));
            if (resu.businessbookmembershipplan == undefined || resu.businessbookmembershipplan == "") {
                resu.businessbookmembershipplan = "Package 1"
            }

            if (resu.smsplan == undefined || resu.smsplan == "") {
                resu.smsplan = ""
            }
            console.log(resu)
            resp.status = "success";
            resp.data = resu;

            //update lastlogindate, loginhistory array
            updateuserloginhistory(resu._id,req)

        }
    } catch (ex) {
        resp.ex = ex.message;
    }
    res.send(resp);
});

router.post("/updateonlinesetting", async (req, res) => {
    var resp = { status: "failed", data: "cannot proceed" };
    try {
        var reqbody = { ...req.body };
        console.log(reqbody);
        var userid = reqbody.userid;
        delete reqbody.userid;
        var resu = await model.findByIdAndUpdate(userid, reqbody);
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
    try {
        reqbody = { ...req.body };
        if (reqbody.userid == undefined || reqbody.userid == '') {
            res.json({ status: "failed", data: "user not valid" });
        }
        else {
            res.json({ status: "success", data: "message send" });
        }

    } catch (ex) {
        res.json({ status: "failed", data: "sms not send", ex: ex.message })
    }

});

async function updateuserloginhistory(userid,req){
    try {
        var userip = req.headers['cf-connecting-ip'];
        model.findByIdAndUpdate(userid, { lastlogindate: new Date(), $push: { loginhistory: userip } }).then();
    } catch (ex) {
    }
}

module.exports = router;