import db from "../configs/db.js";
import { StatusCodes } from "http-status-codes";
import {
    createProfileService,
    getProfileService,
    updateVisibilityService,
    getPublicProfileService,
    registerVisitService,
} from "../services/linktree.services.js";
import { registerClickService } from "../services/linktree.services.js";

export const createProfileController = async (req, res) => {
    const userId = req.user.id;

    try {
    if (req.file) {
        req.body.avatar_url = `/uploads/${req.file.filename}`;
    }

    if (req.body.links && typeof req.body.links === "string") {
        req.body.links = JSON.parse(req.body.links);
    }

    const { bio, avatar_url, is_public, links, main_color } = req.body;

    const wasUpdated = await createProfileService(userId, {
        bio,
        avatar_url,
        is_public,
        links,
        main_color,
    });

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

export const registerClickController = async (req, res) => {
    try {
    const { link_id } = req.body;

    await registerClickService(link_id);

    return res.status(StatusCodes.CREATED).json({
        message: "Click registered successfully",
    });
    } catch (error) {
    console.error("Error registering click:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to register click",
    });
    }
};

export const registerVisitController = async (req, res) => {
    try {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ success: false, error: "user_id is required" });
    }

    await db.query("INSERT INTO visit (user_id) VALUES (?)", [user_id]);

    await db.query(
        "UPDATE profile SET visits_counter = visits_counter + 1 WHERE user_id = ?",
        [user_id]
    );

    res.status(201).json({ success: true, message: "Visit registered" });
    } catch (error) {
    console.error("Error registering visit:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
    }
};
