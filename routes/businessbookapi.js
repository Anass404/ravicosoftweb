var express = require('express');
var router = express.Router();

const isauth = require('../middleware/isauth');
const model = require('../models/businessbookuser');

router.post("/updatelocalsetting", async (req, res) => {
    var resp = { status: "failed", data: "canot proceed" };
    try {
        var userid = req.body.userid;
        var resu;
        if (userid) {
            resu = await model.findById();
        }
        else {
            var o = {
                createddate: new Date(),
                canrunsoftware: true,
                cansendsms: false,
                membershiptype: 'free',
                username: Date.now().toString(),
                password: Date.now().toString()
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
module.exports = router;