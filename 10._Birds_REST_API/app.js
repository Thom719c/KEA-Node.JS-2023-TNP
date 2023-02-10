const express = require("express");
const app = express();


const birds = [
	{
		"id": 1,
		"name": "Black-and-white owl",
		"species": "S. nigrolineata",
		"habitat": "Southern tropical forests of South America"
	},
	{
		"id": 2,
		"name": "Black swan",
		"species": "C. atratus",
		"habitat": "Southeast and southwest regions of Australia"
	},
	{
		"id": 3,
		"name": "Common buzzard",
		"species": "B. buteo",
		"habitat": "Europe"
	}
];


// GET all birds
app.get("/birds", (req, res) => {
    res.send({ birds });
});


// GET specific bird by id
app.get("/birds/:id", (req, res) => {
    let bird = birds.filter(bird => bird.id === Number(req.params.id));
    res.send({ bird });
});


app.listen(8080);