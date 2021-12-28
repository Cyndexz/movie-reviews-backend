/**
 * This will be used for the keep the logic from the posts.js in the routes folder
 * to be able to keep that posts less messy and instead just be filled with routes
 * while in this file we will keep all of the logic for each of the routes we make
 */
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'; //gives us access to a real model

//Must be exported from the other file
 export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);     //res.status(200) means everything went okay and returns the array of all posts  
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

//https://www.restapitutorial.com/httpstatuscodes.html to learn more about different types http error codes
export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});  //Will create that new post and set/pass the values that we are recieving

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send( 'No post with that id');

    const updatedPost = { creator, title, message, tags, selectedFile,_id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');          //Makes sure that the ID is valid

    await PostMessage.findByIdAndRemove(id);
    res.json({message: 'Post deleteed successfully'});
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);    
}