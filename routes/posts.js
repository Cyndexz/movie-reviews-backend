import express from 'express';

//must be imported back into this file
import { getPosts, createPost, updatePost, deletePost, likePost} from '../controllers/posts.js'; //Inn react we dont have to put the .js but in node we do

const router = express.Router();

//This is reached by going to (this ip is from unbuntu because we are running a VM)172.31.225.73:5000/posts
router.get('/', getPosts);
router.post('/', createPost);       //We dont need to know the id here because we are just creating a new one
router.patch('/:id', updatePost);         //Patch is used for updating existing documents for editing we need to know the id and the ':' is to make it dynamic
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);        //it is a patch post liking it is basically like updating the post

export default router;