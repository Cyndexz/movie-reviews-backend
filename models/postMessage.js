import mongoose from 'mongoose';

//Each Post will have to have these things 
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],         //Array of strings
    selectedFile: String,   //Convert image into a string using base64
    likeCount: {            //object
        type: Number,
        default: 0
    },
    createdAt: {            //object
        type: Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

//We are exporting a mongoose model from the post message file so we are then able to
//run commands such as find, create, delete, and update
export default PostMessage;