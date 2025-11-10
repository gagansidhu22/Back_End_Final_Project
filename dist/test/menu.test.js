"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe("Menu API", () => {
    let menuId;
    beforeEach(async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/menus")
            .send({
            name: `Test Menu ${Date.now()}`,
            description: "A delicious test menu",
            price: 9.99,
        });
        menuId = res.body.id;
    });
    afterEach(async () => {
        await (0, supertest_1.default)(app_1.default).delete(`/api/menus/${menuId}`);
    });
    it("GET /api/menus should return all menus", async () => {
        const res = await (0, supertest_1.default)(app_1.default).get("/api/menus");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it("POST /api/menus should create a new menu", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
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
        const res = await (0, supertest_1.default)(app_1.default)
            .patch(`/api/menus/${menuId}`)
            .send(updates);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Menu updated successfully");
        expect(res.body.menu.name).toBe("Updated Menu"); // if API returns updated object
    });
    it("DELETE /api/menus/:id should delete the menu", async () => {
        const res = await (0, supertest_1.default)(app_1.default).delete(`/api/menus/${menuId}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Menu deleted successfully");
    });
});
