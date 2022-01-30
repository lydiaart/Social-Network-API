const { Thought, User } = require('../models');
const { Types } = require('mongoose')

const thoughtController = {
    // get all thoughts
    async getAllThoughts({ params, body }, res) {
        const thoughts = await Thought.find()
        res.json(thoughts)
    },
   
    // get single thought
    async getSingleThought({ params, body }, res) {
       const thought = await Thought.findOne({_id: params.thoughtId})
    
       res.json(thought)
    },

    // update single thought
    async updateSingleThought({ params, body }, res) {

      console.log(body)
        const thought = await Thought.updateOne({ _id: params.thoughtId }, body)
        const previousUser = await User.findOneAndUpdate({_id:body.previous_userId },{$pull:{thoughts:params.thoughtId}})
        const user = await User.findOneAndUpdate({_id: body.userId}, {$push:{thoughts: params.thoughtId}})
        console.log(previousUser)
       
        res.json(user)
    },

    // add thought to user
    async addThought({ params, body }, res) {
        console.log(body);
        const { _id } = await Thought.create(body)

        const dbUserData = await User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: _id } },
            { new: true }
        );

        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);


    },

    // add reaction to thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId  },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // remove thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this text!' });
                }
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $pull: { thought: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // remove reaction
    removeReaction({ params, body }, res) {
        console.log( body.reactionId)
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionId: Types.ObjectId(body.reactionId)}    } },

        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;