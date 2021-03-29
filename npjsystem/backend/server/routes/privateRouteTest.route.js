const express = require('express');
const router = express.Router();
const verify = require('../helpers/verifyToken');

router.get('/privateRouteTest', verify, function (req, res, next){
    res.json({
        privateRouteTest: {
            title: "Private Post kk",
            description: "Random data you shouldnt access"
        }
    });
});



module.exports = router;