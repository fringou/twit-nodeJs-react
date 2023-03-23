const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const postShema = new Schema(
    {

        posterId: {
            type: String,
            required: true
        },
        message: {
            type: String,
            trim: true,
            maxlength: 255,
        },
        picture: {
            type: String,
        },
        video: {
            type: String
        },
        likers: {
            type: [String],
            required: true
        },
        comments: {
            type: [
                {
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamp: Number
                }
            ],
            required: true
        }
    },
    {
        timestamps: true
    }

)

const PostModel = mongoose.model('post', postShema);
module.exports = PostModel;