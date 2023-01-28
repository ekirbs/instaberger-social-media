const { Schema, model } = require('mongoose');

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
      default: Date.now()
    },
    username: {
      type: String,
      required: true,
    },
    reactions: {
      type: Schema.Types.ObjectId,
    },
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

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
