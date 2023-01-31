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

  const addDateSuffix = (date) => {
    let dateStr = date.toString();
  ​
    // get last char of date string
    const lastChar = dateStr.charAt(dateStr.length - 1);
  ​
    if (lastChar === '1' && dateStr !== '11') {
      dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
      dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
      dateStr = `${dateStr}rd`;
    } else {
      dateStr = `${dateStr}th`;
    }
  ​
    return dateStr;
  };
  ​
  // function to format a timestamp, accepts the timestamp and an `options` object as parameters
  module.exports = (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
  ) => {
    // create month object
    const months = {
      0: monthLength === 'short' ? 'Jan' : 'January',
      1: monthLength === 'short' ? 'Feb' : 'February',
      2: monthLength === 'short' ? 'Mar' : 'March',
      3: monthLength === 'short' ? 'Apr' : 'April',
      4: monthLength === 'short' ? 'May' : 'May',
      5: monthLength === 'short' ? 'Jun' : 'June',
      6: monthLength === 'short' ? 'Jul' : 'July',
      7: monthLength === 'short' ? 'Aug' : 'August',
      8: monthLength === 'short' ? 'Sep' : 'September',
      9: monthLength === 'short' ? 'Oct' : 'October',
      10: monthLength === 'short' ? 'Nov' : 'November',
      11: monthLength === 'short' ? 'Dec' : 'December',
    };
  ​
    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];
  ​
    const dayOfMonth = dateSuffix
      ? addDateSuffix(dateObj.getDate())
      : dateObj.getDate();
  ​
    const year = dateObj.getFullYear();
    let hour =
      dateObj.getHours() > 12
        ? Math.floor(dateObj.getHours() - 12)
        : dateObj.getHours();
  ​
    // if hour is 0 (12:00am), change it to 12
    if (hour === 0) {
      hour = 12;
    }
  ​
    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
  ​
    // set `am` or `pm`
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';
  ​
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  ​
    return formattedTimeStamp;
  };