"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe("Order API", () => {
    let orderId;
    let menuId;
    beforeEach(async () => {
        // Create a menu first (orders require a menu item)
        const menuRes = await (0, supertest_1.default)(app_1.default)
            .post("/api/menus")
            .send({
            name: `Order Menu ${Date.now()}`,
            description: "Menu for order test",
            price: 10,
        });
        menuId = menuRes.body.id;
        // Create an order
        const orderRes = await (0, supertest_1.default)(app_1.default)
            .post("/api/orders")
            .send({
            menuId,
            quantity: 2,
            customerName: "Test Customer",
        });
        orderId = orderRes.body.id;
    });
    afterEach(async () => {
        await (0, supertest_1.default)(app_1.default).delete(`/api/orders/${orderId}`);
        await (0, supertest_1.default)(app_1.default).delete(`/api/menus/${menuId}`);
    });
    it("GET /api/orders should return all orders", async () => {
        const res = await (0, supertest_1.default)(app_1.default).get("/api/orders");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it("POST /api/orders should create a new order", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/orders")
            .send({
            menuId,
            quantity: 1,
            customerName: "Another Customer",
        });
        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
    });
    it("PATCH /api/orders/:id should update the order", async () => {
        const updates = { quantity: 5 };
        const res = await (0, supertest_1.default)(app_1.default)
            .patch(`/api/orders/${orderId}`)
            .send(updates);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Order updated successfully");
        expect(res.body.order.quantity).toBe(5); // if API returns updated object
    });
    it("DELETE /api/orders/:id should delete the order", async () => {
        const res = await (0, supertest_1.default)(app_1.default).delete(`/api/orders/${orderId}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Order deleted successfully");
    });
});
