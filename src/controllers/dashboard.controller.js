import { getDashboardService } from "../services/dashboard.service.js";

export const getDashboard = async (req, res) => {
    try {
    const userId = req.user.id;
    const dashboard = await getDashboardService(userId);

    res.json(dashboard);
    } catch (error) {
    console.error("Error al obtener dashboard:", error);
    res.status(500).json({ message: "Error al obtener dashboard" });
    }
};
