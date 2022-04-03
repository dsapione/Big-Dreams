const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
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
  return this.thoughts.reduce((total, thought) => total + thought.reactions.length + 1, 0);
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;