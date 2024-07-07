const EmailCover = (body) => {
  return (
    body +
    `
    --Chemgenie
 `
  );
};

const EmailTextCover = (text) => {
  return (
    text +
    `

 `
  );
};

module.exports = { EmailCover, EmailTextCover };

const fullCoverWelcome = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Chemgeine</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #041139; color: #efefef;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; border-collapse: collapse; margin: 0 auto;">
        <tr>
            <td align="center" style="padding: 20px 0; background-color: #101c44;">
                <img src="https://via.placeholder.com/200x50?text=Chemgeine+Logo" alt="Chemgeine Logo" width="200" style="display: block;" />
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 40px 20px; background-color: #F1F1F6;">
                <img src="https://via.placeholder.com/100x100?text=Welcome" alt="Welcome" width="100" style="display: block; margin-bottom: 20px;" />
                <h1 style="font-size: 24px; color: #041139; margin: 0;">Welcome to Chemgeine!</h1>
                <p style="font-size: 16px; color: #1F2937; margin: 20px 0 30px 0;">We are excited to have you on board. Dive into the fascinating world of Chemistry with Chemgeine. Unlock your potential and explore the endless possibilities that chemistry offers.</p>
                <a href="https://www.example.com" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #041139; background-color: #FDE047; text-decoration: none; border-radius: 5px;">Get Started</a>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; background-color: #101c44;">
                <h2 style="font-size: 20px; color: #FDE047; margin: 0 0 10px 0;">What's Next?</h2>
                <p style="font-size: 14px; color: #d1d1ba; margin: 0;">Explore the various Courses and resources we have available for you.</p>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 20px 0; background-color: #041139;">
                <a href="https://www.facebook.com" style="margin: 0 10px;">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" alt="Facebook" width="30" style="display: inline-block;" />
                </a>
                <a href="https://www.twitter.com" style="margin: 0 10px;">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter-squared.png" alt="Twitter" width="30" style="display: inline-block;" />
                </a>
                <a href="https://www.linkedin.com" style="margin: 0 10px;">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" width="30" style="display: inline-block;" />
                </a>
                <a href="https://www.instagram.com" style="margin: 0 10px;">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" width="30" style="display: inline-block;" />
                </a>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 20px; background-color: #101c44; color: #d1d1ba;">
                <p style="margin: 0; font-size: 12px;">© 2024 Chemgeine. All rights reserved.</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;">800 Broadway, Suite 1500, New York, NY 000123, USA</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;">
                    <a href="https://www.example.com/unsubscribe" style="color: #FDE047; text-decoration: none;">Unsubscribe</a> | 
                    <a href="https://www.example.com/web-version" style="color: #FDE047; text-decoration: none;">View in Browser</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
`;

const templateBodyCustom = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Message from Chemgeine</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #041139; color: #efefef;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; border-collapse: collapse; margin: 0 auto;">
        <tr>
            <td align="center" style="padding: 20px 0; background-color: #101c44;">
                <img src="https://via.placeholder.com/200x50?text=Chemgeine+Logo" alt="Chemgeine Logo" width="200" style="display: block;" />
            </td>
        </tr>
        <tr>
            <td style="padding: 35px 20px; background-color: #F1F1F6;">
                <p style="font-size: 16px; color: #1F2937; margin: 20px 0;">Dear Student,</p>
                <p style="font-size: 16px; color: #1F2937; margin: 20px 0;">Template Message lorem ipsum domnor sit amet ipsum irum</p>
                <p style="font-size: 16px; color: #1F2937; margin: 20px 0;">
                    Best regards,<br>
                    --Chemgeine
                </p>
            </td>
        </tr>

        <tr>
            <td align="center" style="padding: 20px 0; background-color: #041139;">
                <a href="https://www.facebook.com" style="margin: 0 10px;">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" alt="Facebook" width="30" style="display: inline-block;" />
                </a>
                <a href="https://www.twitter.com" style="margin: 0 10px;">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter-squared.png" alt="Twitter" width="30" style="display: inline-block;" />
                </a>
                <a href="https://www.linkedin.com" style="margin: 0 10px;">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" width="30" style="display: inline-block;" />
                </a>
                <a href="https://www.instagram.com" style="margin: 0 10px;">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" width="30" style="display: inline-block;" />
                </a>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 20px; background-color: #101c44; color: #d1d1ba;">
                <p style="margin: 0; font-size: 12px;">© 2024 Chemgeine. All rights reserved.</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;">800 Broadway, Suite 1500, New York, NY 000123, USA</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;">
                    <a href="https://www.example.com/unsubscribe" style="color: #FDE047; text-decoration: none;">Unsubscribe</a> | 
                    <a href="https://www.example.com/web-version" style="color: #FDE047; text-decoration: none;">View in Browser</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
`;
