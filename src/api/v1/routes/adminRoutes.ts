import express from "express";
import { setUserRole, getUserDetails } from "../Controllers/adminController";

const router = express.Router();

// POST /api/admin/setRole
router.post("/setRole", setUserRole);

// GET /api/user/:uid
router.get("/:uid", getUserDetails);


export default router;
