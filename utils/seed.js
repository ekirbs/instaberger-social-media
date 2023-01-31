const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Create empty array to hold the students
  const thoughts = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const reactions = getRandomReactions(20);

    const username = getRandomName();
    // const first = fullName.split(' ')[0];
    // const last = fullName.split(' ')[1];
    const email = `${username}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    User.push({
      username,
      email,
      reactions,
    });
  }

  // Add students to the collection and await the results
  // await Student.collection.insertMany(students);
  const newThoughts = await Thought.insertMany(thoughts);

  // Add courses to the collection and await the results
  console.log("newThoughts: ", newThoughts);

  await User.collection.insertOne({
    // courseName: 'UCLA',
    // inPerson: false,
    thoughts: [...newThoughts.map(thought => thought._id )],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
