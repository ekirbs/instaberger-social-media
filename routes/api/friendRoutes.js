const router = require('express').Router();
const {
  addFriend,
  removeFriend,
} = require('../../controllers/friendController');

// /api/Users/:userId/reactions
router.route('/:userId/friends/:friendId').post(addFriend);

// /api/Users/:userId/reactions/:reactionId
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
