
/*Express Router Root: /api
  Tehtävä: Huolehtii uuden quizin luomisesta, ja tuloksen tallentamisesta
  */


var express = require('express');
var router = express.Router();
var Course = require('./course');
var Comment = require('./comment');


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
  Course.find({})
  .lean()
  .exec(function(err, result) {
      res.json(JSON.stringify(result));
   });

});

//returns the details of a single course
router.get('/course/:id', function (req, res) {
    let id = req.params.id;
    

    Course.findOne({_id: id})
    .lean()
    .exec(function(err, result) {
        if (err) {
            console.log(err);
            res.status(404).send();
        };
        
        res.json(JSON.stringify(result));

    })    
});

//returns the comments of a single course
router.get('/comments/:id', function(req, res) {
    let id = req.params.id;
    Comment.find({courseId: id})
    .lean()
    .exec(function(err, results) {
        if (err) {
            console.log(err)
            res.status(404).send();
        }
        
        res.json(JSON.stringify(results));
    })
})


module.exports = router;