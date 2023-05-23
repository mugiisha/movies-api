import express from "express";
import { db } from "./api/v1/database/models";
import "dotenv/config";
import router from "./api/v1/routes";

const app = express();

// Cross Origin Resource Sharing
app.use(express.json());

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "welcome to the movies api",
  });
});
app.use("/v1", router);

app.listen(port, () => {
  console.log("Server started on port " + port);
  db.sequelize
    ?.authenticate()
    .then(async () => {
      console.log("database connected");
      try {
        await db.sequelize?.sync();
      } catch (error: any) {
        console.log(error);
      }
    })
    .catch((e: any) => {
      console.log(e.message);
    });
});
