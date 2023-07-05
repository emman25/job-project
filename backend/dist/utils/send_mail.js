"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var sendEmail = function (email, link) {
    var base_email = process.env.email;
    var transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: base_email,
            pass: process.env.password
        }
    });
    var mailOptions = {
        from: base_email,
        to: email,
        subject: 'Please Verify Your Entrebyte Technologies Job Portal Account',
        html: "\n        <p>Hey!</p>\n        \n        <p>Thanks for signing up for a Entrebyte Technologies Jobs account \u2014 just one more step!</p>\n\n        <p>For security purposes, <a href=\"".concat(link, "\">please verify your account </a> and set your preferences. It expires in an hour</p>\n        \n        <p>-The Entrebyte Technologies Team</p>\n        ")
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error sending email:', error);
        }
        else {
            console.log('Email sent:', info.response);
        }
    });
    return;
};
exports.sendEmail = sendEmail;
