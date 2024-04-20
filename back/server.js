require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./models/index").db;
const jwtValidation = require('./middleware/jwt_validation').requireAuth;

const router = require('./routes');
const loginController = require("./controllers/user").login;
const port = process.env.PORT;

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        allowedHeaders: [
          "Content-Type",
          "Authorization",
          "Access-Control-Allow-Methods",
          "Access-Control-Request-Headers",
        ],
    })
);
app.post("/login",loginController);
//app.use(jwtValidation)
app.use('/api',router);

app.get("/", (req, res) => {
    res.status(201).send("Salutare");
});

app.get("/reset", jwtValidation ,async (req, res) => {
    try {
        connection.sync({
            force: true,
        });
        res.status(201).send({ message: "Database reset!" });
    } catch (err) {
        res
            .status(500)
            .send({ message: "Database reset failed", err: err.message });
    }
});

app.listen(port, () => {
    console.log(`The app is listening on port ${port}`);
});
