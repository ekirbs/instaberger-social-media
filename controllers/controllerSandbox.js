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

         // user,
        //       grade: await grade(req.params.userId),
        //     })

         // const user = await User.create(req.body)
    //  res.json(user)
    //   .catch((err) => res.status(500).json(err));

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

  // const thought = await Thought.findOneAndUpdate(
      //   { users: req.params.userId },
      //   { $pull: { users: req.params.userId } },
      //   { new: true }
      // );
      // )
      // .then((thought) =>
      // !thought
      //   ? res.status(404).json({
      //       message: "User deleted, but no thoughts found",
      //     })
      //   : res.json({ message: "User successfully deleted" });

      //   console.log("You are adding a thought/reaction");
  //   console.log(req.body);
  //   User.findOneAndUpdate(
  //     { _id: req.params.userId },
  //     { $addToSet: { reactions: req.body } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((user) =>
  //       !user
  //         ? res.status(404).json({ message: "No user found with that ID :(" })
  //         : res.json(user)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },

    // Update a Thought
  // updateThought(req, res) {
  //   Thought.findOneAndUpdate(
  //     { _id: req.params.courseId },
  //     { $set: req.body },
  //     { runValidators: true, new: true }
  //   )
  //     .then((course) =>
  //       !course
  //         ? res.status(404).json({ message: 'No course with this id!' })
  //         : res.json(course)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },