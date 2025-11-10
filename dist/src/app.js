"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const swagger_1 = __importDefault(require("../config/swagger"));
const userRoutes_1 = __importDefault(require("./api/v1/routes/userRoutes"));
const MenuRoutes_1 = __importDefault(require("./api/v1/routes/MenuRoutes"));
const orderRoutes_1 = __importDefault(require("./api/v1/routes/orderRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/menus', MenuRoutes_1.default);
app.use('/api/v1/orders', orderRoutes_1.default);
// Setup Swagger
(0, swagger_1.default)(app);
exports.default = app;
