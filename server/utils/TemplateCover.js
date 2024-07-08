const EmailCover = (body) => {
  return (
    `<!DOCTYPE html>
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
                
               <h1 style="font-size: 2.5rem; font-weight: bold; color: #d1d1ba; width: fit-content; padding-right: 0.75rem;">
                    ChemGenie
                </h1>
            </td>
        </tr>
        <tr>` +
    body +
    `<tr>
            <td align="center" style="padding: 20px 0; background-color: #041139;">
                <a href="https://www.facebook.com/groups/896338317559704" style="margin: 0 10px;">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" alt="Facebook" width="30" style="display: inline-block;" />
                </a>
<a href="https://www.youtube.com/@chemgenie" style="margin: 0 10px;">
    <img src="https://img.icons8.com/ios-filled/50/ffffff/youtube-play.png" alt="YouTube" width="30" style="display: inline-block;" />
</a>


                <a href="https://www.linkedin.com/in/afnan-bin-siddique-126368123/" style="margin: 0 10px;">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" width="30" style="display: inline-block;" />
                </a>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 20px; background-color: #101c44; color: #d1d1ba;">
                <p style="margin: 0; font-size: 12px;">© 2024 ChemGeine. All rights reserved.</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;"><a href="tel:+8801752905580" style="text-decoration:underline;color: #d1d1ba;">+8801752905580</a>, Motijheel, Dhaka, Bangladesh</p>
                <!--<p style="margin: 5px 0 0 0; font-size: 12px;">-->
                <!--    <a href="https://www.example.com/unsubscribe" style="color: #FDE047; text-decoration: none;">Unsubscribe</a> | -->
                <!--    <a href="https://www.example.com/web-version" style="color: #FDE047; text-decoration: none;">View in Browser</a>-->
                <!--</p>-->
            </td>
        </tr>
    </table>
</body>
</html>`
  );
};

const EmailTextCover = (text) => {
  return (
    `<!DOCTYPE html>
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
                
               <h1 style="font-size: 2.5rem; font-weight: bold; color: #d1d1ba; width: fit-content; padding-right: 0.75rem;">
                    ChemGenie
                </h1>
            </td>
        </tr>
        <tr><td style="padding: 45px 20px; background-color: #F1F1F6;">` +
    text +
    `</td><tr>
            <td align="center" style="padding: 20px 0; background-color: #041139;">
                <a href="https://www.facebook.com/groups/896338317559704" style="margin: 0 10px;">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" alt="Facebook" width="30" style="display: inline-block;" />
                </a>
<a href="https://www.youtube.com/@chemgenie" style="margin: 0 10px;">
    <img src="https://img.icons8.com/ios-filled/50/ffffff/youtube-play.png" alt="YouTube" width="30" style="display: inline-block;" />
</a>


                <a href="https://www.linkedin.com/in/afnan-bin-siddique-126368123/" style="margin: 0 10px;">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" width="30" style="display: inline-block;" />
                </a>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 20px; background-color: #101c44; color: #d1d1ba;">
                <p style="margin: 0; font-size: 12px;">© 2024 ChemGeine. All rights reserved.</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;"><a href="tel:+8801752905580" style="text-decoration:underline;color: #d1d1ba;">+8801752905580</a>, Motijheel, Dhaka, Bangladesh</p>
                <!--<p style="margin: 5px 0 0 0; font-size: 12px;">-->
                <!--    <a href="https://www.example.com/unsubscribe" style="color: #FDE047; text-decoration: none;">Unsubscribe</a> | -->
                <!--    <a href="https://www.example.com/web-version" style="color: #FDE047; text-decoration: none;">View in Browser</a>-->
                <!--</p>-->
            </td>
        </tr>
    </table>
</body>
</html>`
  );
};

module.exports = { EmailCover, EmailTextCover };
