import express from "express";
import "dotenv/config";
import router from "./api/v1/routes";

const app = express();

// Cross Origin Resource Sharing
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "welcome to the movies api",
  });
});
app.use("/v1", router);

export default app;
