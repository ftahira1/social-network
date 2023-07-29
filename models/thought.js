const { Schema, model } = require('mongoose');
const Reaction = require("./reaction");

// thought schema
const thoughtSchema = new Schema (
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: dateFormat,
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)


// get total count of friends
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});

function dateFormat(createdAt) {
    return createdAt.toLocaleDateString("en-US", {
      day: "2-digit",
      year: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

// create the User model using the UserSchema
const Thought = model('Thought', thoughtSchema);
// export the Thought model
module.exports = Thought;