const User = require("../models/userModel");
const Todo = require("../models/todo.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exitingUser = await User.findOne({ email: email });
        if (exitingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const users = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        res.status(201).json({
            message: `Welcome ${users.name}, Todo-App`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY)
        res.status(200).json({
            message: "Welcome to Todo-App", token: token
        });
        res.status(500).json({
            message: "Internal server error"
        });
    } catch (error) {
        console.log(error);
    }
};

const createTodo = async (req, res) => {
    const { title, description } = req.body;
    const todos = await Todo.create({ title, description });
    if (!todos) {
        res.status(404).json({ message: "Todo Not Found" })
    }
    res.status(201).json({ todos })
};

const updatedTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        if (title) {
            todo.title = title;
        }
        if (description) {
            todo.description = description;
        }
        await todo.save();
        res.status(200).json({ message: "Todo updated successfully", todo });
    } catch (error) {
        console.log(error);
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Todo Not Found" });
    }
    const todos = await Todo.findOneAndDelete({ _id: id })
    if (!todos) {
        res.status(404).json({ error: "Todo Not Deleted" });
    }
    res.status(200).json({ message: "Deleted Successfully" });
};

const getAllTodos = async (req, res) => {
    const todos = await Todo.find({});
    if (!todos) {
        res.status(400).json({ message: "Something went wrong" });
    }
    res.status(200).json({ todos })
};

const sendResetEmail = async (email, resetToken) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL,
                pass: process.env.PASSWORD
            }
        });
        const resetLink = `https://yourwebsite.com/resetPassword?token=${resetToken}`;
        const mailOptions = {
            from: 'yourmail@example.com',
            to: "recivermail@gmail.com",
            subject: 'Sending mail',
            text: "That was easy!",
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return { success: true, message: `Reset link has been sent to ${email}` };
    } catch (error) {
        console.error('Error occurred while sending email:', error);
        return { success: false, message: 'Something went wrong while sending the email' };
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const resetToken = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000;
        await user.save();
        const emailResponse = await sendResetEmail(user.email, resetToken);
        if (!emailResponse) {
            return res.status(500).json({ success: false, message: "Error sent not your email" });
        }
        res.status(200).json({ success: true, message: `Reset token has been sent to ${user.email}` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

module.exports = {
    signIn,
    signUp,
    createTodo,
    updatedTodo,
    deleteTodo,
    getAllTodos,
    forgotPassword
};