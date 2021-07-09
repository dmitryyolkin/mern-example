import { Router, Request, Response } from "express";
import { Link } from "../models/Link";

const router = Router();

router.get("/:code", async (req: Request, res: Response) => {
  try {
    const link = await Link.findOne({ code: req.params.code });
    if (link) {
      link.clicks++;
      await link.save(); // save clicks stats
      return res.redirect(link.from);
    }
    res.status(404).json({ message: "There is no link" });
  } catch (e) {
    res.status(500).json({
      message: "Something was wrong: " + e.message,
    });
  }
});

module.exports = router;
