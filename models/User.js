const { Schema, model } = require('mongoose');
// const thoughtSchema = require('./Thought');
// const friendSchema = require('./Friend');

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
// const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegex
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: "Thought"
    },
    friends: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    // thoughts: [{
    //   type: String,
    //   required: true,
    //   max_length: 50,
    // },],
    // friends : [friendSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);

userSchema
.virtual("friendCount")
.get(function () {
  return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;
