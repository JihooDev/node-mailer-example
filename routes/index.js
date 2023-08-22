require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mailer = require("./mail");
app.use(bodyParser.json());

app.post("/mail", (req, res) => {
    const { name, authcode } = req.body;

    mailer(name, authcode)
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