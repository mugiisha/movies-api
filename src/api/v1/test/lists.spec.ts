import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../../index";
import User from "../database/models/user";
import { assignToken } from "../middlewares/jwtAuth";

chai.use(chaiHttp);

describe("lists tests", async function() {
  const user = await User.create({
    id: 1000,
    email: "test@email.com",
    name: "test",
    password: "test",
  });
  const token = await assignToken(user);

  this.afterAll(async () => {
    await User.destroy({
      where: {
        id: 1000,
      },
    });
  });


    it("POST  /lists should return 401  if no token provided", async () => {
      const list = { name: "thriller" };
      const response = await chai.request(app).post("/v1/lists").send(list);
      expect(response).to.have.status(401);
    });
});
