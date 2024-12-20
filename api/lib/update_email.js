export const savedPropertyUpdateTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Property Update Notification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
    <tr>
      <td align="center" style="background-color: #354259; padding: 20px;">
        <h1 style="color: #ffffff; margin: 0;">Woodland Escape</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <h2 style="color: #333333;">Saved Property Update</h2>
        <p style="color: #555555; line-height: 1.6;">Hi there,</p>
        <p style="color: #555555; line-height: 1.6;">
          Your saved property, "<strong style="color: #354259;">{{listingName}}</strong>", has been updated with new details.
        </p>
        <p style="color: #555555; line-height: 1.6;">Check out the latest changes to stay informed about your favorite properties.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="{{propertyLink}}" style="display: inline-block; background-color: #354259; color: #ffffff; font-size: 18px; padding: 12px 24px; border-radius: 5px; text-decoration: none;">
            View Updated Property
          </a>
        </div>
        <p style="color: #555555; line-height: 1.6;">Thank you for using Woodland Escape!</p>
        <p style="color: #333333; font-weight: bold;">The Woodland Escape Team</p>
      </td>
    </tr>
    <tr>
      <td align="center" style="background-color: #f4f4f4; padding: 10px;">
        <p style="color: #888888; font-size: 12px; margin: 0;">© 2024 Woodland Escape. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`
