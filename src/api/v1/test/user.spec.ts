import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../../index";

chai.use(chaiHttp)

describe("sample test",()=>{
    it("/users should return data", async () => {
      const response = await chai.request(app).get("/v1/users");
      expect(response).to.have.status(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.an("array");
    });
})