import * as dashboardService from "../services/dashboardService.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const periodKey = req.query.period || "thisMonth";

    const summary = await dashboardService.getSummary(userId, periodKey);
    res.status(200).json(summary);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erro ao buscar o resumo do dashboard.",
        error: error.message,
      });
  }
};
