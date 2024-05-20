import request from "supertest";
import app from "../../src/app";
import { hashPassword } from "../../src/helpers";
import { UserDTO } from "../../src/types";
import { DbConnection } from "../../src/database";
import { UserEntity } from "../../src/database/models";

describe("Login", () => {
  const userRepository = DbConnection.connection.getRepository(UserEntity);
  let testAccount: UserDTO;
  beforeAll(async () => {
    const hashedPassword = await hashPassword("test@123");
    testAccount = {
      firstName: "testname1",
      lastName: "testlast",
      email: "test2@email.com",
      phoneNumber: "250780000001",
      password: hashedPassword,
    };
    await DbConnection.instance.initializeDb();

    const user = userRepository.create(testAccount);
    await userRepository.save(user);
  });
  afterAll(async () => {
    await DbConnection.connection.transaction(async () => {
      await userRepository.delete({});
    });
    DbConnection.instance.disconnectDb();
  });
  it("Should return 201 if account created successfully", async () => {
    const account: UserDTO = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@email.com",
      password: "password@123",
      phoneNumber: "250780000000",
    };
    const res = await request(app).post("/api/v1/auth/signup").send(account);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("token");
  });
  it("Should return 409 if the account exist", async () => {
    const res = await request(app)
      .post("/api/v1/auth/signup")
      .send(testAccount);
    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("error");
  });
});
