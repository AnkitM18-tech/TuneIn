import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Admin route GET method");
});

export default router;
