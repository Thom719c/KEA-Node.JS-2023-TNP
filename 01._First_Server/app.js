// Import
// const app = require("express")();
const express = require("express"); 
const app = express();

app.use(express.json());

// route (entire thing)
// HTTP method
// |    endpoint    callback function
app.get("/", (req, res) => {
    res.send({ message: "Our first route" });
});

let bicycleSpins = 0;
app.get("/spinthebicycle", (req, res) => {
    bicycleSpins += 1;
    res.send({ message: `People have spun the bicycle wheel ${bicycleSpins} times.` });
});

/**
 * Task
 * Create a new route that kicks the dinosaur
 * and then dinosaur says ow ow ow
*/
let dinosaurKick = 0;
app.get("/kickthedinosaur", (req, res) => {
    dinosaurKick += 1;
    res.send({
        message: `Kicked the dinosaur ${dinosaurKick} times.`,
        dinosaur: `Ow ow ow`
    });
});


app.get("/about", (req, res) => {
    res.send(`
        <h1 style="text-align: center">About<h1>
        <h3 style="text-align: center">This is my about page.<h3>
    `);
});

// query string     
// /bat?adjective=spooky
app.get("/bat", (req, res) => {
    console.log(req.query);

    res.send({ message: `The bat is ${req.query.adjective}` });
});

// path variable
// /bottle/large
app.get("/bottle/:bottleSize", (req, res) => {
    res.send({ bottleSize: req.params.bottleSize });
});

// POST
app.post("/package", (req, res) => {
    console.log(req.body);

    res.send({ message: req.body });
});


// 8080 is for http dev
app.listen(8080);

