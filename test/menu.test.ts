import request from "supertest";
import app from "../src/app";

describe("Menu API", () => {
  let menuId: string;

  beforeEach(async () => {
    const res = await request(app)
      .post("/api/menus")
      .send({
        name: `Test Menu ${Date.now()}`,
        description: "A delicious test menu",
        price: 9.99,
      });
    menuId = res.body.id;
  });

  afterEach(async () => {
    await request(app).delete(`/api/menus/${menuId}`);
  });

  it("GET /api/menus should return all menus", async () => {
    const res = await request(app).get("/api/menus");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/menus should create a new menu", async () => {
    const res = await request(app)
      .post("/api/menus")
      .send({
        name: `New Menu ${Date.now()}`,
        description: "Another menu",
        price: 12.5,
      });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  it("PATCH /api/menus/:id should update the menu", async () => {
    const updates = { name: "Updated Menu" };
    const res = await request(app)
      .patch(`/api/menus/${menuId}`)
      .send(updates);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Menu updated successfully");
    expect(res.body.menu.name).toBe("Updated Menu"); 
  });

  it("DELETE /api/menus/:id should delete the menu", async () => {
    const res = await request(app).delete(`/api/menus/${menuId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Menu deleted successfully");
  });
});
