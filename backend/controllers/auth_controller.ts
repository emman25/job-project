import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

import dotenv from 'dotenv'
import { sendEmail } from '../utils/send_mail';
import { hashPassword } from './user_controller';


dotenv.config();

export const registerUser = async (req, res, next) => {
  const { name, email, location, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ code: 400, message: 'User already exists' });
    }

    const { hashedPassword } = await hashPassword(password, 10);


    user = new User({ name, email, location, isEmailVerified: true, password: hashedPassword });
    await user.save();


    // const emailVerificationToken = jwt.sign({ email }, process.env.JWT_SECRET || '', {
    //   expiresIn: '1h',
    // });

    // try {
    //   sendEmail(email, `http://localhost:3000/account/verify?token=${emailVerificationToken}`)
      
    // } catch (error) {
    //   console.log(error)
    // }

    res.status(200).json({
      code: 200,
      message: 'Registration successful. Please login'
    });
  } catch (err) {

    next(err)
  }
};


export const verifyEmail = async (req, res, next) => {

  try {
    const { token } = req.query;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!!);
    const { email } = decodedToken;
    // const email = ''

    console.log(email)

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).json({ code: 500, message: 'Invalid verification token' });
    }

    if (user.isEmailVerified == true) {
      return res.status(400).json({ code: 400, message: 'Account already verified' });
    }

    user.isEmailVerified = true;
    await user.save();


    const payload = { user: { id: user._id } };
    const authToken = jwt.sign(payload, process.env.JWT_SECRET!!, { expiresIn: '8h' });

    res.status(200).json({ code: 200, message: 'Success', payload: authToken });

  } catch (err) {

    next(err)
  }
};


export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("Signing in user")

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ code: 401, message: 'Invalid credentials' });
    }

    if (!user.isEmailVerified) {
      return res.status(401).json({ code: 401, message: 'Email not verified' });
    }

    const isMatch = await bcrypt.compare(password, user.password!!);

    if (!isMatch) {
      return res.status(401).json({ code: 401, message: 'Invalid credentials' });
    }

    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET!!);

    res.status(200).json({
      code: 200, message: 'Success', payload: {
        token,
        location: user.location
      }
    });
  } catch (err) {

    next(err)
  }
};
