const { Op } = require('sequelize');

const generateLast12MonthsData = async (model) => {
  const last12Months = [];
  const currentDate = new Date();

  for (let i = 11; i >= 0; i--) {
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i + 1,
      1
    );

    const monthYear = startDate.toLocaleString('default', {
      month: 'short',
      year: 'numeric',
    });

    const count = await model.count({
      where: {
        createdAt: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        },
      },
    });

    last12Months.push({ month: monthYear, count });
  }

  return last12Months;
};

module.exports = { generateLast12MonthsData };
