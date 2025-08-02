    import {
    createProfileService,
    getProfileService,
    updateVisibilityService,
    getPublicProfileService
} from "../services/linktree.services.js";

export const createProfileController = async (req, res) => {
    const userId = req.user.id;
    try {
    await createProfileService(userId, req.body);
    res.status(201).json({ message: "Perfil creado con éxito" });
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
};

export const getProfileController = async (req, res) => {
    const userId = req.user.id;
    try {
    const data = await getProfileService(userId);
    res.json(data);
    } catch (err) {
    res.status(404).json({ error: err.message });
    }
};

export const updateVisibilityController = async (req, res) => {
    const userId = req.user.id;
    const { is_public } = req.body;
    try {
    await updateVisibilityService(userId, is_public);
    res.json({ message: "Visibilidad actualizada" });
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
};

export const getPublicProfileController = async (req, res) => {
    const { user_id } = req.query;
    try {
    const data = await getPublicProfileService(user_id);
    res.json(data);
    } catch (err) {
    res.status(404).json({ error: err.message });
    }
};
    