// src/api/v1/controllers/adminController.ts
import { Request, Response } from "express";
import {admin} from "../../../config/firebaseConfig";

// Set custom role for a user (Admin only)
export const setUserRole = async (req: Request, res: Response) => {
  try {
    const { uid, role } = req.body;

    if (!uid || !role) {
      return res.status(400).json({
        success: false,
        message: "User ID and role are required",
      });
    }

    const auth = admin.auth();

    await auth.setCustomUserClaims(uid, { role });

    return res.status(200).json({
      success: true,
      message: `Role '${role}' set successfully for user ${uid}`,
    });
  } catch (error: any) {
    console.error("Error setting role:", error.message);

    return res.status(400).json({
      success: false,
      message: "Error setting role",
      error: error.message,
    });
  }
};

// Get user details and custom claims
export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await admin.auth().getUser(uid);

    return res.status(200).json({
      uid: user.uid,
      email: user.email,
      claims: user.customClaims || {},
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error fetching user details",
      error: error.message,
    });
  }
};
