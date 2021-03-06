const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  createdAt       : { type: Date },
  updatedAt       : { type: Date },
  haveCar         : { type: Boolean},
  password        : { type: String, select: false },
  username        : { type: String, required: true }
});

// Must use function here! ES6 => functions do not bind this!
UserSchema.pre('save', function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
next();
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcyrpt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};




module.exports = mongoose.model('User', UserSchema);
