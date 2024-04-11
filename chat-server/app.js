const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());

app.get("/", (req, res) => {
	res.status(200).send("Hello World!");
});

app.get("/data", (req, res) => {
	res.json({
		name: "Garvit",
		age: 21,
	});
});

const chatServer = app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

module.exports = chatServer;
