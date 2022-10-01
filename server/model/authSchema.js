import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

import { options } from "../mail/index.js";


const usersSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, },
    password: String,
    photo: String,
    age: Number,
    verifyCode: { type: String, default: '#' },
    date: {
        type: Date,
        default: new Date()
    }

});

usersSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        //send mail;
        const transpoter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_ID,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const otp = otpGenerator.generate(6, { specialChars: false });
        this.verifyCode = otp;

        transpoter.sendMail(options(this.email, this.firstName, otp), function (error, data) {
            if (error)
                console.log(error)

        });

    }

    next();
});


export default mongoose.model('users', usersSchema);