import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import authSchema from "../model/authSchema.js";

dotenv.config();

const SECRECT_KEY = process.env.SECRECT_KEY;

export const singUp = async (req, res) => {
    const { firstName, lastName, email, password, conformPassword, photo, age } = req.body;
    if (!firstName || !email || !password || !conformPassword || !age) return res.status(401).json({ message: 'invalid credentials' });
    if (password !== conformPassword) return res.status(401).json({ message: 'invalid credentials' });
    try {
        console.log(SECRECT_KEY)
        const isUserExist = await authSchema.findOne({ email });
        if (isUserExist) return res.status(401).json({ message: 'invalid credentials!' });

        const profile = await authSchema.create({ firstName, lastName, email, password, photo, age });
        const token = jwt.sign({ email: profile.email, id: profile._id }, SECRECT_KEY, { expiresIn: '1h' });

        res.status(200).json({ profile, token });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export const SingIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(401).json({ message: 'invalid credentials' });

    try {
        const isUserExist = await authSchema.findOne({ email });
        if (!isUserExist) return res.status(404).json({ message: 'user not found' });

        const isPasswordCorrect = await bcrypt.compare(password, isUserExist.password);
        if (!isPasswordCorrect) return res.status(401).json({ message: 'invalid credentials' });
        const token = jwt.sign({ email: existUser.email, id: existUser._id }, SECRECT_KEY, { expiresIn: '1h' });
        res.status(200).json({ profile: isUserExist, token });
    } catch (error) {
        return res.status(500).json({ message: error });
    }

}

export const deleteAccount = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'no post with the id' });
    await authSchema.findByIdAndRemove(id);
    return res.status(200).json({ message: 'delete account successfully' });

}

export const searchUsers = async (req, res) => {

    let { searchKey: firstName } = req.body;

    if (!firstName) firstName = "";
    try {
        const users = await authSchema.find({ "$or": [{ "firstName": { $regex: firstName } }, { "lastName": { $regex: firstName } }] }).select(['firstName', 'lastName', 'photo']);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error_message: error });
    }
}

export const verifyAccount = async (req, res) => {
    let { email, otp } = req.body;

    try {
        const isUserExist = await authSchema.findOne({ email });
        if (!isUserExist || isUserExist.verifyCode !== otp) return res.status(401).json({ message: 'invalid credentials' });

        return res.status(200).json({ message: 'user verify successfully' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error });
    }
}

export const updatePassword = async (req, res) => {
    let { previousPassword, newPassword, conformPassword, email } = req.body;
    if (!email || !previousPassword || !newPassword || !conformPassword) return res.status(401).json({ message: 'invalid credentials' });
    if (newPassword !== conformPassword) return res.status(400).json({ message: "password don't match" });
    try {
        const isUserExist = await authSchema.findOne({ email });
        if (!isUserExist) return res.status(404).json({ message: 'user not found' });

        const isPasswordCorrect = await bcrypt.compare(previousPassword, isUserExist.password);
        if (!isPasswordCorrect) return res.status(401).json({ message: 'invalid credentials' });

        const hassPassword = await bcrypt.hash(previousPassword, 12);

        const resp = await isUserExist.update({ password: isUserExist.password }, function (error, doc) {
            doc.password = hassPassword;
            doc.visits.$inc();
            doc.save();
        });
        console.log(resp);
        return res.json(resp);


    } catch (error) {
        console.log(error)
        return res.status(500).json({ error_message: error })
    }
}