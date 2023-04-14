import { Router } from "express";
const router = Router();

router.get("/gotham/:name", (req, res) => {
    req.session.name = req.params.name;
    req.session.hobby = req.query.hobby;
    res.send({message: `Hi ${req.session.name}`});
});

router.get("/gotham", (req, res) => {
    console.log(req.session)
    if (!req.session.name) {
        return res.send({ message: "Error. You are not welcome in this city."});
    }
    res.send({message: `I remeber you ${req.session.name}, hobby is ${req.session.hobby}`});
});

router.get("/leavegotham", (req, res) => {
    req.session.destroy(() => {
        res.send({});
    })
});

export default router;