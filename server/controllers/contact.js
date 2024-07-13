const { Contact } = require('../models');
const { BadRequestError } = require('../errors');
const mailer = require('../utils/sendMail');
const sendSMS = require('../utils/sendSMS');

const sendMessage = async (req, res) => {
  const { name, phone, email, institute, message } = req.body;
  if (name && email && institute && message) {
    await Contact.create({
      name,
      phone: phone ? phone : null,
      email,
      message,
      institute,
    });
    res.json({ succeed: true, msg: 'Thank you. We have got your message' });
  } else {
    throw new BadRequestError('input fields should not be empty');
  }
};

const getAllMessage = async (req, res) => {
  const messages = await Contact.findAll({});
  res.json({ succeed: true, result: messages });
};

const sendEmailToClient = async (req, res) => {
  const mode = req.params.mode;
  const { text, subject, email, name, msgId } = req.body;
  if (!text) {
    throw new Error(`you didn't give any reply`);
  }

  try {
    const response = await mailer(
      {
        info: {
          subject: subject || 'We are here for you!',
          body: text,
        },
        client: {
          fullName: name,
          email: email,
        },
      },
      'custom'
    );
    if (mode === 'contact') {
      await Contact.update({ replied: 1 }, { where: { id: msgId } });
    }
    res.json({ succeed: true, msg: 'email sent' });
  } catch (error) {
    throw new BadRequestError(error);
  }
};

const smsToClient = async (req, res) => {
  const mode = req.params.mode;
  const { phone, message } = req.body;
  if (!phone || !message) {
    throw new BadRequestError('Fields must not be empty');
  }

  try {
    const response = await sendSMS(phone, message);
    if (response.type == '1101') res.json({ succeed: true, msg: response.msg });
    else res.json({ succeed: false, msg: response.msg });
  } catch (error) {
    throw new BadRequestError(error);
  }
};

module.exports = {
  sendMessage,
  getAllMessage,
  sendEmailToClient,
  smsToClient,
};
