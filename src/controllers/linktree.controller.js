import { StatusCodes } from "http-status-codes";
import {
    createProfileService,
    getProfileService,
    updateVisibilityService,
    getPublicProfileService
} from "../services/linktree.services.js";

export const createProfileController = async (req, res) => {
    const userId = req.user.id;
    try {
    const wasUpdated = await createProfileService(userId, req.body);
    const message = wasUpdated
    ? "Profile updated successfully"
    : "Profile created successfully";

    res.status(StatusCodes.CREATED).json({ message });
    } catch (err) { 
    res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
};

export const getProfileController = async (req, res) => {
    const userId = req.user.id;
    try {
        const data = await getProfileService(userId);
        res.status(StatusCodes.OK).json(data);
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
    }
};

export const updateVisibilityController = async (req, res) => {
    const userId = req.user.id;
    const { is_public } = req.body;
    try {
        await updateVisibilityService(userId, is_public);
        res.status(StatusCodes.OK).json({ message: "Visibility updated" });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
};

export const getPublicProfileController = async (req, res) => {
    const { user_id } = req.query;
    try {
        const data = await getPublicProfileService(user_id);
        res.status(StatusCodes.OK).json(data);
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
    }
};


        