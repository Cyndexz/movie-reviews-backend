import mongoose from 'mongoose';

//Each Post will have to have these things 
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],         //Array of strings
    selectedFile: String,   //Convert image into a string using base64
    likes: {            //object
        type: [String],
        default: [],
    },
    comments:{
        type: [String], 
        default: [],
    },
    createdAt: {            //object
        type: Date,
        default: new Date(),
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

//We are exporting a mongoose model from the post message file so we are then able to
//run commands such as find, create, delete, and update
export default PostMessage;