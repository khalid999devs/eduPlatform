const {
  clients,
  sequelize,
  clientcourses,
  courses,
  Sequelize,
} = require('../models');
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require('../errors');
const { generateLast12MonthsData } = require('../utils/analytics');

const getDashboardAnalytics = async (req, res) => {
  let last12MonthPurchase = await generateLast12MonthsData(clientcourses);
  let monthlyPurchaseCountObj = {
    labels: [],
    registrations: [],
  };
  last12MonthPurchase = last12MonthPurchase.forEach((item) => {
    monthlyPurchaseCountObj.labels.push(item.month);
    monthlyPurchaseCountObj.registrations.push(item.count);
  });

  const query = `
  SELECT 
    c.title,
    cc.courseId, 
    COUNT(cc.courseId) as count
  FROM 
    clientcourses AS cc
  RIGHT JOIN 
    courses AS c ON cc.courseId = c.id
  GROUP BY 
    cc.courseId
`;
  let courseBasedPurchase = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  let coursePurchaseCountObj = {
    labels: [],
    data: [],
  };
  courseBasedPurchase.forEach((record) => {
    coursePurchaseCountObj.labels.push(record.title);
    coursePurchaseCountObj.data.push(record.count);
  });

  const allPurchaseCount = await clientcourses.count();
  const StudentsCount = await clients.count();
  const allCoursesCount = await courses.count();

  res.json({
    succeed: true,
    result: {
      last12MonthPurchase: monthlyPurchaseCountObj,
      courseBasedPurchase: coursePurchaseCountObj,
      otherCountData: { allPurchaseCount, StudentsCount, allCoursesCount },
    },
  });
};

module.exports = { getDashboardAnalytics };
