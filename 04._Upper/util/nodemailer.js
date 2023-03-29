import nodemailer from "nodemailer";

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
let testAccount = await nodemailer.createTestAccount();

async function sendMail(data) {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });

    let info = await transporter.sendMail({
        // from: '"Your Name" <youremail@example.com>',
        from: data.email,
        // to: 'recipient@example.com',
        to: "nodejskeatp@gmail.com",
        subject: data.subject,
        text: data.message
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

export default sendMail;