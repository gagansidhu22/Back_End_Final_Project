import express from "express";
import { createMenu, getMenus, updateMenu, deleteMenu } from "../Contollers/MenuContoller";

const router = express.Router();

router.post("/", createMenu);
router.get("/", getMenus);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

export default router;
