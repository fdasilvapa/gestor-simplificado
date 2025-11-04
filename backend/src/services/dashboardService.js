import * as saleModel from "../models/saleModel.js";
import * as expenseModel from "../models/expenseModel.js";

export const getSummary = async (userId) => {
  const now = new Date();

  const startDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0)
  );

  const endDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59)
  );

  const totalSalesPromise = saleModel.sumByUserIdAndDateRange(
    userId,
    startDate,
    endDate
  );
  const totalExpensesPromise = expenseModel.sumByUserIdAndDateRange(
    userId,
    startDate,
    endDate
  );

  const [totalSales, totalExpenses] = await Promise.all([
    totalSalesPromise,
    totalExpensesPromise,
  ]);

  const balance = totalSales - totalExpenses;

  return {
    totalSales,
    totalExpenses,
    balance,
    period: {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    },
  };
};
