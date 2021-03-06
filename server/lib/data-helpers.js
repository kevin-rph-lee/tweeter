"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const ObjectId = require('mongodb').ObjectID;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet);
      //do callback
      callback(null, true);

    },

    // Get tweets from the 'db'
    getTweets: function(callback) {
      db.collection("tweets").find().sort({created_at: -1}).toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      });
    },

    likeTweet: function(id){
      db.collection("tweets").updateOne({_id: new ObjectId(id)} , {$inc:{likes: 1}})
    }
  };
}

