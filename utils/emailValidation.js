import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Tools from './myfunctions.js';
import redisClient from './redis.js';
dotenv.config();


class EmailValidation {
    constructor () {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.authEmail,
                pass: process.env.authPass,
            }
        });
    }

    async verify(){
        return new Promise((resolve, reject)=>{
            this.transporter.verify((err, success)=> {
                if (err) {
                    console.log(err.message);
                    reject(err);
                }
                if (success) {
                    console.log("Ready to Send Verification Emails");
                    resolve(success);
                }
            });
        });
    }

    async sendVerificationEmail(userData, type) {
        const token = Tools.generateToken();
        const timeInSec = 60 * 60 * 6; // Token expires after 6 Hours
        const link = `http://0.0.0.0:3000/email/validation/?id=${token}&t=${type}`; // Update with actual domain
    
        try {
            // Store the user data in Redis
            const userDataString = JSON.stringify(userData);
            const reply = await redisClient.client.set(token, userDataString);
            if (reply !== 'OK') {
                console.log('Redis Error: Token Was Not set');
                return false;
            }

    
            // Set the expiration time for the token
            const expirationResult = await redisClient.client.expire(token, timeInSec);

            if (!expirationResult) {
                await redisClient.client.del(token);
                return false;
            }
            
            console.log('Email Validation Token is Set and Will Expire in 6 Hours');
    
            // Prepare the email message
            const message = {
                from: `"DeveFind" <${process.env.authEmail}>`, // sender address
                to: userData.email, // recipient
                subject: "Email Verification", // Subject line
                html: `<h2>Hello ${userData.firstName}</h2>
                       <p>Please validate your email by clicking on the link below</p>
                       <p><b>Validation Link:</b> ${link}<br>
                       Note: Link will expire in 6 hours.</p>`, // html body
            };
    
            // Send the email and await the response
            const info = await this.transporter.sendMail(message);
            console.log('Validation Email Sent: ', info.messageId);
            return true;
            
        } catch (error) {
            console.log('Error occurred:', error.message);
            return false;
        }
    }
    
}

const transporter = new EmailValidation();

export default transporter;
