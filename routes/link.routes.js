const { Router } = require("express");
const config = require("config");
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");
const shortid = require("shortid");
const router = Router();

router.post("/generate", auth, async (req, res) => {
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
      owner: req.user.userId,
    });

    await link.save();
    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({
      message: "Something was wrong: " + e.message,
    });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId }); // req.user is pushed by auth.middleware.js
    res.json(links);
  } catch (e) {
    res.status(500).json({
      message: "Something was wrong: " + e.message,
    });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const links = await Link.findById(req.params.id);
    res.json(links);
  } catch (e) {
    res.status(500).json({
      message: "Something was wrong: " + e.message,
    });
  }
});

module.exports = router;