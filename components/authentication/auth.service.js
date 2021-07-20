//const User = require("../../models/user")
const model = require('../../models')
const Users = model.users
const jwt = require('jsonwebtoken');

const jwtKey = "my_secret_key"
const jwtExpirySeconds = "1h"

const testToken = "eyJhbGciOiJIUzI1NiJ9.dGVzdA.ZYiPP4EaXF9TUJ-tz1VINGHjdj71b0vg5yb0dliWKUY"


exports.login = async function(params) {
    console.log(params)
    const userData = await Users.validateUser(params)
}

exports.verifyToken = async function(req,res,next){
    console.log("verfiy token")
     jwt.verify(testToken, jwtKey, (err, authData) => {

        if (err) {

          res.sendStatus(403);

        } else {

          next()

        }

      });

}

exports.signToken = async function(username){
    console.log("sign token")

      return jwt.sign(username, jwtKey);



}