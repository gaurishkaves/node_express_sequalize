const model = require('../models')
const User = model.users
const request = require("supertest");
const expect = require("chai").expect;
const should = require("chai").should();
const app = require("../app");

describe("users", () => {
  beforeEach(async () => {
    let user = await User.destroy({
        where: {},
        truncate: true
      })

  });

  describe("GET /", () => {
    it("should return all users", async () => {
      const users = [
        { name: "test",  email: "test@gmail.com"},
        { name: "test1", email: "test1@gmail.com" }
      ];
      await User.bulkCreate(users);
      const res = await request(app).get("/users");
      expect(res.status).to.equal(200);
      res.should.be.a('object')
      expect(res.body.length).to.equal(2);
    });
  });

  describe("GET/:id", () => {
    it("should return a user if valid id is passed", async () => {
      const user = await User.create({
        name: "test",
        email: "test@gmail.com",
      });

      const res = await request(app).get("/users/" + user.user_id);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", user.name);
    });

    it("should return 400 error when invalid object id is passed", async () => {
      const res = await request(app).get("/users/abc");
      expect(res.status).to.equal(400);
    });

    it("should return 404 error when valid object id is passed but does not exist", async () => {
      const res = await request(app).get("/users/111111111111");
      expect(res.status).to.equal(404);
    });
  });


//TODO create api for below test
  describe("POST /", () => {
    it("should return user when the all request body is valid", async () => {
      const res = await request(app)
        .post("/users")
        .send({
          name: "test",
          email: "test@gmail.com",
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("user_id");
      expect(res.body).to.have.property("name", "test");
    });

    // add more tests to validate request body accordingly eg, make sure name is more than 3 characters etc
  });

  describe("PUT /:id", () => {
    it("should update the existing order and return 200", async () => {
      const user = await User.create({
              name: "test",
              email: "test@gmail.com",
        });

      const res = await request(app)
        .put("/users/" + user.user_id)
        .send({
          name: "newTest",
          email: "newemail@gmail.com",
          gender: "male"
        });

      expect(res.status).to.equal(200);
      //expect(res.body).to.have.property("name", "newTest");
    });

    it("should return 400 for invalid id",async () =>{

              const res = await request(app)
                .put("/users/" +"asdsd")
                .send({
                  name: "newTest",
                  email: "test2@gmail.com",
                  gender: "male"
                });
        expect(res.status).to.equal(400);

    });
    it("should return 404 for user id doesnt exists",async () =>{


                  const res = await request(app)
                    .put("/users/" + 12141)
                    .send({
                      name: "newTest",
                      email: "newemail@gmail.com",
                      gender: "male"
                    });
            expect(res.status).to.equal(404);

        });
  });

  describe("DELETE /:id", () => {
    it("should delete requested id and return response 200", async () => {
      const user = await User.create({
              name: "test",
              email: "test@gmail.com",
            });

      const res = await request(app).delete("/users/" + user.user_id);
      expect(res.status).to.be.equal(200);
    });
    it("should return 400 when user id is invalid", async () => {
          const user = await User.create({
                  name: "test",
                  email: "test@gmail.com",
                });
          res = await request(app).get("/users/" + "asdsad");
          expect(res.status).to.be.equal(400);
        });

    it("should return 404 when user id doesnt exists", async () => {
      const user = await User.create({
              name: "test",
              email: "test@gmail.com",
            });
      res = await request(app).get("/users/" + 1232);
      expect(res.status).to.be.equal(404);
    });
  });
});