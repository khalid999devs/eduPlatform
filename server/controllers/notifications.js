const { notifications } = require('../models');
const { NotFoundError } = require('../errors');
const cron = require('node-cron');
const { writeFileSync } = require('fs');
const { Op } = require('sequelize');

const getAllNotifications = async (req, res) => {
  const allNotifications = await notifications.findAll({
    order: [['createdAt', 'DESC']],
  });

  res.json({
    succeed: true,
    msg: 'Successfully found',
    allNotifications,
  });
};

const updateNotifications = async (req, res) => {
  const notification = await notifications.findByPk(req.params.id);
  if (!notification) {
    throw new NotFoundError('Notification not found!');
  } else {
    notification.status ? (notification.status = 'read') : notification.status;
  }

  await notification.save();
  const allNotifications = await notifications.findAll({
    order: [['createdAt', 'DESC']],
  });
  res.json({
    succeed: true,
    msg: 'Successfully updated notification status',
    allNotifications,
  });
};

cron.schedule('0 30 0 * * *', async () => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await notifications.destroy({
      where: {
        status: 'read',
        createdAt: { [Op.lt]: thirtyDaysAgo },
      },
    });

    console.log('Deleted read Notifications');
  } catch (error) {
    const stringError = JSON.stringify(error);
    console.log(stringError);
    writeFileSync(
      './logs/failed/cronErrors.txt',
      `{succeed:false,fullTime:"${Date.now()}",error:${stringError}},\n`,
      {
        encoding: 'utf8',
        flag: 'a+',
        mode: 0o666,
      }
    );
  }
});

module.exports = { getAllNotifications, updateNotifications };
