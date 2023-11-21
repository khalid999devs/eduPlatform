const htmlCreator = (mode, data) => {
  let subject = '',
    body = '',
    text = '';

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
  }

  return { subject, body, text };
};

module.exports = { htmlCreator };
