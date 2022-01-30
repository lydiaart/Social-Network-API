const router = require('express').Router();
const {
  getAllThoughts,
  addThought,
  removeThought,
  getSingleThought,
  updateSingleThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

//  /api/thoughts
router.route('/')
.get(getAllThoughts)
.post(addThought);

//  /api/thoughts/<userId>/<thoughtId>
router
.route('/:thoughtId')
.get(getSingleThought)
.put(updateSingleThought)
.delete(removeThought);

//  /api/thoughts/<userId>/<thoughtId>/<reactionId>
router.route('/:thoughtId/reactions')
.post(addReaction)
.delete(removeReaction);

module.exports = router;
