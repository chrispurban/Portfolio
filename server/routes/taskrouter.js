const config = require('../config');
const router = require('express').Router();
const cors = require('cors');
const auth = require('../auth');

const TaskModel = require('../models/task');

router
  .use(require('body-parser').json())
;

router
  .route('/') // this is to get all tasks
  .options(cors(config.whitelist), (req,res,next)=>{res.sendStatus(200);})
  .get(cors(), auth.user, (req,res,next) => {
    TaskModel
      .find({owner:req.user.sub})
      .then(
        (task) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(task);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors(config.whitelist), auth.user, (req, res, next) => {
    req.body.owner = req.user.sub;
    if(req.body._id){delete req.body._id;} // purge any local ID it may have had
    TaskModel
      .create(req.body)
      .then(
        (task) => {
          console.log('Task Created ', task);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(task);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));

  })
  .delete(cors(config.whitelist), auth.user, (req, res, next) => {
    TaskModel
      .remove({owner:req.user.sub})
      .then(
        (task) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(task);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .all((req, res, next) => {
      res.statusCode = 405; // method not allowed
      res.redirect('./');
  })
;

router
  .route('/:taskId')
  .options(cors(config.whitelist), auth.user, (req,res,next)=>{res.sendStatus(200);})
  .get(cors(), (req,res,next) => {
    TaskModel
    .findById(req.params.taskId)
    .then(
      (task) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(task);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
  })
  .put(cors(config.whitelist), auth.user, (req, res, next) => {
    if(req.body.history){
      req.body['$push'] = {history:req.body.history};
      delete req.body.history;
      console.log(req.body);
    }
  TaskModel
    .updateOne({"_id":req.params.taskId}, req.body)
    .then(
      (task) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(task);
        console.log(task);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
  })
  .delete(cors(config.whitelist), auth.user, (req, res, next) => {
    TaskModel
      .findByIdAndRemove(req.params.taskId)
      .then(
        (task) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(task);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .all((req, res, next) => {
      res.statusCode = 405; // method not allowed
      res.redirect('./');
  })
;

module.exports = router;
