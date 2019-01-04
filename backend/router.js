
/*Express Router Root: /api
  Tehtävä: Huolehtii uuden quizin luomisesta, ja tuloksen tallentamisesta
  */


var express = require('express');
var router = express.Router();
var Course = require('./course');


router.get('/course', function (req, res) {
   

    var course = new Course();

    course.name = "test";
    

    course.save(function(err) {
        if (err)
            throw err;
        
        res.json({success: true});
    });


  });

router.get('/all', function(req, res) {
    console.log("all request")
  Course.find({})
  .lean()
  .exec(function(err, result) {
    console.log(result)
      res.json(JSON.stringify(result));
});

})
module.exports = router;