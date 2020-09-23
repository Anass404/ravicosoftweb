var express = require('express');
var router = express.Router();

const isauth = require('../middleware/isauth');
const model = require('../models/businessbookuser');

router.post("/registerfrombusinessbookdesktop", async (req, res) => {
    console.log('registerfrombusinessbookdesktop');
    var resp = { status: "failed", data: "Registration failed" };
    try {
        var o ={
            createddate:new Date(),
            softwareshouldrun:true,
            membershiptype:'free',
            password:Date.now().toString()
        }
        var resu = await model.create(o);
        if(resu)
        {
            resp.status="success";
            resp.data = resu
        }
    } catch (ex) {
        resp.ex = ex.message;
    }
    res.send(resp);
});
router.post("/updatesoftwareshouldrun", async (req, res) => {
    var resp = { status: "success", data: true };
    try {
        var resu = await model.findById(req.body.userid);
        if(resu)
        {
            resp.status="success";
            resp.data = resu.softwareshouldrun
        }
    } catch (ex) {
        resp.status= "failed";
        resp.ex = ex.message;
    }
    res.send(resp);
});

router.post("/updatemembershiptype", async (req, res) => {
    var resp = { status: "success", data: "free" };
    try {
        var resu = await model.findById(req.body.userid);
        if(resu)
        {
            resp.status="success";
            resp.data = resu.membershiptype
        }
    } catch (ex) {
        resp.status= "failed";
        resp.ex = ex.message;
    }
    res.send({ status: "success", data: "paid" });
});

router.post("/updatemembershipexpirydate", async (req, res) => {
    var resp = { status: "failed", data: "Failed" };
    try {
        var resu = await model.findById(req.body.userid);
        if(resu)
        {
            if(resu.membershiptype=='free')
            {
                resp.data="Free member"
            }
            else{
                resp.status="success";
                if(resu.membershipexpirydate==undefined)
                {
                    var date = new Date();
                    date.setDate(date.getDate()+30)

                    await model.findByIdAndUpdate(req.body.userid,{membershipexpirydate:date})
                    resp.data = date;
                }
                else{
                    resp.data = resu.membershipexpirydate
                }
            }
            
        }
    } catch (ex) {
        resp.status= "failed";
        resp.ex = ex.message;
    }
    res.send(resp);
});

module.exports = router;