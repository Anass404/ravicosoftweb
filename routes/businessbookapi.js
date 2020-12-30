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
            if (resu == null) {
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
            updateuserloginhistory(resu._id, req)

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
        var userid = reqbody.userid;
        if (userid == undefined || userid == "") {
            resp.data = "userid not found"
        } else {
            delete reqbody.userid;
            var resu = await model.findByIdAndUpdate(userid, reqbody);
            if (resu) {
                resp.status = "success";
                resp.data = resu
            }
            else {
                resp.data = "user not found"
            }
        }
    } catch (ex) {
        resp.ex = ex.message;
    }
    res.send(resp);
});


router.post("/changeaccount", async (req, res) => {
    var resp = { status: "failed", data: "cannot proceed" };
    try {
        var reqbody = { ...req.body };
        var userid = reqbody.userid;
        var changeaccountusername = reqbody.changeaccountusername;
        var changeaccountuserpassword = reqbody.changeaccountuserpassword;
        if (
            userid == undefined || userid == "" ||
            changeaccountusername == undefined || changeaccountusername == "" ||
            changeaccountuserpassword == undefined || changeaccountuserpassword == ""
        ) {
            resp.data = "userid or changeaccountusername or changeaccountuserpassword not found"
        } else {
            delete reqbody.userid;
            var olduser = await model.findById(userid);
            if (!olduser) {
                resp.data = "old user not found"
            }
            else {
                var newuser = await model.findOne({'username':changeaccountusername,'password':changeaccountuserpassword});
                if (!newuser) {
                    resp.data = "new user not found"
                }
                else {
                    newuser = JSON.parse(JSON.stringify(newuser));
                    if (newuser.businessbookmembershipplan == undefined || newuser.businessbookmembershipplan == "") {
                        newuser.businessbookmembershipplan = "Package 1"
                    }

                    if (newuser.smsplan == undefined || resu.smsplan == "") {
                        newuser.smsplan = ""
                    }
                    resp.status = "success"
                    resp.data = newuser;
                }

            }
        }
    } catch (ex) {
        resp.data = "Error while executing code";
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

async function updateuserloginhistory(userid, req) {
    try {
        var userip = req.headers['cf-connecting-ip'];
        model.findByIdAndUpdate(userid, { lastlogindate: new Date(), $push: { loginhistory: userip } }).then();
    } catch (ex) {
    }
}

module.exports = router;