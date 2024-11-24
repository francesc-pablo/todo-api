import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'darbostudios23@gmail.com',
        pass: 'hrvvgwlzfipqhdte'
    },
    from: 'darbostudios23@gmail.com' 
});