import nodemailer from 'nodemailer';
import {config} from './server.config.js';


export const transporter = nodemailer.createTransport({
  host: config.HOST,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: config.user,
    pass: config.pass,
  },
});