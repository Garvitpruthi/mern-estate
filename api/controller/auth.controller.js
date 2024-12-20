import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendVerificationCode } from "../utils/emailService.js"


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    
    if(!email || !password || !username){
        return next(errorHandler(400, 'All fields are required'));
    }
    const existUser = await User.findOne({email});

    if(existUser){
        return next(errorHandler(400, "User exists already please login"))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const verificationCode = Math.floor(100000 + Math.random()*900000).toString();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
    const isVerified = true;
    const newUser = new User({username, email, password: hashedPassword, verificationCode, otpExpiry});
    try {
        await newUser.save();
        console.log("user saved");
        try{
            await sendVerificationCode(newUser.email, verificationCode);
            console.log(newUser.email);
        }
        catch (emailError) {
            console.error('Failed to send verification code:', emailError);
            return next(errorHandler(500, 'Internal server error while sending email'));
        }
        
        res.status(201).json("User Created Successfully!");
    } catch (error) {
        next(error);
    }    
};

export const verifyOtp = async (req, res, next)=>{
    console.log("verify ka starting");
    const {email, otp} = req.body;
    console.log(`email from the client while verifying otp ${email} and otp is ${otp}`);

    const user = await User.findOne({email});
    if(!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    if(user.isVerified) {
        return res.status(400).json('User is already veriified');
    }

    if(user.verificationCode === otp && user.otpExpiry > Date.now()) {
        user.isVerified = true;
        user.verificationCode = null;
        user.otpExpiry = null;
        await user.save();
        return res.status(200).json({message: 'OTP verified successfully. Sign up complete.', success: true});
    }
    else if( user.otpExpiry < Date.now()) {
        return res.status(400).json('OTP expired. Please request a new one');
    }
    else {
        return next(errorHandler(400, 'Invalid OTP.'));
    }
}

export const resendOTP = async (req, res, next) => {
    const {email} = req.body;

    const user = await User.findOne({email});
    if(!user){
        return next(errorHandler(400, 'User not found'));
    }
    if(user.isVerified) {
        return res.status(400).json('User is already verified');
    }

    const newVerificationCode = Math.floor(100000, Math.random() * 900000).toString();
    user.verificationCode = newVerificationCode;
    user.otpExpiry = Date.now() + 5*60*1000;
    await user.save();

    try {
        await sendVerificationCode(user.email, newVerificationCode);
        return res.status(200).json('OTP resent Successfully');
    }
    catch(emailError){
        console.error('Failed to resend verification Code:', emailError);
        return next(errorHandler(500, 'Internal server error while resending OTP'));
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email })
        
        if(!validUser) return next(errorHandler(404, 'User not found'));
        if(!validUser.isVerified) return next(errorHandler(404, 'User not fount'));
        const validPassword = await bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
        
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest)
    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email })

        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const { password: pass,  ...rest } = user._doc;


            res
               .cookie('access_token', token, {httpOnly: true})
               .status(200)
               .json(rest);
            
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo, isVerified: true });

            await newUser.save();
            const token = jwt.sign({id: newUser._id }, process.env.JWT_SECRET);

            const { password: pass, ...rest } = newUser._doc;        
            res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
            
        }
    } catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token'); 
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(error);
    }
}