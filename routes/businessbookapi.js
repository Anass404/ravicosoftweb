var express = require('express');
var router = express.Router();

const isauth = require('../middleware/isauth');
const model = require('../models/businessbookuser');

router.post("/registerfrombusinessbookdesktop", async (req, res) => {
    console.log('request from desktop');
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
            resp.data = o
        }
    } catch (ex) {
        resp.ex = ex.message;
    }
    console.log(resp)
    res.send(resp);
});

module.exports = router;