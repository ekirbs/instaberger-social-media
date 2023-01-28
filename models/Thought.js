const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280
    },
    createdAt: {
      type: Date,
      // default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
      default: Date.now(),
      get: (timestamp) => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], 
    // {
    //   type: Schema.Types.ObjectId,
    // },
    // students: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'student',
    //   },
    // ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
