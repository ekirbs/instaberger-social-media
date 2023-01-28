const { Course, Student } = require('../models');
const userController = require('./userController');

module.exports = {
  // Get all courses
  getCourses(req, res) {
    Course.find({})
      .then((courses) => {
        console.log(courses);
        res.json(courses)
      })
      .catch((err) => res.status(500).json(err));
  },
  // Get a course
  getSingleCourse(req, res) {
    Course.findOne({ _id: req.params.courseId })
      .select('-__v')
      .then((course) =>
        !course
          ? res.status(404).json({ message: 'No course with that ID' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a course
  createCourse(req, res) {
    Course.create(req.body)
      .then((course) => res.json(course))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) => User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: thought._id } },
        { new: true }
      ))
      .then((user) => 
      user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.courseId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((course) =>
        !course
          ? res.status(404).json({ message: 'No course with this id!' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
};
