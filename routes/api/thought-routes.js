const router = require('express').Router();
const {
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

//  /api/thoughts/<userId>
router.route('/:userId').post(addThought);

//  /api/thoughts/<userId>/<thoughtText>
router
.route('/:userId/:thoughtText')
.put(addReaction)
.delete(removeThought);

//  /api/thoughts/<userId>/<thoughtText>/<reactionId>
router.route('/:userId/:thoughtText/:reactionId').delete(removeReaction);

module.exports = router;
