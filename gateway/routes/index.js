var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/process-data-gen', function(req, res) {
    const {userId, dataGen} = req.body
    // store gen data
    // call to tee module to get risk score
    
    // gen report
    

    // call to blockchain to mint nft and PCSP token
    res.json({data:"ok"})
});

module.exports = router;
