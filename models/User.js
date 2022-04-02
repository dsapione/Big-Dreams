const { Schema, model } = require('mongoose');
require('mongoose-type-email');

const UserSchema = new Schema(
	{
		userName: {
			type: String,
			unique: true,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			// type: Schema.Types.Email,
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Thought'
			}
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User'
			}
		]
	},
	{
		toJSON: {
			virtuals: true
		},
		id: false
	}
);

UserSchema.virtual('friendCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;