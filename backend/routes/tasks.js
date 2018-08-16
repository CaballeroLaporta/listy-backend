'use strict';

const express = require('express');
const router = express.Router();

const Task = require('../models/task');
const User = require('../models/user');



/* GET tasks listing. */
router.get('/', function(req, res, next) {
  if (!req.session.currentUser) {
    return res.redirect("/api/auth/login");
  }
  const userID = req.session.currentUser._id;
  User.findById(userID)
    .populate('mytasks')
    .then((user) => {
      console.log(user.mytasks);
      return res.status(200).json(user.mytasks)
    })
    .catch(error =>{
      next(error);
    })
});


// /* POST Create task. */

router.post('/create', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/api/auth/login");
  }
  const user = req.session.currentUser
  const {name, description, dueDate} = req.body;

  if(!name) {return res.json({message: 'The fields can not be empty'})};

  const newTask = new Task({
    name,
    description,
    dueDate,
  });

  newTask.save()
    .then(()=>{
      User.findById(user._id)
        .then((user) =>{
          user.mytasks.push(newTask._id)
          user.save()
            .then(() => {
              res.status(200).json(newTask);
            })
        })
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