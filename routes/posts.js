import express from 'express';

//must be imported back into this file
import { getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch, getPost, commentPost} from '../controllers/posts.js'; //Inn react we dont have to put the .js but in node we do
import auth from '../middleware/auth.js';

const router = express.Router();

//This is reached by going to (this ip is from unbuntu because we are running a VM)172.31.225.73:5000/posts
router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.post('/', auth, createPost);       //We dont need to know the id here because we are just creating a new one
router.patch('/:id', auth, updatePost);         //Patch is used for updating existing documents for editing we need to know the id and the ':' is to make it dynamic
router.delete('/:id', auth, deletePost);        //auth is on here now so that person has the authorization to do certain actions
router.patch('/:id/likePost', auth, likePost);        //it is a patch post liking it is basically like updating the post
router.get('/:id', getPost);
router.post('/:id/commentPost', auth, commentPost)

export default router;