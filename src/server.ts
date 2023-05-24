import app from ".";
import { db } from "./api/v1/database/models";
const port = process.env.PORT || 4000;

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
