console.log('Connected to the server');
const express = require('express');
const bodyParser = require('body-parser');
const { request } = require('express');
const app = express();

function hidePassword() {//function hides password if checkbox toggled 
    var x = document.getElementById("pass");

    if (x.type === "password") {
        x.type = "text";
    }

    else {
        x.type = "password";
    }
}

//assumes username textfield has ID of 'user' and
//password texfield has ID of 'pass'
//if successful signin occurs, current user is passed
//to local storage key "currentUser"
async function signInButton() {
    var userInput = document.getElementById("user").value;
    var passInput = document.getElementById("pass").value;

    // setup connection to the cluster
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://Admin:Password@cluster0.ejcge.mongodb.net/AFRMS?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });

    try {
        // connect to the cluster
        await client.connect();

        var dataFunc = require("./databaseFunctions");
        var employeeID = await dataFunc.findUser(client, usernameInput, passwordInput);

        if (employeeID != null) {
            //GO TO NEXT PAGE
        }
        else {
//            message.innerHTML = "The employee was not found";
        }

        
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    
    /*
    // fetch user and test password verification
    var dbo = db.db("databaseFunctions");
    dbo.collection("Users").findOne({ name: userInput }, function (err, user) {
        //    User.findOne({ username: userInput }, function (err, user) {
        //        if (err) throw err;
        var passwordMatch = passInput.localeCompare(user.password)
        if (passwordMatch == 0) {
            console.log(passInput, isMatch); // -> Password: true
            //GO TO NEXT PAGE
            message.innerHTML = "Successfully Logged In";
            return;
        }
        //If it is able to find a user with the same username already in the system then it will arrive here.
        message.innerHTML = "Username or password are incorrect";
        return;
    });
    */
}


/* user-model.js
 * var mongoose = require(&#8216;mongoose&#8217;),
    Schema = mongoose.Schema,
    bcrypt = require(&#8216;bcrypt&#8217;),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

UserSchema.pre(save, function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});


});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model(User, UserSchema);
*/