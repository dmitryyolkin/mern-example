import { Router, Request, Response } from "express";
import { RequestWithJwtUser } from "../interfaces";
import config from "config";
import { Link } from "../models/Link";
import { auth } from "../middleware/auth.middleware";
import shortid from "shortid";

const router = Router();

router.post("/generate", auth, async (req: Request, res: Response) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;
    const code = shortid.generate(); // shortId generates links
    const exist = await Link.findOne({ from });
    if (exist) {
      // from link already exists
      return res.status(200).json({ link: exist });
    }

    const to = baseUrl + "/t/" + code;
    const link = new Link({
      from,
      to,
      code,
      owner: (<RequestWithJwtUser>req).user.userId,
    });

    await link.save();
    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({
      message: "Something was wrong: " + e.message,
    });
  }
});

router.get("/", auth, async (req: Request, res: Response) => {
  try {
    const reqWithJwtUser = <RequestWithJwtUser>req;
    const links = await Link.find({ owner: reqWithJwtUser.user.userId }); // req.user is pushed by auth.middleware.ts
    res.json(links);
  } catch (e) {
    res.status(500).json({
      message: "Something was wrong: " + e.message,
    });
  }
});

router.get("/:id", auth, async (req: Request, res: Response) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({
      message: "Something was wrong: " + e.message,
    });
  }
});

module.exports = router;
