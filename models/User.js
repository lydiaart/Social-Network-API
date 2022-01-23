const { Schema, model } = require('mongoose');


const UserSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email:{
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
        },
        thoughts: [
            {
                type:Schema.Types.ObjectId,
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

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce(
        (total, friend) => total + friend.thoughts.length + 1,
        0
    );
});

const User = model('user', UserSchema);

module.exports = User;