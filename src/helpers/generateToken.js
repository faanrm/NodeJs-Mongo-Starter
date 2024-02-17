import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config()

export default generateToken = (user) => {
    const payload = {
        userId: user._id,
        email: user.email,
    };
    return jwt.sign(payload, process.env.TOKEN, { expiresIn: '1h' }); 
}
