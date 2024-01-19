const htmlCreator = (mode, data) => {
  let subject = data.info.subject,
    body = data.info.body;
  text = data.info.text;

  let client = data.client;

  if (mode === 'par') {
    (subject = `Registration Successful!`),
      (body = `
    <h2 style="color:green;">Congratulations!! Your registration is successful</h2>
    `);
  } else if (mode === 'resetPass') {
    subject = 'Here is your OTP!!';
    body = `
    <h3>Please use this to reset your password</h3>
    <h2 align="center" style="margin-top:20px;background-color:rgb(0,0,0); color:rgb(255,255,255)">${data.info.otp}</h2><br>
     `;
  } else if (mode === 'order') {
    const { client, info } = data;
    subject = `Course purchase successful!`;
    body = `
    <p>Dear ${client.fullName}, your purchase for course: ${info.courseName} is successful</p>
    `;
  } else if (mode === 'custom') {
    subject = subject;
    body = `
    <p>Dear ${client.fullName}, ${data.info.body}</p>
    `;
  }

  return { subject, body, text };
};

module.exports = { htmlCreator };
