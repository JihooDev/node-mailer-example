const nodeMailer = require("nodemailer");

module.exports = async (email, name, authcode) => {

    const transporter = nodeMailer.createTransport({
        service: "gmail",
        // host: 'smtp.gmail.com', // gmail server
        // port: 587,
        // secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });

    const mailOption = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: "회원님의 인증 번호입니다.",
        html: `
        <!DOCTYPE html>
        <html style="margin: 0; padding: 0;">
            <head>
                <title>담다 이메일 인증</title>
            </head>
            <body style="margin: 0; padding: 0; font-size:15px;">
                <div>${name}님 인증번호는 ${authcode} 입니다.</div>
            </body>
        </html>
    `,
    };

    try {
        await transporter.sendMail(mailOption);
        return "success";
    } catch (error) {
        console.log(error);
    }
};