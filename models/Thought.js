const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

// Schema to create a thought model
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
      default: Date.now(),
      get: (timestamp) => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
    // reactions: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Reaction"
    //   },
    // ]
    // students: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'student',
    //   },
    // ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
