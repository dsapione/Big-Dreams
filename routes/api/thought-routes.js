const router = require('express').Router();
const {
	getAllThought,
	getThoughtById,
  addThought,
	updateThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThought)

// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)

// /api/thoughts/<userId>
router
	.route('/:userId')
	.post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')
  .post(addReaction)
  .delete(removeThought)

// /api/thoughts/<userId>/<thoughtId>/<reactionId>	
router
	.route('/:userId/:thoughtId/:reactionId')
	.delete(removeReaction);

module.exports = router;