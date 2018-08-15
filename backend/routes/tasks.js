'use strict';

const express = require('express');
const router = express.Router();

const Task = require('../models/task');


/* GET tasks listing. */
router.get('/', function(req, res, next) {
  if (!req.session.currentUser) {
    return res.redirect("/api/auth/login");
  }
  Task.find()
.then((alltasks) => {
      return res.status(200).json(alltasks)
    })
    .catch(error =>{
      next(error);
    })
});

// router.get('/add',(req, res, next) =>{
//   res.render('places/add');
// })

// /* POST Create task. */

router.post('/create', (req, res, next) => {
if (!req.session.currentUser) {
  return res.redirect("/api/auth/login");
}
const user = req.session.currentUser
const {name, description, dueDate} = req.body;

if(!name) {return res.json({message: 'The fields can not be empty'})};

const newTask = Task({
  name,
  description,
  dueDate,
});

newTask.save()
  .then(data => {
    res.status(200).json(data);
  })
.catch(next);
});


// /* GET place detail. */
// router.get('/:id', function(req, res, next) {
//   const {id} = req.params;
//   Place.findById(id)
//     .then((place) => {
//       res.render('places/detail', place );
//     })
//     .catch(error =>{
//       next(error);
//     })
// });

module.exports = router;