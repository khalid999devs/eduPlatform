const htmlCreator = (mode, data) => {
  let subject = data?.info?.subject,
    body = data?.info?.body;
  text = data?.info?.text;

  let client = data.client;

  if (mode === 'par') {
    (subject = `Congratulations! Registration Successful!`),
      (body = `<td align="center" style="padding: 40px 20px; background-color: #F1F1F6;">
                <img src="https://github.com/khalid999devs/eduPlatform/blob/main/client/public/Images/emailTemp.png?raw=true" alt="Welcome" width="120" style="display: block; margin-bottom: 20px;" />
                <h1 style="font-size: 24px; color: #041139; margin: 0;">Welcome to Chemgeine!</h1>
                <p style="font-size: 16px; color: #1F2937; margin: 20px 0 30px 0;">Hi ${client.fullName}, We are excited to have you on board. Dive into the fascinating world of Chemistry with Chemgeine. Unlock your potential and explore the endless possibilities that chemistry offers.</p>
                <a href="https://chemgenie.app/courses" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #041139; background-color: #FDE047; text-decoration: none; border-radius: 5px;">Get Started</a>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; background-color: #101c44;">
                <h2 style="font-size: 20px; color: #FDE047; margin: 0 0 10px 0;">What's Next?</h2>
                <p style="font-size: 14px; color: #d1d1ba; margin: 0;">Explore the various Courses and resources we have available for you.</p>
            </td>`);
  } else if (mode === 'resetPass') {
    subject = 'Here is your OTP!';
    body = `<td style="padding: 35px 20px; background-color: #F1F1F6;">
                <p style="font-size: 16px; color: #1F2937; margin: 20px 0;">Dear ${client.fullName},</p>
                <p style="font-size: 16px; color: #1F2937; margin: 20px 0;">Please use this OTP to reset your password</p>
                    <h2 align="center" style="margin-top:35px;background-color:rgb(0,0,0);olor:rgb(255,255,255);width:100%">${data.info.otp}</h2><br>
                <p style="font-size: 16px; color: #1F2937; margin: 20px 0;">
                    Best regards,<br>
                    --Chemgeine
                </p>
            </td>`;
  } else if (mode === 'order') {
    const { client, info } = data;
    subject = `Course purchase successful!`;
    body = `<td style="padding: 35px 20px; background-color: #F1F1F6;">
                <p style="font-size: 16px; color: #1F2937; margin: 20px 0;">Dear ${client.fullName},</p>
                <p style="font-size: 16px; color: #1F2937; margin: 10px 0;">Congratulations! Your purchase for course: ${info.courseName} is successful.</p>
                
                <p style="font-size: 16px; color: #1F2937; margin: 10px 0;">Your invoice no. <strong>${info.paymentInfo.invoiceNo}</strong></p>
                <p style="font-size: 16px; color: #1F2937; margin: 30px 0;">
                    Best regards,<br>
                    --Chemgeine
                </p>
            </td>`;
  } else if (mode === 'questionReply') {
    (subject = `Someone replied to your question or discussion!`),
      (body = `<td style="padding: 35px 20px; background-color: #F1F1F6;">
                <p style="font-size: 16px; color: #1F2937; margin: 20px 0;">Dear ${
                  client.fullName
                },</p>
                <p style="font-size: 16px; color: #1F2937; margin: 10px 0;"> You have a new reply ${
                  data.info.senderName ? 'from ' + data.info.senderName : ''
                } to your question or discussion, "${
        data.info.discussionTitle
      }" in the course, <strong>${data.info.courseTitle}</strong></p>
                <p style="font-size: 16px; color: #1F2937; margin: 30px 0;">
                    Best regards,<br>
                    --Chemgeine
                </p>
            </td>
    `);
  } else if (mode === 'custom') {
    subject = subject;
    body = `<td style="padding: 35px 20px; background-color: #F1F1F6;">
                <p style="font-size: 16px; color: #1F2937; margin: 20px 0;">Dear ${client.fullName},</p>
                <p style="font-size: 16px; color: #1F2937; margin: 10px 0;">${data.info.body}</p>
                <p style="font-size: 16px; color: #1F2937; margin: 30px 0;">
                    Best regards,<br>
                    --Chemgeine
                </p>
            </td>
    `;
  }

  return { subject, body, text };
};

module.exports = { htmlCreator };
