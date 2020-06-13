const mongoose = require('mongoose');
//Used to create random salts and passwords 
const crypto = require('crypto');







const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    x

    salt: String

});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(64).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString('hex');
}

userSchema.methods.validatePassword = function(password) {
    console.log(this.salt);
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString('hex');
    return hash === this.password;
}


mongoose.model("User", userSchema);