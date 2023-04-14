import { Router } from "express";
const router = Router();

router.get("/api/visitors", (req, res) => {
    res.send({ data: visitorCount });
});

router.put("/api/visitors", (req, res) => {
    res.send({ data: ++visitorCount });
});

export default router;