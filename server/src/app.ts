import express, { Request, Response, Application } from "express";
import mongoose from "mongoose";
import path from "path";
import config from "config";

const app: Application = express();

// routes
app.use(express.json());
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
app.use("/t", require("./routes/redirect.routes")); // process internal links having /t/ format

if (process.env.NODE_ENV === "production") {
  // return static files
  // path from server/build to client/build
  const dirPrefix = "../../";
  app.use(
    "/",
    express.static(path.join(__dirname, dirPrefix, "client", "build"))
  );
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(
      path.resolve(__dirname, dirPrefix, "client", "build", "index.html")
    );
  });
}

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongo_url"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () =>
      console.log(`App has beed started on port: ${PORT}...`)
    );
  } catch (e) {
    console.log("Server error: ", e.message);
    process.exit(1);
  }
}

start();
