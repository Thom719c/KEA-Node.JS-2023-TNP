const express = require("express");
const app = express();

app.use(express.json()); // able to pass body by json

const birds = require("./birds");

let currentId = 3;


// GET all birds
app.get("/birds", (req, res) => {
	res.send({ data: birds });
});

// GET specific bird by id
app.get("/birds/:id", (req, res) => {
	const foundBird = birds.find(bird => bird.id === Number(req.params.id));
	res.send({ data: foundBird });
});

// POST		/birds			Create a new bird.
app.post("/birds", (req, res) => {
	const bird = req.body;
	bird.id = ++currentId;
	birds.push(bird);
	res.send({ data: req.body });
});

// PATCH	/birds/<id>     Updates an existing bird by id.
app.patch("/birds/:id", (req, res) => {
	const foundBird = birds.find(bird => bird.id === Number(req.params.id));
	const foundBirdIndex = birds.indexOf(foundBird, 0);

	if (foundBirdIndex !== -1) {
		const updateBirdWith = req.body;
		const updatedBird = { ...foundBird, ...updateBirdWith, id: foundBird.id };
		birds[foundBirdIndex] = updatedBird;

		res.send({ data: updatedBird });
	} else {
		res.status(404).send({ message: `No bird with id: ${req.params.id}` });
	}
});

// DELETE	/birds/<id>     Deletes an existing bird by id.
app.delete("/birds/:id", (req, res) => {
	const foundBird = birds.findIndex(bird => bird.id === Number(req.params.id));
	if (foundBird !== -1) {
		birds.splice(foundBird, 1);

		res.status(200).json({ message: 'Deleted successfully!' });
	} else {
		res.status(400).json({ message: `No bird with id: ${req.params.id}` });
	}
});


const PORT = 8080;
app.listen(PORT, () => {
	console.log("Server is running on port", PORT);
});