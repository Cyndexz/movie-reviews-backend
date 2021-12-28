import express from 'express';
import {signin, signup} from '../controllers/user.js'

const router = express.Router();

router.post('/signin', signin); //this is a post route because you have to send all the details from the form to the backend
router.post('/signup', signup);

export default router;