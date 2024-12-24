require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM_MOBILE = process.env.TWILIO_FROM_MOBILE;
const client = require('twilio')(accountSid, authToken);

var helper = new function () {
      this.sendOtpforverify = async function (value, cb) {
            try {
                  value.phone_code = value.phone_code.includes('+') ? value.phone_code : '+' + value.phone_code
                 const message = await client.messages
                        .create({
                              body: 'Hello , Your otp is ' + value.otp,
                              from: TWILIO_FROM_MOBILE,
                              to: `${value.phone_code}${value.phone}`
                        })
                  // Log the message SID and execute the callback with success
                  console.log(message.sid);
                  if (cb) cb(null, message.sid);

            } catch (error) {
                  // Log the error
                  console.error(error);

                  // Execute the callback with the error
                  if (cb) cb(error);

                  // Optionally, you can return an error response if needed
                  return
            }
      }
}

module.exports = helper;