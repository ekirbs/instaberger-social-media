const { User, Thought } = require('../models');

// Aggregate function to get the number of thoughts overall
// const totalCount = async () =>
//   Thought.aggregate()
//     .count("thoughtCount")
//     .then((numberOfThoughts) => numberOfThoughts);

module.exports = {
  // Get all thoughts
  getThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      const thoughtObj = {
        thoughts,
        // totalCount: await totalCount(),
      };
      return res.json(thoughtObj);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Create a thought
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  // update a thought
  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No such thought exists" });
        return;
      }
      res.json({ message: "Thought successfully updated."});
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  // Delete a Thought
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId })
      if (!thought) {
        res.status(404).json({ message: "No such thought exists" });
        return;
      }
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: thought._id } },
        { new: true }
      )
      if (!user) {
        res.status(404).json({ message: "No such thought exists" });
        return;
      }
      res.json("Thought successfully deleted");

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  // Add a reaction to a thought
  addReaction: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought found with that ID" });
        return;
      }
      res.json(thought);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  // Remove reaction from a thought
  removeReaction: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: { $in: [req.params.reactionId] } }, }, },
        { runValidators: true, new: true }
      );
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
