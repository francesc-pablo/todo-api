import { loginUserValidator, registerUserValidator, updateProfileValidator } from "../validators/user.js";
import { UserModel } from "../models/user.js";
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
import { mailTransporter } from "../utils/mail.js";


export const register = async (req, res, next) => {
    try {
        // validate user input
        const {error, value} = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // check if user does not exist
        const user = await UserModel.findOne({email: value.email});
        if (user) {
            return res.status(409).json('User already exists!');
        }
        // hash their password
        const hashedPassword = bcrypt.hashSync(value.password, 10); 
        // save user into database
        await UserModel.create({
            ...value,
            password: hashedPassword
        });
        // send confirmation email
        await mailTransporter.sendMail({
            to: value.email,
            subject: 'User Registeration',
            text: 'Account registered successfully'
        })
        // respond to request
        res.json({
            message:'User registered!'
        });
    } catch (error) {
        next(error);
    }
}


export const login = async (req, res, next) => {
    try {
        // validate user input
        const {error, value} = loginUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // find one user with identifier
        const user = await UserModel.findOne({email: value.email});
        if (!user) {
            return res.status(404).json('User does not exist!');
        }
        // compare their passwords
        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid credentials');
        }
        // sign a token for user
        const token = jwt.sign(
            {id:user.id},
            process.env.JWT_PRIVATE_KEY,
            {expiresIn: '30h'}
        );
        // respond to request
        res.json({
            message:'User logged in!',
            accessToken: token
        });
    } catch (error) {
        next(error)
    }
}


export const getProfile = async (req, res, next) => {
    try {
        // find authenticated user from database
        const user = await UserModel.findById(req.auth.id).select({password: false});
        // respond to request
        res.json(user);
    } catch (error) {
        next(error);
    }
}

export const logout = (req, res, next) => {
    res.json('User logged out!');
}

export const updateProfile = (req, res, next) => {
    try {
        // validate user input
        const { error, value} = updateProfileValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        res.json('User profile updated');
    } catch (error) {
        next(error);
    }
}