const config = require('../config');
const router = require('express').Router();
const cors = require('cors');
const auth = require('../auth');

const ProjectModel = require('../models/project');

router
  .use(require('body-parser').json())
;

router
  .route('/') // this is to get all projects
  .options(cors(config.whitelist), (req,res,next)=>{res.sendStatus(200);})
  .get(cors(), (req,res,next) => {
    console.log("server was contacted, connection established");
    ProjectModel
      .find(req.query)
      .then(
        (project) => {
          console.log(project);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(project);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
/*
*/
  .all((req, res, next) => {
      res.statusCode = 405; // method not allowed
    res.redirect('./');
  })
;

module.exports = router;
