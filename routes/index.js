require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mailer = require("./mail");
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // 모든 도메인 허용
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 허용할 HTTP 메서드 설정
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // 허용할 헤더 설정
    next();
});

app.post("/mail", (req, res) => {
    const { email, name } = req.body;

    let randomNumber = Math.floor(Math.random() * 100000000); // 0 이상 99999999 이하의 난수 생성
    const authcode = String(randomNumber).padStart(8, "0"); // 난수를 문자열로 변환하고 8자리로 맞춤

    mailer(email, name, authcode)
        .then((response) => {
            if (response === "success") {
                res.status(200).json({
                    status: "Success",
                    code: 200,
                    message: `Message Sent Successfully! authcode is ${authcode}`,
                    authcode: authcode,
                });
            }
            else {
                res.json({
                    status: "Fail",
                    code: response?.code,
                });
            }
        })
        .catch((error) => {
            throw new Error(error);
        });
});

app.listen(3000, () => {
    console.log(`Port Open 3000`);
});