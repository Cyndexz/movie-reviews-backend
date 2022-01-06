/**
 * This will be used for the keep the logic from the posts.js in the routes folder
 * to be able to keep that posts less messy and instead just be filled with routes
 * while in this file we will keep all of the logic for each of the routes we make
 */
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'; //gives us access to a real model

//Must be exported from the other file
 export const getPosts = async (req, res) => {
    const {page} = req.query;

    try {
        const LIMIT = 8 ;
        const startIndex = (Number(page) - 1) * LIMIT; //This gets the the starting index of the page.We have to use number to convert the number back to an int because the query turns it into a string
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);

        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});     //res.status(200) means everything went okay and returns the array of all posts  
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getPost = async (req, res) =>{
    const {id} = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getPostsBySearch = async (req, res) => {
    const {searchQuery, tags} = req.query;

    try {
        const title = new RegExp(searchQuery, "i");     //a flag of i which means it is not case sensitive to the tags or the search so TEST. test, TEst, Test ---> would be the same

        //$or stands for find me the title or find me the tags, $in will check the tags array to see if it matches the what I am looking for
        const posts = await PostMessage.find({ $or: [{title}, {tags: {$in: tags.split(',')}}] });

        res.json({data: posts});        //returning it to the front-end
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

export const commentPost = async (req,res) => {
    const {id} = req.params;            
    const {value} = req.body;

    const post = await PostMessage.findById(id);    //Getting the post from the database

    post.comments.push(value);          //Adding the comments to the post

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})     //Upadting the the post in our variable

    res.json(updatedPost);
}