import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Stats route GET method");
});

export default router;
