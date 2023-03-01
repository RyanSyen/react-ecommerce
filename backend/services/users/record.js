const express = require("express");

// recordRoutes is an instance of the express router to define the routes
// the router will be added as a middleware and will take control of request starting with path /api
const recordRoutes = express.Router();

// connect db
const dbo = require("../../db/conn");

// convert id form string to ObjectId for the _id in the collection
const ObjectId = require("mongodb").ObjectId;

// get all users
recordRoutes.route("/api").get(function (req, res) {
  let db_connect = dbo.getDb(process.env.DB_NAME);
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// get user by id
recordRoutes.route("/api/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect
      .collection("users")
      .findOne(myquery, function(err, result){
        if (err) throw err;
        res.json(result);
      });
  });

  // insert new user
  recordRoutes.route("/api/add").get(function (req, res) {
    let db_connect = dbo.getDb();
    let userObj = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
    };
    db_connect
      .collection("users")
      .insertOne(userObj, function(err, result){
        if (err) throw err;
        res.json(result);
      });
  });

  // update user by id
  recordRoutes.route("/api/update/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = {_id: ObjectId(req.params.id)};
    let newUserObj = {
        $set:{
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
        },
    };
    db_connect
      .collection("users")
      .updateOne(myquery, newUserObj, function(err, result){
        if (err) throw err;
        console.log(`Document with id "${req.params.id}" id updated`);
        res.json(result);
      });
  });

  // delete user
  recordRoutes.route("/api/delete/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect
      .collection("users")
      .deleteOne(myquery, function(err, result){
        if (err) throw err;
        console.log(`Document with id "${req.params.id}" is deleted`);
        res.json(result);
      });
  });

  module.exports = recordRoutes;