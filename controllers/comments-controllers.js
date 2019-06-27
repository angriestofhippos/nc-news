const {
	patchCommentById,
	deleteCommentById
} = require("../models/comments-models");

const updateCommentById = (req, res, next) => {
	const { comment_id } = req.params;
	const { inc_votes } = req.body;
	patchCommentById(comment_id, inc_votes)
		.then(comment => {
			res.status(201).send({ comment });
		})
		.catch(err => next(err));
};

const removeCommentById = (req, res, next) => {
	const { comment_id } = req.params;
	deleteCommentById(comment_id).then(comment => {
		if (comment === 1) {
			res.sendStatus(204);
		} else
			res
				.status(404)
				.send({
					msg: `Cannot delete comment ${comment_id} as it does not exist!`
				});
	});
};

module.exports = { updateCommentById, removeCommentById };
