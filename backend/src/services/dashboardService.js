import * as saleModel from "../models/saleModel.js";
import * as expenseModel from "../models/expenseModel.js";

const getDatesFromPeriodKey = (periodKey) => {
  const now = new Date();
  let startDate, endDate;

  const utcYear = now.getUTCFullYear();
  const utcMonth = now.getUTCMonth();
  const utcDay = now.getUTCDate();

  switch (periodKey) {
    case "last7days":
      endDate = new Date(Date.UTC(utcYear, utcMonth, utcDay, 23, 59, 59));
      startDate = new Date(Date.UTC(utcYear, utcMonth, utcDay - 6, 0, 0, 0));
      break;

    case "lastMonth":
      startDate = new Date(Date.UTC(utcYear, utcMonth - 1, 1, 0, 0, 0));
      endDate = new Date(Date.UTC(utcYear, utcMonth, 0, 23, 59, 59));
      break;

    case "thisMonth":
    default:
      startDate = new Date(Date.UTC(utcYear, utcMonth, 1, 0, 0, 0));
      endDate = new Date(Date.UTC(utcYear, utcMonth + 1, 0, 23, 59, 59));
      break;
  }

  return { startDate, endDate };
};

export const getSummary = async (userId, periodKey) => {
  const { startDate, endDate } = getDatesFromPeriodKey(periodKey);

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
      key: periodKey,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    },
  };
};
