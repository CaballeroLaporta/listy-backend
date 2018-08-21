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
      // console.log(user.mytasks);
      return res.status(200).json(user.mytasks)
    })
    .catch(error =>{
      next(error);
    })
});


// /* POST Create task. */
router.post('/create', (req, res, next) => {
  // if (!req.session.currentUser) {
  //   return res.redirect("/api/auth/login");
  // }
  const user = req.session.currentUser
  const {name, description, dueDate} = req.body;
  
  if(!name) {return res.json({message: 'The fields can not be empty'})};

  const newTask = new Task({
    name,
    description,
    dueDate: new Date(),
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


// /* DELETE delete task. */
router.delete('/:id' , function(req, res, next) {
  const { id } = req.params;
    
    Task.deleteOne({_id: id})
      .then(() => {
        // console.log('borrado')
        res.status(200).json(Task);
      })
      .catch(error =>{
        next(error);
      })
    });
    
    /* GET task detail. */
    router.get('/task-edit/:id', function(req, res, next) {
      const {id} = req.params;

      Ta.findById({_id: id})
        .then((taskdetail) => {
          // console.log(taskdetail)
          res.status(200).json(taskdetail);
        })
        .catch(error =>{
          next(error);
        })
    });

/* PUT edit task. */
  router.put('/:id', function(req, res, next) {
    const id  = req.params.id;
    console.log(req.params)
    const {name, description, dueDate} = req.body;

    const data = {
      name,
      description,
      dueDate
    }
    console.log(id,data)

    Task.findByIdAndUpdate(id , {name, description, dueDate}, {new: true})
      .then((dataUpdate) => {
        console.log(dataUpdate)
        res.status(200).json(dataUpdate)
      })
      .catch(error =>{
        next(error);
      })
  });



module.exports = router;