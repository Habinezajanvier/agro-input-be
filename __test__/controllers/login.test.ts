import request from "supertest";
import app from "../../src/app";
import { hashPassword } from "../../src/helpers";
import { UserDTO } from "../../src/types";
import { DbConnection } from "../../src/database";
import { UserEntity } from "../../src/database/models";

describe("Login", () => {
  const userRepository = DbConnection.connection.getRepository(UserEntity);
  beforeAll(async () => {
    const hashedPassword = await hashPassword("test@123");
    const newUser: UserDTO = {
      firstName: "testname1",
      lastName: "testlast",
      email: "test1@email.com",
      phoneNumber: "250780000000",
      password: hashedPassword,
    };
    await DbConnection.instance.initializeDb();

    const user = userRepository.create(newUser);
    await userRepository.save(user);
  });
  afterAll(async () => {
    await DbConnection.connection.transaction(async () => {
      await userRepository.delete({});
    });
    DbConnection.instance.disconnectDb();
  });
  it("Should return 200 if user logged in successfully", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "test1@email.com",
      password: "test@123",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("token");
  });
  it("Should return 403 if the account doesn't exist", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "notExist@email.com",
      password: "test@123",
    });
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("error");
  });
  it("Should return 403 if password is incorrect", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "test1@email.com",
      password: "incorrect@123",
    });
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("error");
  });
});
