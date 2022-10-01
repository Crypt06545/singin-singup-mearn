import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export default async (req, res, next) => {
    const SECRECT_KEY = process.env.SECRECT_KEY;

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeData = await jwt.decode(token, SECRECT_KEY);
        req.userId = decodeData?.sub;
        console.log(req.userId);
        next();

    } catch (error) {
        console.log(error);
    }
}