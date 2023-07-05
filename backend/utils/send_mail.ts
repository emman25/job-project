import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = (email, link) => {
    let base_email = process.env.email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: base_email,
            pass: process.env.password
        }
    });

    const mailOptions = {
        from: base_email,
        to: email,
        subject: 'Please Verify Your Entrebyte Technologies Job Portal Account',
        html: `
        <p>Hey!</p>
        
        <p>Thanks for signing up for a Entrebyte Technologies Jobs account — just one more step!</p>

        <p>For security purposes, <a href="${link}">please verify your account </a> and set your preferences. It expires in an hour</p>
        
        <p>-The Entrebyte Technologies Team</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });

    return


}