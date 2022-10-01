import express from "express";

import { SingIn, singUp, deleteAccount, searchUsers, verifyAccount, updatePassword } from "../controllers/auth.js"
import auth from "../middleware/auth.js";


const router = express.Router();

router.post('/singup', singUp);
router.post('/singin', SingIn);
router.patch('/search_user', auth, searchUsers);
router.patch('/verify', auth, verifyAccount);
router.patch('/updatePassword', auth, updatePassword);
router.delete('/delete_account/:id', auth, deleteAccount);

export default router;