const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of Users overall
const totalCount = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);

// Aggregate function for getting the overall grade using $avg
// const grade = async (userId) =>
//   User.aggregate([
//     // only include the given user by using $match
//     { $match: { _id: ObjectId(userId) } },
//     {
//       $unwind: '$thoughts',
//     },
//     {
//       $group: {
//         _id: ObjectId(userId),
//         overallGrade: { $avg: '$thoughts.score' },
//       },
//     },
//   ]);

module.exports = {
  // Get all users
  getUsers: async (req, res)=> {
    // User.find()
    //   .then(async (users) => {
    //     const userObj = {
    //       users,
    //       totalCount: await totalCount(),
    //     };
    //     return res.json(userObj);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return res.status(500).json(err);
    //   });
    try {
      const users = await User.find()
      const userObj = {
              users,
              totalCount: await totalCount(),
            };
       return res.json(userObj);
    } catch (error) {
      console.log(err);
      return res.status(500).json(err);
    }

  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate("thoughts", "friends")
      .then(async (user ) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
        // user,
        //       grade: await grade(req.params.userId),
        //     })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body)
      res.json(user)
    } catch (error) {
      res.status(500).json(error);
    }
    // const user = await User.create(req.body)
    //  res.json(user)
    //   .catch((err) => res.status(500).json(err));
  },
  // Delete a user and remove them from the database
  deleteUser: async (req, res) => {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId })
      // .then((user) =>
        if (!user) {
          res.status(404).json({ message: 'No such user exists' })
          return
        }
        const thought = await Thought.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      // )
      // .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User successfully deleted' })
    } catch (error) {
      console.log(err);
        res.status(500).json(err);
    }
  //   const user = await User.findOneAndRemove({ _id: req.params.userId })
  //     // .then((user) =>
  //       if (!user) {
  //         res.status(404).json({ message: 'No such user exists' })
  //         return
  //       }
  //       const thought = await Thought.findOneAndUpdate(
  //             { users: req.params.userId },
  //             { $pull: { users: req.params.userId } },
  //             { new: true }
  //           )
  //     // )
  //     // .then((thought) =>
  //       !thought
  //         ? res.status(404).json({
  //             message: 'User deleted, but no thoughts found',
  //           })
  //         : res.json({ message: 'User successfully deleted' })

  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  },

  // Add a reaction(thought) to a user
  addReaction(req, res) {
    console.log('You are adding a thought/reaction');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove thought/reaction from a user
  removeReaction(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { reactions: { reactionId: { $in: [req.params.reactionId] } } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
