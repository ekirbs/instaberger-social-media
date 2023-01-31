const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

// Aggregate function to get the number of Users overall
// const totalCount = async () =>
//   User.aggregate()
//     .count("userCount")
//     .then((numberOfUsers) => numberOfUsers);

module.exports = {
  // Get all users
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      const userObj = {
        users,
        // totalCount: await totalCount(),
      };
      return res.json(userObj);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts", "friends")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
      console.log(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // update a user
  updateUser: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No such user exists" });
        return;
      }
      res.json({ message: "User successfully updated."});
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  // Delete a user and remove them from the database
  deleteUser: async (req, res) => {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      if (!user) {
        res.status(404).json({ message: "No such user exists" });
        return;
      }
      const thought = await Thought.findOneAndUpdate(
        { users: req.params.userId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );
      !thought
        ? res.status(404).json({
            message: "User deleted, but no thoughts found",
          })
        : res.json({ message: "User successfully deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // Add a friend to a user
  addFriend: async (req, res) => {
    try {
      console.log("You are adding a friend");
      console.log(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      !user
        ? res.status(404).json({ message: "No user found with that ID :(" })
        : res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Remove friend from a user
  removeFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId }, },
        { runValidators: true, new: true }
      );
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
