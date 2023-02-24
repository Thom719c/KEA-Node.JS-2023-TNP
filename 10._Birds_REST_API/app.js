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
	foundBird ? res.status(200).send({ data: foundBird })
		: res.status(404).send(`No bird with id: ${req.params.id}`);
});

// POST		/birds			Create a new bird.
app.post("/birds", (req, res) => {
	const bird = req.body;
	bird.id = ++currentId;
	birds.push(bird);
	res.send({ data: bird });
});

// PATCH	/birds/<id>     Updates an existing bird by id.
app.patch("/birds/:id", (req, res) => {
	const foundBirdIndex = birds.findIndex(bird => bird.id === Number(req.params.id));
	
	if (foundBirdIndex === -1) {
		res.status(404).send({ message: `No bird with id: ${req.params.id}` });
	} else {
		const foundBird = birds[foundBirdIndex];
		const updatedBird = { ...foundBird, ...req.body, id: foundBird.id };
		birds[foundBirdIndex] = updatedBird;

		res.send({ data: updatedBird });
	}
});

// DELETE	/birds/<id>     Deletes an existing bird by id.
app.delete("/birds/:id", (req, res) => {
	const foundBird = birds.findIndex(bird => bird.id === Number(req.params.id));
	if (foundBird === -1) {
		res.status(404).json({ message: `No bird with id: ${req.params.id}` });
	} else {
		const deletedbird = birds.splice(foundBird, 1)[0];
		res.status(200).json({ data: deletedbird, message: 'Deleted successfully!' });
	}
});


const PORT = 8080;
app.listen(PORT, () => {
	console.log("Server is running on port", PORT);
});