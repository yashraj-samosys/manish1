const nodemailer = require('nodemailer');
const mail = function () { }

const transporter2 = nodemailer.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "test@ashagramtrust.org",
            pass: "Test!@#123"
            //   user: "samosys.ios@gmail.com", 
            //   pass: "Samo@123",
        },
    })


const transporter3 = nodemailer.createTransport(
    {
        host: "mail.cityemail.com",
        port: 587,
        secure: false,
        auth: {
            user: "webform@myreferralnetwork.ca",
            pass: "mrnca@2024!"
        },
    })
// let from = 'info@myreferralnetwork.ca'

// ************************LIVE CLIENT SMTP***********************************

const transporter = nodemailer.createTransport({
    host: "mail.cityemail.com",
       port: 587,
       requireTLS: true,
       checkServerIdentity: () => { return null; },
       auth: {
         user: "webform@myreferralnetwork.ca", 
         pass: "samosys123", 
       }, 
      starttls: {
           minVersion: 'TLSv1.2',
           maxVersion: 'TLSv1.3',
           ciphers: 'TLS_AES_256_GCM_SHA384'
       }
   });
   const from ='info@myreferralnetwork.ca';

// ***********************LIVE CLIENT SMTP************************************


mail.updatePassword = async (data) => {
    let subject = "Update Password";
    let html = ` <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        Hello ${data.first_name} ${data.last_name} <br>
        Welcome to My Referral Network. Your account is successfully created. Click on below button to create or update your account password.<br>
         <br>
        <a style="background-color:#EB7035;border:1px solid #EB7035;border-radius:3px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:16px;line-height:44px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;mso-hide:all;" target="_blank"   href="${process.env.updatePasswordURL + data.token}" >Create Password</a>
        <br/><br/>Enjoy the use of our Site.<br><br>
        Sincerely,<br/><br>
        The My Referral Network Team
    
    </body>
    </html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });

        return true;
    } catch (err) {
        return false;
    }
};

// mail.PublicUserRegistration = async (data) => {
//     // console.log('Public data',data)
//     let subject = " Public User Registration Successful";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//     Hello ${data.name}, <br>
//     Welcome to My Referral Network. You have successfully registered as a “Public User” Please verify your email by clicking the link below to verify your account.<br><br>
//     Enjoy using this free tool to find a great Real Estate Agent right across the country to help you find a home in the neighbourhood you like. 
//     <a target="_blank"  href="${process.env.VerifyAccount}${data.isEmailVerify}">Verify Account</a> 
//     <br><br> 
//     At your Service, 
//      <br/>
//      The My Referral Network Team 

//     </body>
//     </html>`;
//     console.log('from', from)
//     try {
//         let res = await transporter.sendMail({ from: from, to: [data.email], subject: subject, html: html });
//         console.log('resmail', res);
//         return true;
//     } catch (err) {
//         console.log('errmail', err);
//         return false;
//     }
// };
mail.PublicUserRegistration = async (data) => {
    console.log('Public data', data)
    let subject = " Public User Registration Successful";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
<tr>
    <td style="padding: 0 0 0 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
            <tr>
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

                </tr>
                </table>
                </td>
             
            </tr>
            <tr>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td valign="top"  width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                          
                                </table>
                            </td>
                            <td width="50%">
                            
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                            style="margin: 0 auto; width: 100%;margin-top: -160px;">
                            <tr>
                                <td
                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                    <img src="${process.env.image_logo}//rn-logo.png" style="width: 200px;"
                                        alt="logo">
                                    <!--     <h2 style="color:#001328 ">Email Confirmation</h2> -->
                                    <h4
                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                        Hello <span>${data.name},</span></h4>
                                    <p> Welcome to My Referral Network. You have successfully registered as a
                                        “Public User” Please verify your email by clicking the link below to verify
                                        your account.<br><br>
                                        Enjoy using this free tool to find a great Real Estate Agent right across
                                        the country to help you find a home in the neighbourhood you like. <a
                                            target="_blank"
                                            href="${process.env.VerifyAccount}${data.isEmailVerify}">Verify
                                            Account</a>
                                    </p>
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;">At your service,</p>
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;">The My Referral Network Team
                                    </p>
                                </td>
                            </tr>
                        </table>

                                
                            </td>
                            
                            <td valign="top" width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                </table>
                            </td>

                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td  style="padding: 00px 30px 00px 30px;">
                    
                </td>
                
            </tr>
        </table>
    </td>
</tr>
</table>

</body>

</html>`;
    console.log('from', from)
    try {
        let res = await transporter.sendMail({ from: from, to: [data.email], subject: subject, html: html });
        console.log('resmail', res);
        return true;
    } catch (err) {
        console.log('errmail', err);
        return false;
    }
};



// mail.sendMailToAdminForRealtorSignUp = async (data) => {
//     console.log(data, 'sendMailToAdminForRealtorSignUp===>>>>>>>');
//     console.log(process.env.verifyRealtor, 'process.env.verifyRealtor')
//     let subject = "Realtor Information";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//         <script>
//         function a (b){
//             alert('I am working' + 1)
//         }
//     </script>
//     </head>
//     <body>
//     Hello Admin, <br>
//     A new realtor has signed up and joined the My Referral Network and Please find information below.<br>
//     The Realtor name is ${data.name}.<br>
//     The Realtor phone number is ${data.phone} <br>
//     The Realtor email is ${data.email} <br>
//     If you want to delete than <a href="${process.env.verifyRealtor}${data.id}" target="_blank">Click here </a>


//      <br/><br/>
//      At your service,<br>
//      The My Referral Network Team 

//     </body>

//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
//         console.log(res)
//         return true;
//     } catch (err) {
//         console.log(err)
//         return false;
//     }
// };
// mail.sendMailToAdminForRealtorSignUp = async (data) => {
//     let subject = "New Realtor Sign up verified";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//     Hello Admin, <br>
//     ${data.name} has signed up and has been verified. <br><br>

//     Realtor Phone: ${data.phone} <br>
//     Realtor Email: ${data.email} <br>
//     Realtor Brokerage: ${data.estate_brokeraege} 

//      <br/><br/>
//      At your service,<br>
//      The My Referral Network Team 

//     </body>

//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
//         console.log(res)
//         return true;
//     } catch (err) {
//         console.log(err)
//         return false;
//     }
// };
mail.sendMailToAdminForRealtorSignUp = async (data) => {
    let subject = "New Realtor Sign up verified";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
<tr>
    <td style="padding: 0 0 0 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
            <tr>
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

                </tr>
                </table>
                </td>
             
            </tr>
            <tr>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td valign="top"  width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                          
                                </table>
                            </td>
                            <td width="50%">
                            
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                            style="margin: 0 auto; width: 100%;margin-top: -160px;">
                            <tr>
                                <td
                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                    <img src="${process.env.image_logo}//rn-logo.png" style="width: 200px;"
                                        alt="logo">
                                    <!--     <h2 style="color:#001328 ">Email Confirmation</h2> -->
                                    <h4
                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                        Hello Admin,
                                    </h4>
                                    ${data.name} has signed up and has been verified. <br>
                                    <p>
                                        Realtor Phone: ${data.mobile} <br>
                                        Realtor Email: ${data.email} <br>
                                        Realtor Brokerage: ${data.brokerageName}
                                        <br />
                                    </p>
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;">At your service,</p>
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;">The My Referral Network Team
                                    </p>
                                </td>
                            </tr>
                        </table> 

                                
                            </td>
                            
                            <td valign="top" width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                </table>
                            </td>

                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td  style="padding: 00px 30px 00px 30px;">
                    
                </td>
                
            </tr>
        </table>
    </td>
</tr>
</table>

</body>
</html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
        // console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};

// mail.sendMailAgentForRequestAccept = async (data) => {
//     // console.log('sendmailAdminforRequwestAccept 1', data)
//     let subject = "New Referral Client information from My Referral Network.";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//         Hello ${data.agent_name} , <br>
//         Thanks for accepting the referral. Here is the Client’s information. Get hold of them as soon as you can.<br>
//         <br>
//           Client Name: ${data.public_user_name}.<br>
//           Client Phone: ${data.public_user_phone}.<br>
//           Client Email : ${data.public_email}.<br><br>
//           Let me know when you have made contact.<br><br>
//           At your Service, <br>
//           Stewart Peddemors PREC <br>
//           RE/MAX Colonial Pacific Realty Ltd. <br>
//           604-329-6759 <br>
//           stewart@peddemors.ca <br>

//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: 'laka@mailinator.com', subject: subject, html: html });
//         // let res = await transporter.sendMail({ from: from, to: data.agent_email, subject: subject, html: html });
//         console.log(res)
//         return true;
//     } catch (err) {
//         console.log(err)
//         return false;
//     }
// };
mail.sendMailAgentForRequestAccept = async (data) => {
    // console.log('sendmailAdminforRequwestAccept 1', data)
    let subject = "New Referral Client information from My Referral Network.";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
<tr>
    <td style="padding: 0px 0 30px 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
            <tr>
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                </tr>
                </table>
                </td>
                </tr>
            <tr>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td valign="top"  width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                            </table>
                            </td>
                            <td width="50%">                            
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                            style="margin: 0 auto; width: 100%;margin-top: -160px;">
                            <tr>
                                <td
                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                    <img src="${process.env.image_logo}//rn-logo.png" style="width: 200px;"
                                        alt="logo">
                                   <h4
                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                        Hello ${data.agent_name},</h4>
                                    <p>
                                    Thanks for accepting the referral. Here is the Client’s information. Get hold of
                                    them as soon as you can.<br><br>
                                    Client Name: ${data.public_user_name}<br>
                                    Client Phone: ${data.public_user_phone}<br>
                                    Client Email : ${data.public_email}<br><br>
                                    Let me know when you have made contact.<br>
                                    </p>
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;"> At your Service, <br>
                                        Stewart Peddemors PREC <br>
                                        RE/MAX Colonial Pacific Realty Ltd. <br>
                                        604-329-6759 <br>
                                        stewart@peddemors.ca <br>
                                        
                                        </p>
                                </td>
                            </tr>
                        </table>
                            </td>
                            <td valign="top" width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td  style="padding: 00px 30px 00px 30px;">
                </td>
            </tr>
        </table>
    </td>
</tr>
</table>
</body>

</html>`;
    try {
        // let res = await transporter.sendMail({ from: from, to: 'laka@mailinator.com', subject: subject, html: html });
        let res = await transporter.sendMail({ from: from, to: data.agent_email, subject: subject, html: html });
        console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};


// mail.sendMailToPublicRegistration = async (data) => {
//     // console.log('Public data0000000000',data)
//     let subject = "New Public User sign up My Referral Network";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//     Hello Admin, <br>
//     A new Public User has successfully signed up and verified email.<br><br>

//     Name: ${data.name}<br>
//     Phone: ${data.mobile}<br>
//     Email: ${data.email}
//      <br/><br/>
//      At your service,<br>
//      The My Referral Network Team 

//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
//         console.log('resmail', res);
//         return true;
//     } catch (err) {
//         console.log('errmail', err);
//         return false;
//     }
// };
mail.sendMailToPublicRegistration = async (data) => {
    // console.log('Public data0000000000',data)
    let subject = "New Public User sign up My Referral Network";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
<tr>
    <td style="padding: 0 0 0 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
            <tr>
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

                </tr>
                </table>
                </td>
             
            </tr>
            <tr>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td valign="top"  width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                          
                                </table>
                            </td>
                            <td width="50%">
                            
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                            style="margin: 0 auto; width: 100%;margin-top: -160px;">
                            <tr>
                                <td
                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                    <img src="${process.env.image_logo}//rn-logo.png" style="width: 200px;"
                                        alt="logo">
                                    <!--     <h2 style="color:#001328 ">Email Confirmation</h2> -->
                                    <h4
                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                        Hello Admin,</h4>
                                    A new Public User has successfully signed up and verified email.<br><br>

                                    Name: ${data.name}<br>
                                    Phone: ${data.mobile}<br>
                                    Email: ${data.email}
                                    <br /><br />

                                    <p style="margin:0px 0px 0px 0px; font-size:16px;">At your service,</p>
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;">The My Referral Network Team
                                    </p>
                                </td>
                            </tr>
                        </table>

                                
                            </td>
                            
                            <td valign="top" width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                </table>
                            </td>

                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td  style="padding: 00px 30px 00px 30px;">
                    
                </td>
                
            </tr>
        </table>
    </td>
</tr>
</table>

</body>

</html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
        console.log('resmail', res);
        return true;
    } catch (err) {
        console.log('errmail', err);
        return false;
    }
};

// mail.RealtorRegistration = async (data) => {
//     let subject = "Realtor Partner Sign up verify your account";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//     Hello ${data.name}, <br>
//     Welcome to My Referral Network. You have successfully registered as a free Realtor Partner and once you have verified your account by clicking the link below you will be able to connect easily with agents across the country.<br>
//     Enjoy using this tool to build your network of great Real Estate Agents right across the country. Use this tool to find the right agent in the right neighbourhood for your clients. <br><br>

//     <a target="_blank"  href="${process.env.VerifyJoinus + data.id}">Verify Account</a> <br><br>

//     At your service, <br>
//     The My Referral Network Team

//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: [data.email], subject: subject, html: html });
//         console.log('resmail', res);
//         return true;
//     } catch (err) {
//         console.log('errmail', err);
//         return false;
//     }
// };
mail.RealtorRegistration = async (data) => {
    let subject = "Free Realtor Account and Information Verified";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
<tr>
    <td style="padding: 0 0 0 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
            <tr>
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

                </tr>
                </table>
                </td>
             
            </tr>
            <tr>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td valign="top"  width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                          
                                </table>
                            </td>
                            <td width="50%">
                            
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                            style="margin:0 auto; width: 100%; padding: 10px;
                            background: #ffffff;" >
                            <tr>
                                <td
                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                    <img src="${process.env.image_logo}//rn-logo.png" style="width: 200px;"
                                        alt="logo">
                                    <!--     <h2 style="color:#001328 ">Email Confirmation</h2> -->
                                    <h4
                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                        Hello <span>${data.name},</span>
                                    </h4>
                                    <p style="color: #001328;">Your information has been updated and your account has been successfully verified.<br><br>
                                        Enjoy using this tool to build your network of great Real Estate Agents
                                        right across the country. Use this tool to find the right agent in the right
                                        neighbourhood for your clients.
                                        <br><br> Here is a link to the Realtor Sign In page.
                                        <a target="_blank" href="${process.env.VerifyJoinus + data.id}">Click Here</a><br> <br>
                                    </p>                                        
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;color: #001328;">At your service,</p>
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;color: #001328;">The My Referral Network Team
                                    </p>
                                </td>
                            </tr>
                        </table>
                            </td>
                            
                            <td valign="top" width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                </table>
                            </td>

                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td  style="padding: 00px 30px 00px 30px;">
                </td>
            </tr>
        </table>
    </td>
</tr>
</table>
</body>
</html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: [data.email], subject: subject, html: html });
        // console.log('resmail', res);
        return true;
    } catch (err) {
        console.log('errmail', err);
        return false;
    }
};

// mail.RealtorRegistrationFromLink = async (data) => {
//     let subject = " Registration Successful, you just need to click the Verify link";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//     Hello ${data.first_name} ${data.last_name}, <br>
//      Welcome to my Referral network. You have successfully registered as a realtor once you have verified by clicking the link below to verify your account.
//       Enjoy using this tool to find great real estate agents right across the country to help you find a home in the
//        neighbourhood you like. <a target="_blank" href="${process.env.JoinUs + data.id}">Verify Account</a>  At your Service, 
//      <br/><br/>
//      The My Referral Network Team

//     </body>
//     </html>`;
//     // <a target="_blank"  href="${process.env.VerifyAccount}${data.isEmailVerify}">Verify Account</a>
//     try {
//         let res = await transporter.sendMail({ from: from, to: [data.email], subject: subject, html: html });
//         return true;
//     } catch (err) {
//         return false;
//     }
// };

mail.RealtorRegistrationFromLink = async (data) => {
    let subject = " Registration Successful, you just need to click the Verify link";
    let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet">
    <style type="text/css">
        p{
            font-size:16px;
        }
    </style>
    </head>
    <body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
    <tr>
        <td style="padding: 0 0 0 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
    
                    </tr>
                    </table>
                    </td>
                 
                </tr>
                <tr>
                    <td>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td valign="top"  width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                              
                                    </table>
                                </td>
                                <td width="50%">
                                
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 auto; width: 100%;margin-top: -160px;">
                                <tr>
                                    <td style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                        <img src="${process.env.image_logo}//rn-logo.png"  style="width: 200px;" alt="logo" >
                                        <h4 style="font-weight:normal;margin-top:20px; margin-bottom:0px;  padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">Hello <span>${data.first_name} ${data.last_name},</span></h4>
                                        <p>
                                        Welcome to my Referral network. You have successfully registered as a realtor once you have verified by clicking the link below to verify your account.
                                        Enjoy using this tool to find great real estate agents right across the country to help you find a home in the
                                        neighbourhood you like.<br> <a target="_blank" href="${process.env.JoinUs + data.id}">Verify Account</a> <br> 
                                        </p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">At your service, </p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">The My Referral Network Team.</p>
                                    </td>
                                </tr>
                            </table>
    
                                </td>
                                
                                <td valign="top" width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    </table>
                                </td>
    
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td  style="padding: 00px 30px 00px 30px;">
                        
                    </td>
                    
                </tr>
            </table>
        </td>
    </tr>
    </table>
    
    </body>
    </html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: [data.email], subject: subject, html: html });
        return true;
    } catch (err) {
        return false;
    }
};

// mail.CreateRequest = async (data) => {
//     console.log('e', process.env.requetsPage + data.agent_id + '/' + data.req_id + '/1');

//     // Hello ${data.agent_name} <br>
//     //     You have new request for became Partner account by ${data.name}. <br><br>
//     //     <br/><br/>Regards,<br/>Team Refferal<br/>Thank you 

//     let subject = "New Referral for you from My Referral Network.";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>

//         Hello ${data.agent_name}, <br>
//         I have a client who is looking for help in your area. 
//         Specifically, ${data.nieghborhood} , FSA Area ${data.arrfsa}. 
//         If you wish to receive this referral for a 25% referral fee then just click on the link and their information will be sent to you right away. 
//         If you don’t want to click but want the referral call me.<br><br>

//          <a href="${process.env.requetsPage + data.req_id + '/1'}" target="_blank">Accept </a> &nbsp;   <a href="${process.env.requetsPage + data.req_id + '/2'}" target="_blank">Decline </a>  <br><br>
//             At your Service,<br>
//             Stewart Peddemors PREC <br>
//             RE/MAX Colonial Pacific Realty Ltd. <br>
//             604-329-6759 <br>
//             stewart@peddemors.ca 

//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: [data.agent_email], subject: subject, html: html });
//         console.log(res)
//         return true;
//     } catch (err) {
//         console.log(err)
//         return false;
//     }
// };
mail.CreateRequest = async (data) => {
    console.log(data, 'ceate request=====?')
    console.log('e', process.env.requetsPage + data.agent_id + '/' + data.req_id + '/1');

    // Hello ${data.agent_name} <br>
    //     You have new request for became Partner account by ${data.name}. <br><br>
    //     <br/><br/>Regards,<br/>Team Refferal<br/>Thank you 

    let subject = "I have a referral for you";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>My Refferal Network</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
            rel="stylesheet">
        <style type="text/css">
            p {
                font - size: 16px;
            }
        </style>
    </head>

    <body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td style="padding: 0 0 0 0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;"
                        style="border-collapse: collapse; width: 100%;">
                        <tr>
                            <td align="left" bgcolor="#175da1"
                                style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="left" bgcolor="#175da1"
                                            style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                                        <td align="left" bgcolor="#175da1"
                                            style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

                                    </tr>
                                </table>
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td valign="top" width="25%">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>

                                            </table>
                                        </td>
                                        <td width="50%">

                                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                style="margin: 0px auto 100px auto; width: 100%;margin-top: -160px;">
                                                <tr>
                                                    <td
                                                        style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                                        <img src="${process.env.image_logo}//rn-logo.png"
                                                            style="width: 200px;" alt="logo">
                                                        <h4
                                                            style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                                            Hello ${data.agent_name},</h4>
                                                        <p>
                                                            I have a client who is looking for help in your area.
                                                            Specifically, ${data.nieghborhood} , FSA Area
                                                            ${data.arrfsa}.
                                                            If you wish to receive this referral for a 25% referral fee
                                                            then just click on
                                                            the link and their information will be sent to you right
                                                            away.
                                                            If you don’t want to Click the link but want the
                                                            referral, just give me a call.<br><br>
                                                            <a href="${process.env.requetsPage + data.req_id + '/1'}"
                                                                target="_blank">Accept
                                                            </a> &nbsp; <a
                                                                href="${process.env.requetsPage + data.req_id + '/2'}"
                                                                target="_blank">Decline </a> <br>
                                                        </p>
                                                        <p style="color: #001328;"><b>Sincerely,</b></p>
                                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">
                                                            Stewart Peddemors PREC <br>
                                                            604-329-6759 <br>
                                                            stewart@peddemors.ca </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>

                                        <td valign="top" width="25%">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                            </table>
                                        </td>

                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 00px 30px 00px 30px;">

                            </td>

                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

    </html>`;

    // <p style="margin:0px 0px 0px 0px; font-size:16px;"> At your
    //  Service,<br>
    //  Stewart Peddemors PREC <br>
    //  RE/MAX Colonial Pacific Realty Ltd. <br>
    //  604-329-6759 <br>
    //  stewart@peddemors.ca </p> <br>
    //  <a style="color:#d33117" href="${process.env.UnsubscribeURL + data.unsubscribe_agent + '/' + data.req_id}" target="_blank">Click here</a> no to receiving a referral from the system.
    try {
        // let res = await transporter.sendMail({ from: from, to: 'laka@mailinator.com', subject: subject, html: html });
        let res = await transporter.sendMail({ from: from, to: [data.agent_email], subject: subject, html: html });
        console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};


mail.CreateRequestForMapRefer = async (data) => {
    console.log('CreateRequestForMapRefer-->',data)
    console.log('e', process.env.requetsPage + data.agent_id + '/' + data.req_id + '/1');
    let subject = "New Referral for you";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>My Refferal Network</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
            rel="stylesheet">
        <style type="text/css">
            p {
                font - size: 16px;
            }
        </style>
    </head>

    <body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td style="padding: 0 0 0 0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;"
                        style="border-collapse: collapse; width: 100%;">
                        <tr>
                            <td align="left" bgcolor="#175da1"
                                style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="left" bgcolor="#175da1"
                                            style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                                        <td align="left" bgcolor="#175da1"
                                            style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

                                    </tr>
                                </table>
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td valign="top" width="25%">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>

                                            </table>
                                        </td>
                                        <td width="50%">

                                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                style="margin: 0px auto 100px auto; width: 100%;margin-top: -160px;">
                                                <tr>
                                                    <td
                                                        style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                                        <img src="${process.env.image_logo}//rn-logo.png"
                                                            style="width: 200px;" alt="logo">
                                                        <h4
                                                            style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                                            Hello ${data.agent_name},</h4>
                                                        <p>
                                                            I have a client who is looking for help in your area.
                                                            Specifically, ${data.nieghborhood} , FSA Area
                                                            ${data.arrfsa}.
                                                            If you wish to receive this referral for a 25% referral fee
                                                            then just click on
                                                            the link and their information will be sent to you right
                                                            away.
                                                            If you don’t want to Click the link but want the
                                                            referral, just give me a call.<br><br>
                                                            <a href="${process.env.requetsPage + data.req_id + '/1'}"
                                                                target="_blank">Accept
                                                            </a> &nbsp; <a
                                                                href="${process.env.requetsPage + data.req_id + '/2'}"
                                                                target="_blank">Decline </a> <br>
                                                        </p>
                                                        <p style="color: #001328;"><b>Sincerely,</b></p>
                                                        <p style="margin:0px 0px 0px 0px; font-size:16px;"> 
                                                            Stewart Peddemors PREC <br>
                                                            604-329-6759 <br>
                                                            stewart@peddemors.ca </p> <br>
                                                            <a style="color:#d33117" href="${process.env.UnsubscribeURL + data.unsubscribe_agent + '/' + data.req_id}" target="_blank">Click here</a> if you don’t want future referrals from ${data.referring_agent_name} or My Referral Network.
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>

                                        <td valign="top" width="25%">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                            </table>
                                        </td>

                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 00px 30px 00px 30px;">

                            </td>

                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

    </html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: [data.agent_email], subject: subject, html: html });
        console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};

// mail.cancleRequestMail = async (data) => {
//     console.log(data, 'cancleRequestMail----')
//     let subject = "Referral Declined by Agent – Follow up needed";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//         Hello Admin, <br>
//         ${data.agent_name} has declined the referral of ${data.public_user_name}. <br><br>

//         Agent Phone: ${data.agent_phone} <br>
//         Agent email: ${data.agent_email} <br><br>

//         At your Service, <br>
//         The My Referral Network Team


//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: 'laka@mailinator.com', subject: subject, html: html });
//         // let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
//         console.log(res)
//         return true;
//     } catch (err) {
//         console.log(err)
//         return false;
//     }
// };


mail.cancleRequestMail = async (data) => {
    console.log(data, 'cancleRequestMail----')
    let subject = "Referral Declined by Agent – Follow up needed";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;">
<tr>
    <td style="padding: 0px 0 30px 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;"
            style="border-collapse: collapse; width: 100%;">
            <tr>
                <td align="left" bgcolor="#175da1"
                    style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td align="left" bgcolor="#175da1"
                                style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                            <td align="left" bgcolor="#175da1"
                                style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td valign="top" width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                </table>
                            </td>
                            <td width="50%">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                            style="max-width:600px;margin: 0 auto; width: 100%;margin-top: -160px;">
                            <tr>
                                <td
                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                    <img src="${process.env.image_logo}//rn-logo.png" style="width: 200px;"
                                        alt="logo">
                                    <h4
                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                        Hello Admin,</h4>
                                    <p>
                                        ${data.agent_name} has declined the referral of ${data.public_user_name}.
                                        <br><br>
                                        Agent Phone: ${data.agent_phone} <br>
                                        Agent email: ${data.agent_email} <br>
                                    </p>
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;"> At your Service,</p>
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;"> The My Referral Network Team
                                    </p>
                                </td>
                            </tr>
                            </table>
                            </td>
                            <td valign="top" width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="padding: 00px 30px 00px 30px;">
                </td>
            </tr>
        </table>
    </td>
</tr>
</table>
</body>

</html>`;
    try {
        // let res = await transporter.sendMail({ from: from, to: 'laka@mailinator.com', subject: subject, html: html });
        let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
        console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};

// mail.sendMailToAgentFieldForm = async (data) => {
//     console.log(data, 'sendMAIlAGENTField===>>>>>>>')
//     let subject = "Payment Successful";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//         Hello Admin <br>
//          ${data.public_user_name} has successfully paid and is now a client Agent. The account has been converted into an active Client Agent account. <br><br>At your Service,
//         <br/><br/>My Referral Network Team

//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
//         console.log(res)
//         return true;
//     } catch (err) {
//         console.log(err)
//         return false;
//     }
// };
mail.sendMailToAgentFieldForm = async (data) => {
    console.log(data, 'sendMAIlAGENTField===>>>>>>>')
    let subject = "Successful Payment and Verified Agent";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
<tr>
    <td style="padding: 0 0 0 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
            <tr>
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

                </tr>
                </table>
                </td>
             
            </tr>
            <tr>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td valign="top"  width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                          
                                </table>
                            </td>
                            <td width="50%">
                            
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                            style="margin: 0 auto; width: 100%;margin-top: -160px;">
                            <tr>
                                <td
                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                    <img src="${process.env.image_logo}//rn-logo.png" style="width: 200px;"
                                        alt="logo">
                                    <!--     <h2 style="color:#001328 ">Email Confirmation</h2> -->
                                    <h4
                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                        Hello Admin,</h4>
                                    ${data.public_user_name} has successfully paid and has verified their information. The Account has been
converted into an Active Client Agent.
                                    <br /><br />
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;">At your service,</p>
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;">The My Referral Network Team
                                    </p>
                                </td>
                            </tr>
                        </table> 

                                
                            </td>
                            
                            <td valign="top" width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                </table>
                            </td>

                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td  style="padding: 00px 30px 00px 30px;">
                    
                </td>
                
            </tr>
        </table>
    </td>
</tr>
</table>

</body>
</html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
        console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};
// mail.sendMailToAgentFieldForm2 = async (data) => {
//     console.log(data, 'sendMAIlAGENTField2===>>>>>>>')
//     let subject = "Payment Successful";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//         Hello ${data.public_user_name},<br>
//         You have successfully paid and is now a client Agent. The account has been converted into an active Client Agent account.
//         <br/><br/>
//         At your Service,<br>
//         My Referral Network Team

//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: [data.public_email], subject: subject, html: html });
//         console.log(res)
//         return true;
//     } catch (err) {
//         console.log(err)
//         return false;
//     }
// };
mail.sendMailToAgentFieldForm2 = async (data) => {
    let subject = "Payment Successful";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
<tr>
    <td style="padding: 0 0 0 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
            <tr>
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

                </tr>
                </table>
                </td>
             
            </tr>
            <tr>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td valign="top"  width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                          
                                </table>
                            </td>
                            <td width="50%">
                            
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                            style="margin: 0 auto; width: 100%;margin-top: -160px;">
                            <tr>
                                <td
                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                    <img src="${process.env.image_logo}//rn-logo.png" style="width: 200px;"
                                        alt="logo">
                                    <!--     <h2 style="color:#001328 ">Email Confirmation</h2> -->
                                    <h4
                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                        Hello ${data.public_user_name},</h4>
                                    You have successfully paid and is now a client Agent. The account has been
                                    converted into an active Client Agent account.
                                    <br /><br />
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;">At your service,</p>
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;">The My Referral Network Team
                                    </p>
                                </td>
                            </tr>
                        </table>

                                
                            </td>
                            
                            <td valign="top" width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                </table>
                            </td>

                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td  style="padding: 00px 30px 00px 30px;">
                    
                </td>
                
            </tr>
        </table>
    </td>
</tr>
</table>

</body>

</html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: [data.public_email], subject: subject, html: html });
        console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};
// mail.sendMailToClientRegisteration = async (data) => {
//     console.log(data, 'mailformate')
//     console.log(process.env.ClientSignIn, 'ClientSignIn++++++++')
//     let subject = "Realtor Client Sign up";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//         Hello ${data.public_user_name},<br>
//         Welcome to My Referral Network Client Program. You have successfully subscribed and are now a client Agent. Sign in with the link <a target="_blank" href="${process.env.ClientSignIn}">${process.env.ClientSignIn}</a> . <br>
//         You will now be able to create your own map of your referral network agents. Add or change any of the agents on your Network Map. <br>
//         When you first login check your profile and update any information. The better the information the more likely you will be successful with receiving referrals from your friends in Real Estate. <br>
//         Feel free to reach out to our team if you have any questions on using the system. <br><br>

//         info@myreferralnetwork.ca <br>
//         At your Service, <br>
//         My Referral Network Team

//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: [data.public_email], subject: subject, html: html });
//         console.log(res)
//         return true;
//     } catch (err) {
//         console.log(err)
//         return false;
//     }
// };

mail.sendMailToClientRegisteration = async (data) => {
    let subject = "Realtor Client Sign up";
    let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet">
    <style type="text/css">
        p{
            font-size:16px;
        }
    </style>
    </head>
    <body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
    <tr>
        <td style="padding: 0px 0 30px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
    
                    </tr>
                    </table>
                    </td>
                 
                </tr>
                <tr>
                    <td>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td valign="top"  width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                              
                                    </table>
                                </td>
                                <td width="50%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin: 0 auto; width: 100%;margin-top: -160px;">
<tr>
    <td style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
        <img src="${process.env.image_logo}//rn-logo.png"  style="width: 200px;" alt="logo" >
        <h4 style="font-weight:normal;margin-top:20px; margin-bottom:0px;  padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">Hello <span>${data.public_user_name},</span></h4>
        <p>
        Welcome to My Referral Network Client Program. You have successfully subscribed and are now a client Agent. Sign in with the link to get started. <a target="_blank" href="${process.env.ClientSignIn}">${process.env.ClientSignIn}</a> .<br>
        You will now be able to create your own map of your referral network agents. Add or change any of the agents on your Network Map. <br>
        When you first login check your profile and update any information. The better the information the more likely you will be successful with receiving referrals from your friends in Real Estate. <br>
        Feel free to reach out to our team if you have any questions on using the system.
        </p>
        <p style="margin:0px 0px 0px 0px; font-size:16px;">info@myreferralnetwork.ca, </p>
        <p style="margin:0px 0px 0px 0px; font-size:16px;">At your Service, </p>
        <p style="margin:0px 0px 0px 0px; font-size:16px;">The My Referral Network Team.</p>
    </td>
</tr>
</table>
                                    
                                </td>
                                
                                <td valign="top" width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    </table>
                                </td>
    
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td  style="padding: 00px 30px 00px 30px;">
                        
                    </td>
                    
                </tr>
            </table>
        </td>
    </tr>
    </table>
    
    </body>
    </html>
    `;
    try {
        let res = await transporter.sendMail({ from: from, to: [data.public_email], subject: subject, html: html });
        console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};

mail.acceptRequestMail = async (data) => {
    // Hello ${data.public_user_name} <br>
    //     Your request for became Partner agent is accepted by ${data.agent_name}.Click on below button to fill form for Partner agent <br>
    //     <a target="_blank"  href="${process.env.partnerAgentFromFillLink}${data.token}">Open Form</a><br>
    //     <br/><br/>Regards,<br/>Team Refferal<br/>Thank you 
    let subject = "Request Accepted";
    let html = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        Hello ${data.public_user_name},<br>
        Thank you for being part of My Referral Network. ${data.public_user_name} would like you to reach out and connect with them to help them ﬁnd homes in the Postal Code area ${data.fsa} <br>
        Here is the clients name ${data.public_user_name} and phone number  ${data.agent_phone}. Give them a call or email as they are expecting you to reach out to them for the Neighbourhood they have chosen.<br>
        
       <br><br>

        Your Referral Network Partner,<br>
        Stewart Peddemors<br>
        RE/MAX Colonial Paciﬁc Realty Ltd.<br>
        604-329-6759 stewartp@remax.net<br>



    
    </body>
    </html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail, data.public_email], subject: subject, html: html });
        console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};
mail.acceptRequestMailNew = async (data) => {
    let subject = "Your request has been accepted.";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;">
<tr>
    <td style="padding: 0px 0 30px 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;"
            style="border-collapse: collapse; width: 100%;">
            <tr>
                <td align="left" bgcolor="#175da1"
                    style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td align="left" bgcolor="#175da1"
                                style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                            <td align="left" bgcolor="#175da1"
                                style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td valign="top" width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                </table>
                            </td>
                            <td width="50%">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                            style="margin: 0 auto; width: 100%;margin-top: -160px;">
                            <tr>
                                <td
                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                    <img src="${process.env.image_logo}//rn-logo.png" style="width: 200px;"
                                        alt="logo">
                                    <h4
                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                        Hello ${data.public_user_name},</h4>
                                    <p>
                                        ${data.agent_name} has accepted your request for help in FSA 
                                        ${data.fsa}.<br><br>
                                        Your Realtor information is:<br>
                                        Realtor Name: ${data.agent_name} <br>
                                        Realtor Brokerage: ${data.agent_brokerageName} <br>
                                        Realtor Phone Number: ${data.agent_phone} <br>
                                        Realtor Email: ${data.agent_email}
                                    </p>
                            
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;"> At your Service,</p>
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;"> The My Referral Network Team
                                    </p>
                                </td>
                            </tr>
                            </table>
                            </td>
                            <td valign="top" width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="padding: 00px 30px 00px 30px;">
                </td>
            </tr>
        </table>
    </td>
</tr>
</table>
</body>

</html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail, data.public_email], subject: subject, html: html });
        // let res = await transporter.sendMail({ from: from, to: 'laka@mailinator.com', subject: subject, html: html });
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};

// mail.acceptRequestMailNew = async (data) => {
//     console.log(data,'acceptRequestMailNew==>>>');
//     console.log(data.token,'token')
//     console.log('process.env.partnerAgentFromFillLink',process.env.partnerAgentFromFillLink)
//     let subject = "Request Accepted";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//         Hello ${data.agent_name},<br>
//         I would like you to become part of My Referral Network. I will be happy to work with you for my referrals in ${data.fsa}.
// Click on below button to fill in all your information for being my Partner agent, so we can connect with each other quickly.<br>
// <a target="_blank" href="${process.env.partnerAgentFromFillLink}${data.token}">Open Form</a><br><br>

//         Your Referral Network Partner,<br>
//          Realtor Name: ${data.agent_name}  <br>
//          Realtor Brokerage: ${data.agent_brokerageName} <br>
//          Realtor Phone Number: ${data.agent_phone} <br>
//          Realtor Email: ${data.agent_email}


//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail, data.public_email], subject: subject, html: html });
//         console.log('====================', res)
//         return true;
//     } catch (err) {
//         console.log(err)
//         return false;
//     }
// };

mail.updatePasswordUpload = async (data) => {
    let subject = "Update Password";
    let html = ` <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        Hello ${data['Realtor Name']} <br>
        Welcome to My Refferal Network. Your account is successfully created by the My Referral Network Team. Click on the button below for creating your account password.
         <br>
        <a style="background-color:#EB7035;border:1px solid #EB7035;border-radius:3px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:16px;line-height:24px;text-align:center;text-decoration:none;width:65px;-webkit-text-size-adjust:none;mso-hide:all;" target="_blank"   href="${process.env.updatePasswordURL + data.token}" >Create Password</a>
        <br/><br/>Regards,<br/>Team Refferal<br/>Thank you 
    
    </body>
    </html>`;
    try {
        // let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail,data['Email']], subject: subject, html: html });
        let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
        console.log('resmail', res);
        return true;
    } catch (err) {
        console.log('err', err);
        return false;
    }
};



mail.sendMailToAdmin = async (data) => {
    // console.log(data,'sendMailToAdmin--->>>>')
    let subject = "Contact Us  Request Completed";
    let html = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        Hello Admin <br>
         ${data.name} has sent contact us inquiry.  <br><br>
         ${data.phone}<br>
         ${data.email}<br>
         ${data.message}<br>
        <br/><br/>Regards,<br/>Team Refferal<br/>Thank you 
    
    </body>
    </html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
        console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};

mail.sendOtpforverify = async (data) => {
    let subject = "OTP Code for Verification of Email";
    let html = ` <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
         Hello  ${data.name}, <br> Your OTP Code is for email verification  ${data.otp} <br>
        <br/><br/>At your service,<br/>My Referral Network Team. 
    </body>
    </html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });
        console.log('resmail', res);
        return true;
    } catch (err) {
        console.log('err', err);
        return false;
    }
};



// mail.sendMailAdminForRequest = async (data) => {
//     // console.log(data,'sendMialAdminForREquwets')
//     let subject = "New Referral for you from My Referral Network.";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//         Hello Admin,  <br>      
//         Customer Name: ${data.name} <br>
//         Customer Phone:  ${data.phone}.<br>F
//         Customer Email: ${data.email}.<br>
//         has requested a Realtor to help them in FSA - ${data.arrfsa}, Neighbourhood name - ${data.nieghborhood} <br><br>
//         Please contact the Agent to confirm they received the email.<br>
//         Realtor Name:  ${data.agent_name}<br>Fre
//         Realtor Phone:  ${data.phone_agent}<br>
//         Realtor Email:  ${data.agent_email}
//         <br/><br/>
//         At Your Service,<br/>
//         The My Referral Network Team
//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
//         console.log(res)
//         return true;
//     } catch (err) {
//         console.log(err)
//         return false;
//     }
// };

mail.sendMailAdminForRequest = async (data) => {
    // console.log(data,'sendMialAdminForREquwets')
    let subject = "New Referral for you from My Referral Network.";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td style="padding: 0 0 0 0;">
<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
<tr>
<td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
<td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

</tr>
</table>
</td>

</tr>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td valign="top" width="25%">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td bgcolor="#175da1">&nbsp;</td></tr>
<tr> <td bgcolor="#175da1">&nbsp;</td></tr>
<tr><td bgcolor="#175da1">&nbsp;</td> </tr>
<tr><td bgcolor="#175da1">&nbsp;</td></tr>
<tr> <td bgcolor="#175da1">&nbsp;</td></tr>
<tr><td bgcolor="#175da1">&nbsp;</td> </tr>
<tr><td bgcolor="#175da1">&nbsp;</td></tr>
<tr> <td bgcolor="#175da1">&nbsp;</td></tr>
<tr><td bgcolor="#175da1">&nbsp;</td> </tr>

</table>
</td>
<td width="50%">

<table border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="margin: 0px 0px 100px auto; width: 100%;margin-top: -160px;">
                                <tr>
                                    <td
                                        style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                        <img src="${process.env.image_logo}//rn-logo.png" style="width: 200px;"
                                            alt="logo">
                                             
                                        <h4
                                            style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                            Hello Admin,</h4>
                                             <p>
                                            Customer Name: ${data.name} <br>
                                            Customer Phone:  ${data.phone}.<br>
                                            Customer Email: ${data.email}.<br>
                                            has requested a Realtor to help them in FSA - ${data.arrfsa}, Neighbourhood name - ${data.nieghborhood} <br><br>
                                            Please contact the Agent to confirm they received the email.<br>
                                            Realtor Name:  ${data.agent_name}<br>
                                            Realtor Phone:  ${data.phone_agent}<br>
                                            Realtor Email:  ${data.agent_email}
                                            <br/>  
                                             </p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">At your service,</p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">The My Referral Network Team
                                        </p>
                                    </td>
                                </tr>
                            </table>


</td>

<td valign="top" width="25%">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td bgcolor="#175da1">&nbsp;</td></tr>
<tr> <td bgcolor="#175da1">&nbsp;</td></tr>
<tr><td bgcolor="#175da1">&nbsp;</td> </tr>
<tr><td bgcolor="#175da1">&nbsp;</td></tr>
<tr> <td bgcolor="#175da1">&nbsp;</td></tr>
<tr><td bgcolor="#175da1">&nbsp;</td> </tr>
<tr><td bgcolor="#175da1">&nbsp;</td></tr>
<tr> <td bgcolor="#175da1">&nbsp;</td></tr>
<tr><td bgcolor="#175da1">&nbsp;</td> </tr>
</table>
</td>

</tr>
</table>
</td>
</tr>
<tr>
<td style="padding: 00px 30px 00px 30px;">

</td>

</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;
    try {
        // let res = await transporter.sendMail({ from: from, to: 'laka@mailinator.com', subject: subject, html: html });
        let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
        console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};


// mail.sendMailAdminForRequestAccept = async (data) => {
//     console.log('sendmailAdminforRequwestAccept', data)
//     let subject = "Referral Accepted by Agent";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//         Hello Admin , <br>
//          ${data.agent_name} has accepted the referral of ${data.public_user_name}. <br/><br/>
//         At your Service, <br>
//         The My Referral Network Team 
//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: 'laka@mailinator.com', subject: subject, html: html });
//         // let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
//         console.log(res)
//         return true;
//     } catch (err) {
//         console.log(err)
//         return false;
//     }
// };
mail.sendMailAdminForRequestAccept = async (data) => {
    console.log('sendmailAdminforRequwestAccept', data)
    let subject = "Referral Accepted by Agent";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;">
<tr>
    <td style="padding: 0px 0 30px 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;"
            style="border-collapse: collapse; width: 100%;">
            <tr>
                <td align="left" bgcolor="#175da1"
                    style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td align="left" bgcolor="#175da1"
                                style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                            <td align="left" bgcolor="#175da1"
                                style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td valign="top" width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                </table>
                            </td>
                            <td width="50%">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                            style="margin: 0 auto; width: 100%;margin-top: -160px;">
                            <tr>
                                <td
                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                    <img src="${process.env.image_logo}//rn-logo.png" style="width: 200px;"
                                        alt="logo">
                                    
                                    <h4
                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                        Hello Admin,</h4>
                                    <p>
                                    ${data.agent_name} has accepted the referral of
                                    ${data.public_user_name}.<br>
                                    </p>
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;"> At your Service,</p>
                                    <p style="margin:0px 0px 0px 0px; font-size:16px;"> The My Referral Network Team
                                    </p>
                                </td>
                            </tr>
                            </table>
                            </td>
                            <td valign="top" width="25%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="padding: 00px 30px 00px 30px;">
                </td>
            </tr>
        </table>
    </td>
</tr>
</table>    
</body>
</html>`;
    try {
        // let res = await transporter.sendMail({ from: from, to: 'laka@mailinator.com', subject: subject, html: html });
        let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
        console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};
// mail.sendMailClientForRequest = async (data) => {
//     console.log(data, 'data miil')
//     let subject = "New Request";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//         Hello ${data.name},<br>
//         Your request have been sent successfully.<br>
//         Partner Agent Name: ${data.agent_name}<br>
//         <br/><br/>At Your Service,<br/>The My Referral Network Team 
//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });
//         console.log(res, 'sent Mail')
//         return true;
//     } catch (err) {
//         return false;
//     }
// };
mail.sendMailClientForRequest = async (data) => {
    console.log(data, 'data miil')
    let subject = "Your request has been successfully sent.";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td style="padding: 0px 0 30px 0;">
<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
<tr>
<td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
<td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

</tr>
</table>
</td>

</tr>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td valign="top" width="25%">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td bgcolor="#175da1">&nbsp;</td></tr>
<tr> <td bgcolor="#175da1">&nbsp;</td></tr>
<tr><td bgcolor="#175da1">&nbsp;</td> </tr>
<tr><td bgcolor="#175da1">&nbsp;</td></tr>
<tr> <td bgcolor="#175da1">&nbsp;</td></tr>
<tr><td bgcolor="#175da1">&nbsp;</td> </tr>
<tr><td bgcolor="#175da1">&nbsp;</td></tr>
<tr> <td bgcolor="#175da1">&nbsp;</td></tr>
<tr><td bgcolor="#175da1">&nbsp;</td> </tr>

</table>
</td>
<td width="50%">

<table border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="margin: 0 auto; width: 100%;margin-top: -160px;">
                                <tr>
                                    <td
                                        style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                        <img src="${process.env.image_logo}//rn-logo.png" style="width: 200px;"
                                            alt="logo">
                                     
                                        <h4
                                            style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                            Hello ${data.name},</h4>
                                            <p>
                                        Your request has been sent successfully. Your Partner Agent name is ${data.agent_name}<br>
                                          </p>
                                          <p>
                                        They have been notified of your request. They should reach out to you shortly. If for some reason
they cannot respond we will recommend another great agent to take care of you.
                                          </p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">At Your Service,</p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">The My Referral Network Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
</td>

<td valign="top" width="25%">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td bgcolor="#175da1">&nbsp;</td></tr>
<tr> <td bgcolor="#175da1">&nbsp;</td></tr>
<tr><td bgcolor="#175da1">&nbsp;</td> </tr>
<tr><td bgcolor="#175da1">&nbsp;</td></tr>
<tr> <td bgcolor="#175da1">&nbsp;</td></tr>
<tr><td bgcolor="#175da1">&nbsp;</td> </tr>
<tr><td bgcolor="#175da1">&nbsp;</td></tr>
<tr> <td bgcolor="#175da1">&nbsp;</td></tr>
<tr><td bgcolor="#175da1">&nbsp;</td> </tr>
</table>
</td>

</tr>
</table>
</td>
</tr>
<tr>
<td style="padding: 00px 30px 00px 30px;">

</td>

</tr>
</table>
</td>
</tr>
</table>
</body>

</html>`;
    try {
        // let res = await transporter.sendMail({ from: from, to: 'laka@mailinator.com', subject: subject, html: html });
        let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });
        console.log(res, 'sent Mail')
        return true;
    } catch (err) {
        return false;
    }
};

// mail.sendlinkMail = async (data) => {
//     console.log(data,'send mail data')
//     let subject = "Update Profile";
//     let html = `<!DOCTYPE html>

//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//         Hello ${data.name},<br>
//         Welcome to My Refferal Network. Your account is successfully created by the My Referral Network Team. Click on the button below for Update Your Profile.
//          <br>
//          <div style="text-align: center;margin-top: 15px;">
//          <a style="background-color:#EB7035;border:1px solid #EB7035;border-radius:3px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:16px;line-height:26px;text-align:center;text-decoration:none;width:115px;-webkit-text-size-adjust:none;mso-hide:all;" target="_blank"   href="${process.env.JoinUs + data.id}" >Update Profile</a>
//          </div>

//         <br/><br/>At Your Service,<br/>The My Referral Network Team <br>
//         info@myreferralnetwork.ca <br>
//         +1 250-738-6065
//         <p style="margin: 0px;"><img style="height: 65px;" src="http://www.myreferralnetwork.ca/assets/images/rn-logo.png"></p>
//     </body>
//     </html>`;
//     console.log(data.email)
//     try {
//         let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });
//         console.log(res,'sent Mail')
//         return true;
//     } catch (err) {
//         console.log(err,'errrrrrrrrr')
//         return false;
//     }
// };

// **************************************************************
// mail.sendlinkMail = async (data) => {
//     let subject = "Realtor Information Verification and Updates";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//         Hello ${data.name},<br>
//         Thanks for being part of the My Referral Network, an automated system to help keep up with referral partners across the country. This email is just a regular update email to make sure we have the most recent and up to date information so that your Realtor partners in the system can reach you for sending you Referrals. There is no cost to being available and the opportunity to receive referrals from your partners. We just want to make is easy.
//          <br><br>
//          Follow link to verify and update your information 
//          <div style="text-align: center;margin-top: 15px;">
//          <a style="background-color:#EB7035;border:1px solid #EB7035;border-radius:3px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:16px;line-height:26px;text-align:center;text-decoration:none;width:115px;-webkit-text-size-adjust:none;mso-hide:all;" target="_blank"   href="${process.env.JoinUs + data.id}" >Update Profile</a>
//          </div>
//         <br><br>
//         Thank you,<br>
//         The My Referral Network Team <br>
//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });
//         return true;
//     } catch (err) {
//         console.log(err, 'errrrrrrrrr')
//         return false;
//     }
// };
// *******************************************************************
// mail.sendlinkMail = async (data) => {
//     var loopdata = "";
//     data.FSAs.forEach((element, i) => {
//         loopdata += `FSA Area ${(i + 1)}: ${element} <br>`;
//     });

//     let subject = "Realtor Information Verification and Updates";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//         Hello ${data.name},<br>
//         Thanks for being part of the My Referral Network, an automated system to help keep up with referral partners across the country. This email is just a regular update email to make sure we have the most recent and up to date information so that your Realtor partners in the system can reach you for sending you Referrals. There is no cost to being available and the opportunity to receive referrals from your partners. We just want to make is easy.
//          <br><br>
//          Follow link to verify and update your information 
//          <div style="text-align: center;margin-top: 15px;">
//          <a style="background-color:#EB7035;border:1px solid #EB7035;border-radius:3px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:16px;line-height:26px;text-align:center;text-decoration:none;width:115px;-webkit-text-size-adjust:none;mso-hide:all;" target="_blank"   href="${process.env.JoinUs + data.id}" >Update Profile</a>
//          </div>
//         <br><br>

//         Name: ${data.name}  <br>
//         Phone: ${data.Phone}  <br>
//         Text: ${data.text}  <br>
//         Email: ${data.email}  <br>
//         Brokerage Name: ${data.brokerage_name}  <br>
//         Brokerage Street Address: ${data.brokerageStreetAddress}  <br>
//         Brokerage City: ${data.brokerage_City}  <br>
//         Brokerage Prov: ${data.brokerage_Prov}  <br>
//         Brokerage Postal Code: ${data.brokerage_Postal_Code}  <br>
//         Brokerage Phone: ${data.brokerage_Phone}  <br><br>
//         Photo: <img style="height: 100px;" src="${process.env.image_path}/${data.photo}"> <br><br>
//         Personal Real Estate Website: ${data.website}  <br>
//         Short Bio less than 20 words: ${data.short_bio}  <br>
//         Long Bio more than 20 words to 200 words: ${data.long_bio} <br><br>
//         ${loopdata} <br><br>

//         Thank you,<br>
//         The My Referral Network Team <br>
//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });
//         return true;
//     } catch (err) {
//         console.log(err, 'errrrrrrrrr')
//         return false;
//     }
// };

mail.sendlinkMail_view = async (data) => {
    var loopdata = "";
    data.FSAs.forEach((element, i) => {
        loopdata += `FSA Area ${(i + 1)}: ${element} <br>`;
    });

    let subject = "Realtor Partner verification";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>My Refferal Network</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
            rel="stylesheet">
        <style type="text/css">
            p {
                font-size: 16px;
            }
        </style>
    </head>

    <body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;">
            <tr>
                <td style="padding: 0 0 0 0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;"
                        style="border-collapse: collapse; width: 100%;">
                        <tr>
                            <td align="left" bgcolor="#175da1"
                                style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="left" bgcolor="#175da1"
                                            style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                                        <td align="left" bgcolor="#175da1"
                                            style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

                                    </tr>
                                </table>
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td valign="top" width="25%">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>

                                            </table>
                                        </td>
                                        <td width="50%">

                                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                style="margin: 0 auto; width: 100%;margin-top: -160px;">
                                                <tr>
                                                    <td
                                                        style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                                        <img src="${process.env.image_logo}//rn-logo.png"
                                                            style="width: 200px;" alt="logo">
                                                        <h4
                                                            style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                                            Hello <span>${data.name},</span>


                                                        </h4>

                                                        <p> Thank you for accepting referrals through the My referral
                                                            Network System and
                                                            the Agents who
                                                            have nominated you for being their referral partner. Your
                                                            partner account is
                                                            free. As a partner agent, you can use the public resources on the site as well as the contact information of all the agents to help you with your referrals.
If you find the system helpful feel free to sign up as a client at any time and create your own network map. It only costs $10.00 per year.
                                                            <br><br>
                                                            Follow link to verify and update your information

                                                            <span style="text-align: center;margin-top: 15px;">
                                                                <a style="font-size: 14px;background-color:#175da1;border:1px solid #175da1;border-radius:3px;color:#ffffff;display:inline-block;font-family:sans-serif;line-height:26px;text-align:center;text-decoration:none;width:115px;-webkit-text-size-adjust:none;mso-hide:all;"
                                                                    target="_blank"
                                                                    href="${process.env.VerifyJoinus + data.id}">Verify
                                                                    Account</a>
                                                            </span>
                                                        <p>The more and better information you provide the better the
                                                            chances you will
                                                            get referrals from you
                                                            friends in Real Estate.</p>
                                                        <p>If you find the system helpful feel free to sign up as a
                                                            client at any time. Create your own Network of Referral agents for only $10.00 per year.</p>

                                                        </p><br>
                                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">Thank you,</p>
                                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">The My
                                                            Referral Network Team
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>


                                        </td>

                                        <td valign="top" width="25%">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                            </table>
                                        </td>

                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 00px 30px 00px 30px;">

                            </td>

                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

    </html>
    `;
    try {
        let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });
        return true;
    } catch (err) {
        console.log(err, 'errrrrrrrrr')
        return false;
    }
};

// OLD 

// mail.sendlinkMail_edit = async (data) => {
//     var loopdata = "";
//     data.FSAs.forEach((element, i) => {
//         loopdata += `<p><b> FSA Area ${(i + 1)}:</b> ${element} <span style="color:red;"> *</span> </p>`;
//     });

//     let subject = "Realtor Information Verification and Updates";
//     let html = `<!DOCTYPE html
//     PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
// <html xmlns="http://www.w3.org/1999/xhtml">

// <head>
//     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
//     <title>My Refferal Network</title>
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <link rel="preconnect" href="https://fonts.googleapis.com">
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//     <link
//         href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
//         rel="stylesheet">
//     <style type="text/css">
//         p {
//             font-size: 16px;
//         }
//     </style>
// </head>

// <body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
// <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
// <tr>
//     <td style="padding: 0 0 0 0;">
//         <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
//             <tr>
//                 <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
//                 <table border="0" cellpadding="0" cellspacing="0" width="100%">
//                 <tr>
//                 <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
//                 <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

//                 </tr>
//                 </table>
//                 </td>
             
//             </tr>
//             <tr>
//                 <td>
//                     <table border="0" cellpadding="0" cellspacing="0" width="100%">
//                         <tr>
//                             <td valign="top"  width="25%">
//                                 <table border="0" cellpadding="0" cellspacing="0" width="100%">
//                                     <tr><td bgcolor="#175da1">&nbsp;</td></tr>
//                                     <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
//                                     <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
//                                     <tr><td bgcolor="#175da1">&nbsp;</td></tr>
//                                     <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
//                                     <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
//                                     <tr><td bgcolor="#175da1">&nbsp;</td></tr>
//                                     <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
//                                     <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                          
//                                 </table>
//                             </td>
//                             <td width="50%">
                            
//                             <table border="0" cellpadding="0" cellspacing="0" width="100%"
//                             style="margin: 0 auto; width: 100%;margin-top: -160px;">
//                             <tr>
//                                 <td
//                                     style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
//                                     <img src="${process.env.image_logo}//rn-logo.png" style="width: 200px;"
//                                         alt="logo">
//                                     <!--     <h2 style="color:#001328 ">Email Confirmation</h2> -->
//                                     <h4
//                                         style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
//                                         Hello <span>${data.name},</span>
//                                     </h4>
//                                     <p>
//                                         Thanks for being part of the My Referral Network, an automated system to
//                                         help keep up with referral partners across the country. This email is just a regular
//                                         update email to make sure we have the most recent and up to date information so
//                                         that your Realtor partners in the system can reach you for sending you
//                                         Referrals. There is no cost to being available and the opportunity to
//                                         receive referrals from your partners. We just want to make it easy.
//                                         <br><br>
//                                         Your Current information.
//                                         <br><br>
//                                         Follow link to verify and update your information <span
//                                             style="text-align: center;margin-top: 15px;">
//                                             <a style="font-size: 14px;background-color:#175da1;border:1px solid #175da1;border-radius:3px;color:#ffffff;display:inline-block;font-family:sans-serif;line-height:26px;text-align:center;text-decoration:none;width:115px;-webkit-text-size-adjust:none;mso-hide:all;"
//                                                 target="_blank" href="${process.env.JoinUs + data.id}">Update
//                                                 Profile</a>
//                                         </span>
//                                         <br>
//                                     <p style="font-size:14px">Please verify or update all the information below. All
//                                         items below marked with an <span style="color:red;"> *</span> are required
//                                     </p>

//                                     <div style="font-size:14px;">
//                                         <p> <b>Name:</b> ${data.name} <span style="color:red;"> *</span> </p>
//                                         <p> <b>Phone:</b> ${data.Phone} <span style="color:red;"> *</span></p>
//                                         <p> <b>Text: </b> ${data.text} <span style="color:red;"> *</span></p>
//                                         <p> <b>Email: </b>${data.email} <span style="color:red;"> *</span></p>
//                                         <p> <b> Brokerage Name:</b> ${data.brokerage_name} <span style="color:red;"> *</span></p>
//                                         <p> <b>Brokerage Street Address:</b> ${data.brokerageStreetAddress} <span style="color:red;"> *</span> </p>
//                                         <p><b>Brokerage City:</b> ${data.brokerage_City} <span style="color:red;"> *</span></p>
//                                         <p> <b>Brokerage Prov:</b> ${data.brokerage_Prov} <span style="color:red;"> *</span></p>
//                                         <p><b>Brokerage Postal Code: </b> ${data.brokerage_Postal_Code} <span style="color:red;"> *</span></p>
//                                         <p><b>Brokerage Phone:</b> ${data.brokerage_Phone}<span style="color:red;"> *</span> </p>
//                                         <div>
//                                             <div style="float: left;padding-top: 10px;"> <b>Photo:</b> </div>
//                                             <div style="float: left;"><img style="height: 50px; margin-left: 20px;"
//                                                     src="${process.env.image_path}/${data.photo}"> <span style="color:red;"> *</span> </div>
//                                             <div style="float: left; margin-top: 14px; margin-left: 20px;"><span
//                                                     style="text-align: center;margin-top: 15px;">
//                                                     <a style="font-size: 14px;background-color:#175da1;border:1px solid #175da1;border-radius:3px;color:#ffffff;display:inline-block;font-family:sans-serif;line-height:26px;text-align:center;text-decoration:none;width:115px;-webkit-text-size-adjust:none;mso-hide:all;"
//                                                         target="_blank"
//                                                         href="${process.env.JoinUs + data.id}">Update
//                                                         Profile</a>
//                                                 </span></div>
//                                         </div>
//                                         <p style="clear:both; padding-top:10px;"><b>Personal Real Estate
//                                                 Website:</b> ${data.website}<span style="color:red;"> *</span> </p>
//                                         <p> <b>Short Bio less than 20 words:</b> ${data.short_bio} <span style="color:red;"> *</span></p>
//                                         <p><b>Long Bio more than 20 words to 200 words:</b> ${data.long_bio}</p>
//                                         ${loopdata}
//                                     </div>
//                                         </p>
//                                     <br>
//                                     <p style="margin:0px 0px 0px 0px; font-size:16px;">Thank you,</p>
//                                     <p style="margin:0px 0px 0px 0px; font-size:16px;">The My Referral Network Team
//                                     </p>
//                                 </td>
//                             </tr>
//                         </table>
//                             </td>
                            
//                             <td valign="top" width="25%">
//                                 <table border="0" cellpadding="0" cellspacing="0" width="100%">
//                                 <tr><td bgcolor="#175da1">&nbsp;</td></tr>
//                                 <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
//                                 <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
//                                 <tr><td bgcolor="#175da1">&nbsp;</td></tr>
//                                 <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
//                                 <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
//                                 <tr><td bgcolor="#175da1">&nbsp;</td></tr>
//                                 <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
//                                 <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
//                                 </table>
//                             </td>

//                         </tr>
//                     </table>
//                 </td>
//             </tr>
//             <tr>
//                 <td  style="padding: 00px 30px 00px 30px;">
                    
//                 </td>
                
//             </tr>
//         </table>
//     </td>
// </tr>
// </table>

// </body>

// </html>
//     `;
//     try {
//         let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });
//         return true;
//     } catch (err) {
//         console.log(err, 'errrrrrrrrr')
//         return false;
//     }
// };


// mail.sendMailToAgentIfExists = async (data) => {
//     console.log(data, 'send MailTOAGENTIFEXITS')
//     let subject = "You have been added to My Referral Network by your friend in Real Estate";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//     Hello ${data.agent_name},<br/>
//     I have added you to my referral network. I have joined this automated system to help me stay in touch and find my referral partners quickly. 
//     If you want to be my referral partner in the following areas just click below.  Just click on or accept at bottom to take all areas. 
//     If you have any questions about the link feel free to call me at ${data.agent_phone} or email at ${data.agent_email}
//   <br><br>

//      ${data.fsa}  <br><br>

//      <a target="_blank"  href="${process.env.JoinUs}${data.agent_id}">Join us </a> <br><br>

//      Thanks for your help with my referrals, <br><br>
//      ${data.client_name} <br>
//      ${data.agent_brokerageName} <br>
//      ${data.agent_phone} <br>
//      ${data.agent_email} <br>

//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: [data.new_agent_email], subject: subject, html: html });
//         console.log('resmail', res);
//         return true;
//     } catch (err) {
//         console.log('errmail', err);
//         return false;
//     }
// };

// NEW 
mail.sendlinkMail_edit = async (data) => {
    // console.log('sendlinkMail_edit-------->',data);
    
    var loopdata = "";
    data.FSAs.forEach((element, i) => {
        loopdata += `<p><b> FSA Area ${(i + 1)}:</b> ${element} <span style="color:red;"> *</span> </p>`;
    });

    let subject = "Realtor Information Verification and Updates";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;">
        <tr>
            <td style="padding: 0 0 0 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;"
                    style="border-collapse: collapse; width: 100%;">
                    <tr>
                        <td align="left" bgcolor="#175da1"
                            style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="left" bgcolor="#175da1"
                                        style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                                    <td align="left" bgcolor="#175da1"
                                        style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

                                </tr>
                            </table>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td valign="top" width="25%">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>

                                        </table>
                                    </td>
                                    <td width="50%">

                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                            style="margin: 0 auto; width: 100%;margin-top: -160px;">
                                            <tr>
                                                <td
                                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                                    <img src="${process.env.image_logo}//rn-logo.png"
                                                        style="width: 200px;" alt="logo">
                                                    <!--     <h2 style="color:#001328 ">Email Confirmation</h2> -->
                                                    <h4
                                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                                        Hello <span>${data.name},</span>
                                                    </h4>
                                                    <p>
                                                        Thank you being part of the My Referral Network, an automated
                                                        system to
                                                        help keep up with referral partners across the country. This
                                                        email is just a regular
                                                        update email to make sure we have the most recent and up to date
                                                        information so
                                                        that your Realtor partners in the system can reach you for
                                                        sending you
                                                        Referrals. There is no cost to being available and the
                                                        opportunity to
                                                        receive referrals from your partners. We just want to make it
                                                        easy.
                                                        <br><br>
                                                        Follow link to verify and update your information <span
                                                            style="text-align: center;margin-top: 15px;">
                                                            <a style="font-size: 14px;background-color:#175da1;border:1px solid #175da1;border-radius:3px;color:#ffffff;display:inline-block;font-family:sans-serif;line-height:26px;text-align:center;text-decoration:none;width:115px;-webkit-text-size-adjust:none;mso-hide:all;"
                                                                target="_blank"
                                                                href="${process.env.JoinUs + data.id}">Update
                                                                Profile</a>
                                                        </span>
                                                        <br>
                                                        <br>
                                                    </p>
                                                    <p style="margin:0px 0px 0px 0px; font-size:16px;">Thank you,</p>
                                                    <p style="margin:0px 0px 0px 0px; font-size:16px;">The My Referral
                                                        Network Team
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                    <td valign="top" width="25%">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </td>

                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 00px 30px 00px 30px;">

                        </td>

                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>

</html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });
        return true;
    } catch (err) {
        console.log(err, 'errrrrrrrrr')
        return false;
    }
};

mail.sendMailToAgentIfExists = async (data) => {
    console.log(data, 'send MailTOAGENTIFEXITS')
    let subject = "You have been added to My Referral Network by your friend in Real Estate";
    let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet">
    <style type="text/css">
        p{
            font-size:16px;
        }
    </style>
    </head>
    <body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
    <tr>
        <td style="padding: 0 0 0 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
    
                    </tr>
                    </table>
                    </td>
                 
                </tr>
                <tr>
                    <td>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td valign="top"  width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                              
                                    </table>
                                </td>
                                <td width="50%">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 auto; width: 100%;margin-top: -160px;">
                                    <tr>
                                        <td style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                            <img src="${process.env.image_logo}//rn-logo.png"  style="width: 200px;" alt="logo" >
                                            <h4 style="font-weight:normal;margin-top:20px; margin-bottom:0px;  padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">Hello <span>${data.agent_name},</span>
                                            </h4>
                                            <p>
                                            I have added you to my referral network. I have joined this automated system to help me stay in touch and find my referral partners quickly. 
                                            If you want to be my referral partner in the following areas just click below.  Just click on or accept at bottom to take all areas. 
                                            If you have any questions about the link feel free to call me at ${data.agent_phone} or email at ${data.agent_email} 
                                            </p><br>
                                            <p style="margin:0px 0px 0px 0px; font-size:16px;">${data.fsa}</p>
                                            <p style="margin:0px 0px 0px 0px; font-size:16px;"><a target="_blank"  href="${process.env.JoinUs}${data.agent_id}">Join us </a> <br></p>

                                            <p style="margin:0px 0px 0px 0px; font-size:16px;"> Thanks for your help with my referrals,</p>
                                            <p>${data.client_name} <br>
                                            ${data.agent_brokerageName} <br>
                                            ${data.agent_phone} <br>
                                            ${data.agent_email} </p>

                                        </td>
                                    </tr>
                                </table>
    
                                    
                                </td>
                                
                                <td valign="top" width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    </table>
                                </td>
    
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td  style="padding: 00px 30px 00px 30px;">
                        
                    </td>
                    
                </tr>
            </table>
        </td>
    </tr>
    </table>
    
    </body>
    </html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: [data.new_agent_email], subject: subject, html: html });
        console.log('resmail', res);
        return true;
    } catch (err) {
        console.log('errmail', err);
        return false;
    }
};

// mail.sendMailToAgentIfNotExists = async (data) => {
//     console.log(data, 'send MailTOAGENTIFnotEXITS')
//     let subject = "I have added you to my referral network automated system";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//     Hello ${data.agent_name},<br/>
//     I have added you to my referral network. I have joined this automated system to help me stay in touch and find my referral partners quickly. 
//     If you want to be my referral partner in the following areas just click below.  Just click on or accept at bottom to take all areas. 
//     If you have any questions about the link feel free to call me at ${data.agent_phone} or email at ${data.agent_email}
//   <br><br>

//      ${data.fsa} <br>
//      <a target="_blank"  href="${process.env.JoinUs}${data.agent_id}">Join us </a><br/><br>

//      Thanks for your help with my referrals, <br>
//      ${data.client_name} <br>
//      ${data.agent_brokerageName} <br>
//      ${data.agent_phone} <br>
//      ${data.agent_email} <br>

//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: [data.new_agent_email], subject: subject, html: html });
//         console.log('resmail', res);
//         return true;
//     } catch (err) {
//         console.log('errmail', err);
//         return false;
//     }
// };

mail.sendMailToAgentIfNotExists = async (data) => {
    console.log(data, 'send MailTOAGENTIFnotEXITS')
    let subject = "I have added you to my referral network automated system";
    let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet">
    <style type="text/css">
        p{
            font-size:16px;
        }
    </style>
    </head>
    <body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
    <tr>
        <td style="padding: 0 0 0 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
    
                    </tr>
                    </table>
                    </td>
                 
                </tr>
                <tr>
                    <td>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td valign="top"  width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                              
                                    </table>
                                </td>
                                <td width="50%">
                                
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 auto; width: 100%;margin-top: -160px;">
                                <tr>
                                    <td style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                        <img src="${process.env.image_logo}//rn-logo.png"  style="width: 200px;" alt="logo" >
                                        <h4 style="font-weight:normal;margin-top:20px; margin-bottom:0px;  padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">Hello <span>${data.agent_name},</span>
                                        </h4>
                                        <p>I have added you to my referral network. I have joined this automated system to help me stay in touch and find my referral partners quickly. </p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">If you want to be my referral partner in the following areas just click below.  Just click on or accept at bottom to take all areas.</p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">If you have any questions about the link, feel free to call me at ${data.agent_phone} or email at ${data.agent_email}</p> <br>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">Area I have chosen for you is ${data.fsa} </p> <br>
                                        <a target="_blank" href="${process.env.JoinUs}${data.agent_id}">Join us </a><br/>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">This is a free system to use for passing on referrals. </p> <br>

                                     <p> Thanks for your help with my referrals, </p>
                                     <p> ${data.client_name}</p>
                                     <p> ${data.agent_brokerageName}</p>
                                     <p> ${data.agent_phone}</p>
                                     <p> ${data.agent_email}</p>
                                    </td>
                                </tr>
                            </table>
                                    
                                </td>
                                
                                <td valign="top" width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    </table>
                                </td>
    
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td  style="padding: 00px 30px 00px 30px;">
                        
                    </td>
                    
                </tr>
            </table>
        </td>
    </tr>
    </table>
    
    </body>
    </html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: [data.new_agent_email], subject: subject, html: html });
        console.log('resmail', res);
        return true;
    } catch (err) {
        console.log('errmail', err);
        return false;
    }
};


mail.adminMakeRealtor = async (data) => {
    let agent_fullName = data.first_name + ' ' + data.last_name

    let subject = "You have been added to My Referral Network by Stewart Peddemors";
    let html = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
    Hello ${agent_fullName}, <br>
    I have added you to my referral network. I have joined this automated system to help me stay in touch and find my referral partner quickly. 
    If you want to be my referral partner in the following areas just click below.  Just click on or accept at bottom to take all areas. 
    If you have any questions about the link feel free to call me at 604-329-6759 or email at stewart@peddemors.ca <br><br>

    ${data.fsa} <br><br> 

    At your Service, <br>
    Stewart Peddemors PREC <br>
    RE/MAX Colonial Pacific Realty Ltd. <br>
    604-329-6759 <br>
    stewart@peddemors.ca
    
    </body>
    </html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: [data.email], subject: subject, html: html });
        console.log('resmail', res);
        return true;
    } catch (err) {
        console.log('errmail', err);
        return false;
    }
};

mail.partnerAcceptedClientRequestMailtoClient = async (data) => {
    console.log(data, 'data miil')
    let subject = "Your Realtor Partner has accepted your request.";
    let html = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
    Hello ___Client Realtor____, <br>
    Your partner agent, ____ Partner agent name____ has verified their information and their information has been updated. <br><br>

    At your service, <br>
    The My Referral Network Team
    </body>
    </html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });
        console.log(res, 'sent Mail')
        return true;
    } catch (err) {
        return false;
    }
};
mail.Clientrequestacceptedmailtoadmin = async (data) => { // mail no 16 extra
    console.log(data, 'data miil')
    let subject = "Your Realtor Partner has accepted your request.";
    let html = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
    Hello Admin,<br>       
    ___Realtor Client has Successfully added ___ Realtor Partner to the System____ <br><br>
    Realtor Partner phone : ___ insert new partner phone____ <br>
    Realtor partner email: ____ insert new Realtor partner email _____  <br><br>

    At Your Service,<br/>
    The My Referral Network Team 
    </body>
    </html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });
        console.log(res, 'sent Mail')
        return true;
    } catch (err) {
        return false;
    }
};

mail.realtorQuitsMailToAdmin = async (data) => {
    console.log(data, 'data miil')
    let subject = "Agent Opt out or Quit.";
    let html = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
    Hello Admin,<br>       
    ____Agent Name____ has quit or opted out of the system. <br><br>
    Agent Phone: __insert agent phone here____
    Agent Email: ___insert agent email here____  <br><br>

    At Your Service,<br/>
    The My Referral Network Team 
    </body>
    </html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });
        console.log(res, 'sent Mail')
        return true;
    } catch (err) {
        return false;
    }
};


// mail.realtorOptOutMailToAdmin = async (data) => {
//     let subject = "URGENT ACTION NEEDED: Client with no referral agent.";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//     Hello Admin,<br>       
//     There is a client ${data.name} with no referral agent. Phone number of the client is ${data.phone} and email is ${data.email}. Need to find an agent ASAP.  <br><br>

//     Admin, <br>
//     My Referral Network 
//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail, process.env.email_dev], subject: subject, html: html });
//         return true;
//     } catch (err) {
//         console.log(err)
//         return false;
//     }
// };

mail.realtorOptOutMailToAdmin = async (data) => {
    let subject = "URGENT ACTION NEEDED: Client with no referral agent.";
    let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet">
    <style type="text/css">
        p{
            font-size:16px;
        }
    </style>
    </head>
    <body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
    <tr>
        <td style="padding: 0 0 0 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
    
                    </tr>
                    </table>
                    </td>
                 
                </tr>
                <tr>
                    <td>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td valign="top"  width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                              
                                    </table>
                                </td>
                                <td width="50%">
                                
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 auto; width: 100%;margin-top: -160px;">
                                <tr>
                                    <td style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                        <img src="${process.env.image_logo}//rn-logo.png"  style="width: 200px;" alt="logo" >
                                        <h4 style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">Hello <span>Admin,</span>
                                        </h4>
                                        <p>
                                        There is a client ${data.name} with no referral agent. Phone number of the client is ${data.phone} and email is ${data.email}. Need to find an agent ASAP.
                                        </p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">Admin,</p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">My Referral Network</p>
                                    </td>
                                </tr>
                            </table>
                                    
                                </td>
                                
                                <td valign="top" width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    </table>
                                </td>
    
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td  style="padding: 00px 30px 00px 30px;">
                        
                    </td>
                    
                </tr>
            </table>
        </td>
    </tr>
    </table>
    
    </body>
    </html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};

mail.AgentOptOutSystemGeneratedMailToAdmin = async (data) => {
    console.log('AgentOptOutSystemGeneratedMailToAdmin--Email')
    let subject = "Agent had opted out. Admin Follow up with Agent is needed.";
    let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet">
    <style type="text/css">
        p{
            font-size:16px;
        }
    </style>
    </head>
    <body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
    <tr>
        <td style="padding: 0 0 0 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
    
                    </tr>
                    </table>
                    </td>
                 
                </tr>
                <tr>
                    <td>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td valign="top"  width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                              
                                    </table>
                                </td>
                                <td width="50%">
                                
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 auto; width: 100%;margin-top: -160px;">
                                <tr>
                                    <td style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                        <img src="${process.env.image_logo}//rn-logo.png"  style="width: 200px;" alt="logo" >
                                        <h4 style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">Hello <span>Admin,</span></br>
                                        </h4>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">
                                        ${data.name} has quit or opted out of the system.
                                        </p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">Agent Phone: ${data.phone}</p>
                                        <p style="margin:0px 0px 10px 0px; font-size:16px;">Agent Email: ${data.email}</p></br>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">At your Service,</p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">The My Referral Network Team</p>
                                    </td>
                                </tr>
                            </table>
                                    
                                </td>
                                
                                <td valign="top" width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    </table>
                                </td>
    
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td  style="padding: 00px 30px 00px 30px;">
                        
                    </td>
                    
                </tr>
            </table>
        </td>
    </tr>
    </table>
    
    </body>
    </html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
        console.log(res, 'res000000')
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};



// *********************************New mail create vishal 27/07/2022****************************************
// mail.VerifiedAccountMail = async (data) => {
//     let subject = "Verified Account.";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//     Hello ${data.name},<br>   
//     Your information has been updated and your account has been successfully verified. <br>
//     You can Sign in with this link <a target="_blank" href="${process.env.RealtorSignIn}">${process.env.RealtorSignIn}</a> <br><br>

//     At your service, <br>
//     The My Referral Network Team

//     </body>
//     </html>`
//     try {
//         let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });
//         return true;
//     } catch (err) {
//         return false;
//     }
// }

mail.VerifiedAccountMail = async (data) => {
    let subject = "Verified Account.";
    let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet">
    <style type="text/css">
        p{
            font-size:16px;
        }
    </style>
    </head>
    <body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
    <tr>
        <td style="padding: 0 0 0 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
    
                    </tr>
                    </table>
                    </td>
                 
                </tr>
                <tr>
                    <td>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td valign="top"  width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                              
                                    </table>
                                </td>
                                <td width="50%">
                                
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 auto; width: 100%;margin-top: -160px;">
                                <tr>
                                    <td style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                        <img src="${process.env.image_logo}//rn-logo.png"  style="width: 200px;" alt="logo" >
                                        <h4 style="font-weight:normal;margin-top:20px; margin-bottom:0px;  padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">Hello <span>${data.name},</span></h4>
                                        <p>Your information has been updated and your account has been successfully verified.</p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">You can Sign In with this link <a target="_blank" href="${process.env.RealtorSignIn}">${process.env.RealtorSignIn}</a> </p><br>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">At your service,</p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">The My Referral Network Team.</p>
                                    </td>
                                </tr>
                            </table>
                                    
                                </td>
                                
                                <td valign="top" width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    </table>
                                </td>
    
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td  style="padding: 00px 30px 00px 30px;">
                        
                    </td>
                    
                </tr>
            </table>
        </td>
    </tr>
    </table>
    
    </body>
    </html>`
    try {
        let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });
        return true;
    } catch (err) {
        return false;
    }
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



mail.sendMailToAgentIfNotexist2 = async (data) => {
    let subject = "I have added you to my referral network automated system";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;">
        <tr>
            <td style="padding: 0 0 0 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;"
                    style="border-collapse: collapse; width: 100%;">
                    <tr>
                        <td align="left" bgcolor="#175da1"
                            style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="left" bgcolor="#175da1"
                                        style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                                    <td align="left" bgcolor="#175da1"
                                        style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

                                </tr>
                            </table>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td valign="top" width="25%">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>

                                        </table>
                                    </td>
                                    <td width="50%">

                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:0 auto; width: 100%; padding: 10px;
                            background: #ffffff;">
                                            <tr>
                                                <td
                                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                                    <img src="${process.env.image_logo}//rn-logo.png"
                                                        style="width: 200px;" alt="logo">
                                                    <!--     <h2 style="color:#001328 ">Email Confirmation</h2> -->
                                                    <h4
                                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                                        Hello <span>${data.agent_name},</span>
                                                    </h4>
                                                    <p style="color: #001328;">I have added you to my referral network.
                                                        I have
                                                        joined this automated system to help me stay in touch and find
                                                        my referral partners quickly.</p>
                                                    <p>
                                                        If you want to be my referral partner in the following areas
                                                        just click below link.
                                                    </p>
                                                    <p>

                                                        If you have any questions about the link feel free to call me at
                                                        ${process.env.adminPhone} or email at ${process.env.adminEmail}
                                                    </p>

                                                    <br>
                                                    <a target="_blank"
                                                        href="${process.env.JoinUs + data.agent_id}">Join Us</a><br> 
                                                    <!-- </p>                                         -->
                                                    <p style="margin:0px 0px 0px 0px; font-size:16px;color: #001328;">At
                                                        your service,</p>
                                                    <p style="margin:0px 0px 0px 0px; font-size:16px;color: #001328;">
                                                        The My Referral Network Team
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                    <td valign="top" width="25%">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </td>

                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 00px 30px 00px 30px;">

                        </td>

                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>

</html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: data.agent_email, subject: subject, html: html });
        // console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};



mail.sendMailToAgentforReferral = async (data) => {
    let subject = "New Referral for you from My Referral Network";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;">
        <tr>
            <td style="padding: 0 0 0 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;"
                    style="border-collapse: collapse; width: 100%;">
                    <tr>
                        <td align="left" bgcolor="#175da1"
                            style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="left" bgcolor="#175da1"
                                        style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                                    <td align="left" bgcolor="#175da1"
                                        style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

                                </tr>
                            </table>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td valign="top" width="25%">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>

                                        </table>
                                    </td>
                                    <td width="50%">

                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:0 auto; width: 100%; padding: 10px;
                            background: #ffffff;">
                                            <tr>
                                                <td
                                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                                    <img src="${process.env.image_logo}//rn-logo.png"
                                                        style="width: 200px;" alt="logo">
                                                    <h4
                                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                                        Hello <span>${data.agent_name},</span>
                                                    </h4>
                                                    <p style="color: #001328;">I have a client who is looking for help
                                                        in your area. Specifically, ${data.fsa_naboure}, FSA Area ${data.fsa_code}. If you wish to receive
                                                        this referral for a 25% referral fee then just click on the link
                                                        and their information will be sent to you right away. If you
                                                        don’t want to click but want the referral, call me.</p>

                                                    <p>
                                                        <a href="${process.env.requetsPage + data.req_id + '/1'}"
                                                            target="_blank">Accept
                                                        </a> &nbsp; <a
                                                            href="${process.env.requetsPage + data.req_id + '/2'}"
                                                            target="_blank">Decline </a>
                                                    </p>

                                                    <br>
                                                    <p style="margin:0px 0px 0px 0px; font-size:16px;color: #001328;">At
                                                        your service,</p>
                                                    <p style="margin:0px 0px 0px 0px; font-size:16px;color: #001328;">
                                                    Stewart Peddemors PREC
                                                    </p>
                                                    <p style="margin:0px 0px 0px 0px; font-size:16px;color: #001328;">
                                                    RE/MAX Colonial Pacific Realty Ltd.
                                                    </p>
                                                    <p style="margin:0px 0px 0px 0px; font-size:16px;color: #001328;">
                                                       ${process.env.Stewart_phone}
                                                    </p>
                                                    <p style="margin:0px 0px 0px 0px; font-size:16px;color: #001328;">
                                                       ${process.env.Stewart_email}
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                    <td valign="top" width="25%">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </td>

                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 00px 30px 00px 30px;">

                        </td>

                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>

</html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: data.agent_email, subject: subject, html: html });
        // console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};



mail.sendMailToUserforReferral = async (data) => {
    let subject = "Your Realtor contact update for your neighborhood choice.";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;">
        <tr>
            <td style="padding: 0 0 0 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;"
                    style="border-collapse: collapse; width: 100%;">
                    <tr>
                        <td align="left" bgcolor="#175da1"
                            style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="left" bgcolor="#175da1"
                                        style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                                    <td align="left" bgcolor="#175da1"
                                        style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

                                </tr>
                            </table>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td valign="top" width="25%">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>

                                        </table>
                                    </td>
                                    <td width="50%">

                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:0 auto; width: 100%; padding: 10px;
                            background: #ffffff;">
                                            <tr>
                                                <td
                                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                                    <img src="${process.env.image_logo}//rn-logo.png"
                                                        style="width: 200px;" alt="logo">
                                                    <h4
                                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                                        Hello <span>${data.user_name},</span>
                                                    </h4>
                                                    <p style="color: #001328; margin:0px 0px 0px 0px;">I am sorry but ${data.old_agent_name} is busy and could not assist you. We want to make sure that 
                                                    you receive the best and most prompt help possible. We have recommended ${data.new_agent_name} to help you out. They will be in contact with you very soon.</p>
                                                    <br>
                                                    <p style="color: #001328; margin:0px 0px 0px 0px;">Here is their Information.</p>
                                                    <br>
                                                    <p style="color: #001328; margin:0px 0px 0px 0px;">
                                                    Name of Realtor: ${data.new_agent_name} <br>
                                                    Phone Number of Realtor: ${data.old_agent_mobile} <br>
                                                    Email of Realtor: ${data.old_agent_email} <br>
                                                    </p>
                                                    <br>
                                                    <p style="margin:0px 0px 0px 0px; font-size:16px;color: #001328;">At
                                                        your service,</p>
                                                    <p style="margin:0px 0px 0px 0px; font-size:16px;color: #001328;">
                                                        The My Referral Network Team
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                    <td valign="top" width="25%">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </td>

                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 00px 30px 00px 30px;">

                        </td>

                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>

</html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: data.user_email, subject: subject, html: html });
        console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};




mail.sendMailToAgentForAuthorization = async (data) => {
    var loopdata = "";
    data.FSAs.forEach((element, i) => {
        loopdata += `<p><b> FSA Area ${(i + 1)}:</b> ${element}</p>`;
    });

    let subject = "Just verifying your information is correct and has not changed and keeping you active.";
    let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet">
    <style type="text/css">
        p{
            font-size:16px;
        }
    </style>
    </head>
    <body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
    <tr>
        <td style="padding: 0 0 0 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
    
                    </tr>
                    </table>
                    </td>
                 
                </tr>
                <tr>
                    <td>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td valign="top"  width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                              
                                    </table>
                                </td>
                                <td width="50%">
                                
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 auto; width: 100%;margin-top: -160px;">
                                <tr>
                                    <td style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                        <img src="${process.env.image_logo}//rn-logo.png"  style="width: 200px;" alt="logo" >
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">Thank you ${data.name} for being part of my referral network. Can you confirm your information so that agents who want to reach out to you for a referral can get in touch with you. There is no cost to this service. We are just here to help you keep connected to your agent friends. If you are no longer a Real Estate Agent, you can click on delete profile or opt out of receiving referrals.</p>
                                        <p style="font-size:14px">Please verify or update all the information below. All items below marked with an <span style="color:red;"> *</span> are required</p>
                                        <div style="font-size:14px;">
                                        <p> <b>Name:</b> ${data.name} <span style="color:red;"> *</span> </p>
                                        <p> <b>Phone:</b> ${data.Phone} <span style="color:red;"> *</span></p>
                                        <p> <b>Text: </b> ${data.text} <span style="color:red;"> *</span></p>
                                        <p> <b>Email: </b>${data.email} <span style="color:red;"> *</span></p>
                                        <p> <b>Brokerage Name:</b> ${data.brokerage_name} <span style="color:red;"> *</span></p>
                                        <p> <b>Brokerage Street Address:</b> ${data.brokerageStreetAddress} <span style="color:red;"> *</span> </p>
                                        <p><b>Brokerage City:</b> ${data.brokerage_City} <span style="color:red;"> *</span></p>
                                        <p> <b>Brokerage Prov:</b> ${data.brokerage_Prov} <span style="color:red;"> *</span></p>
                                        <p><b>Brokerage Postal Code: </b> ${data.brokerage_Postal_Code} <span style="color:red;"> *</span></p>
                                        <p><b>Brokerage Phone:</b> ${data.brokerage_Phone}<span style="color:red;"> *</span> </p>
                                        <div>
                                            <div style="float: left;padding-top: 10px;"> <b>Photo:</b> </div>
                                            <div style="float: left;"><img style="height: 50px; margin-left: 20px;"
                                                    src="${process.env.image_path}/${data.photo}"> <span style="color:red;"> *</span> </div>
                                            <div style="float: left; margin-top: 14px; margin-left: 20px;"><span
                                                    style="text-align: center;margin-top: 15px;">
                                                    <a style="font-size: 14px;background-color:#175da1;border:1px solid #175da1;border-radius:3px;color:#ffffff;display:inline-block;font-family:sans-serif;line-height:26px;text-align:center;text-decoration:none;width:115px;-webkit-text-size-adjust:none;mso-hide:all;"
                                                        target="_blank"
                                                        href="${process.env.VerifyJoinus + data.id}">Update
                                                        Profile</a>
                                                </span></div>
                                        </div>
                                        <p style="clear:both; padding-top:10px;"><b>Personal Real Estate
                                                Website:</b> ${data.website}<span style="color:red;"> *</span> </p>
                                        <p> <b>Short Bio less than 20 words:</b> ${data.short_bio} <span style="color:red;"> *</span></p>
                                        <p><b>Long Bio more than 20 words to 200 words:</b> ${data.long_bio}</p>
                                        <p>
                                        <a style="cursor: pointer; padding: 5px 12px 6px 12px !important; background-color: #198754; color: #ffffff; font-weight: 300; border: 2px solid #198754; font-size: 12px; letter-spacing: normal; outline: 0; text-decoration: none; border-radius: 4px;" href="${process.env.VerifyJoinus + data.id}">VERIFY</a>
                                        <a style="cursor: pointer; margin-left: 6px; margin-top: 10px; padding: 5px 12px 6px 12px !important; background-color: #004E98; color: #ffffff; font-weight: 300; border: 2px solid #004E98; font-size: 12px; letter-spacing: normal; outline: 0; text-decoration: none; border-radius: 4px;" href="${process.env.VerifyJoinus + data.id}">UPDATE AND SAVE</a> <br>
                                        <a style="cursor: pointer; margin-top: 10px; padding: 5px 12px 6px 12px !important; background-color: #0dcaf0; color: #ffffff; font-weight: 300; border: 2px solid #0dcaf0; font-size: 12px; letter-spacing: normal; outline: 0; text-decoration: none; border-radius: 4px;" href="${process.env.VerifyJoinus + data.id}">Opt Out I DON’T WANT REFERRALS</a><br>
                                        <a style="cursor: pointer; margin-top: 10px; padding: 5px 12px 6px 12px !important; background-color: #dc3545; color: #ffffff; font-weight: 300; border: 2px solid #dc3545; font-size: 12px; letter-spacing: normal; outline: 0; text-decoration: none; border-radius: 4px;" href="${process.env.VerifyJoinus + data.id}">DELETE PROFILE I AM NO LONGER AN AGENT</a>
                                        </p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">Enter all the FSA areas ( First three letters of postal codes) you serve. Enter up to 40 FSA areas. At least one area needs to be chosen.</p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">When FSA entered the neighborhood automatically appears</p>
                                        ${loopdata}
                                        <p>
                                            <a style="cursor: pointer; padding: 5px 12px 6px 12px !important; background-color: #198754; color: #ffffff; font-weight: 300; border: 2px solid #198754; font-size: 12px; letter-spacing: normal; outline: 0; text-decoration: none; border-radius: 4px;" href="${process.env.VerifyJoinus + data.id}">VERIFY</a> 
                                            <a style="cursor: pointer; margin-left: 6px; margin-top: 10px; padding: 5px 12px 6px 12px !important; background-color: #004E98; color: #ffffff; font-weight: 300; border: 2px solid #004E98; font-size: 12px; letter-spacing: normal; outline: 0; text-decoration: none; border-radius: 4px;" href="${process.env.VerifyJoinus + data.id}">UPDATE AND SAVE</a> <br>
                                            <a style="cursor: pointer; margin-top: 10px; padding: 5px 12px 6px 12px !important; background-color: #0dcaf0; color: #ffffff; font-weight: 300; border: 2px solid #0dcaf0; font-size: 12px; letter-spacing: normal; outline: 0; text-decoration: none; border-radius: 4px;" href="${process.env.VerifyJoinus + data.id}">Opt Out I DON’T WANT REFERRALS</a><br>
                                            <a style="cursor: pointer; margin-top: 10px; padding: 5px 12px 6px 12px !important; background-color: #dc3545; color: #ffffff; font-weight: 300; border: 2px solid #dc3545; font-size: 12px; letter-spacing: normal; outline: 0; text-decoration: none; border-radius: 4px;" href="${process.env.VerifyJoinus + data.id}">DELETE PROFILE I AM NO LONGER AN AGENT</a>
                                        </p>
                                    </div>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">At your service,</p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">The My Referral Network Team.</p>
                                    </td>
                                </tr>
                            </table>
                                </td>
                                <td valign="top" width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td  style="padding: 00px 30px 00px 30px;">
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    </table>
    
    </body>
    </html>`
    try {
        let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}

mail.MailToAgentByFrontendforSendReferral = async (data) => {
    let subject = "Your Realtor contact update for your neighbourhood choice.";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;">
        <tr>
            <td style="padding: 0 0 0 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;"
                    style="border-collapse: collapse; width: 100%;">
                    <tr>
                        <td align="left" bgcolor="#175da1"
                            style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="left" bgcolor="#175da1"
                                        style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                                    <td align="left" bgcolor="#175da1"
                                        style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

                                </tr>
                            </table>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td valign="top" width="25%">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>

                                        </table>
                                    </td>
                                    <td width="50%">

                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:0 auto; width: 100%; padding: 10px;
                            background: #ffffff;">
                                            <tr>
                                                <td
                                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                                    <img src="${process.env.image_logo}//rn-logo.png"
                                                        style="width: 200px;" alt="logo">
                                                    <h4
                                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                                        Hello <span>${data.user_name},</span>
                                                    </h4>
                                                    <p style="color: #001328;">I am sorry but ${data.old_agent_name} is busy and could not assist you. We want to make sure that 
                                                    you receive the best and most prompt help possible. We have recommended ${data.new_agent_name} to help you out. They will be in contact with you very soon.</p>
                                                    <br>
                                                    <p style="margin:0px 0px 0px 0px; font-size:16px;color: #001328;">At
                                                        your service,</p>
                                                    <p style="margin:0px 0px 0px 0px; font-size:16px;color: #001328;">
                                                        The My Referral Network Team
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                    <td valign="top" width="25%">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </td>

                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 00px 30px 00px 30px;">

                        </td>

                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>

</html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: data.user_email, subject: subject, html: html });
        // console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};


mail.MailToAgentforReferAClient = async (data) => {
    console.log(data, 'ReferAClient---email')

    let subject = "Here is the referral client information.";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;">
        <tr>
            <td style="padding: 0 0 0 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;"
                    style="border-collapse: collapse; width: 100%;">
                    <tr>
                        <td align="left" bgcolor="#175da1"
                            style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="left" bgcolor="#175da1"
                                        style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                                    <td align="left" bgcolor="#175da1"
                                        style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

                                </tr>
                            </table>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td valign="top" width="25%">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>

                                        </table>
                                    </td>
                                    <td width="50%">

                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:0 auto; width: 100%; padding: 10px;
                            background: #ffffff;">
                                            <tr>
                                                <td
                                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                                    <img src="${process.env.image_logo}//rn-logo.png"
                                                        style="width: 200px;" alt="logo">
                                                    <h4
                                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                                        Hello <span>${data.receiving_agent_name},</span>
                                                    </h4>
                                                    <p style="color: #001328;">I have a referral for you. Here is their information.</p>
                                                    <p style="color: #001328;">
                                                    Name of Client: ${data.client_name} <br>
                                                    Client Phone: ${data.client_phone} <br>
                                                    Client Email: ${data.client_email} <br>
                                                    </p>
                                                    <p style="color: #001328;">Feel free to give them a call as they are expecting you to reach out to them. You have accepted this
referral and agree to pay a 25% referral fee upon a successful competion. If you have any questions
reach out and give me a call or email.</p>
                                                    <p style="color: #001328;"><b>Sincerely,</b></p>
                                                    <p style="color: #001328;">
                                                    ${data.referring_agent_name} <br>
                                                    ${data.referring_agent_brokerageName} <br>
                                                    ${data.referring_agent_phone} <br>
                                                    ${data.referring_agent_email} <br>
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                    <td valign="top" width="25%">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </td>

                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 00px 30px 00px 30px;">

                        </td>

                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>

</html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: data.referring_agent_email, subject: subject, html: html });
        // console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};


mail.MailToAgentAfter24HourAccepted = async (data) => {
    let subject = "Agent follow up notification from referral lead.";
    let html = `<!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>My Refferal Network</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
            rel="stylesheet">
        <style type="text/css">
            p {
                font-size: 16px;
            }
        </style>
    </head>
    
    <body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;">
            <tr>
                <td style="padding: 0 0 0 0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;"
                        style="border-collapse: collapse; width: 100%;">
                        <tr>
                            <td align="left" bgcolor="#175da1"
                                style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="left" bgcolor="#175da1"
                                            style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                                        <td align="left" bgcolor="#175da1"
                                            style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
    
                                    </tr>
                                </table>
                            </td>
    
                        </tr>
                        <tr>
                            <td>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td valign="top" width="25%">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
    
                                            </table>
                                        </td>
                                        <td width="50%">
    
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:0 auto; width: 100%; padding: 10px;
                                background: #ffffff;">
                                                <tr>
                                                    <td
                                                        style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                                        <img src="${process.env.image_logo}//rn-logo.png"
                                                            style="width: 200px;" alt="logo">
                                                        <h4
                                                            style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                                            Hello <span>${data.referred_agent_name},</span>
                                                        </h4>
                                                        <p style="color: #001328;">Just a quick follow up to see how it went with ${data.referred_client_name}. If you have not had a chance to connect yet let me know. Maybe I can help.</p>
                                                        
                                                        <p style="color: #001328;">
                                                        At Your Service,  <br>
                                                        Stewart Peddemors <br>
                                                        RE/MAX Colonial Pacific Realty <br>
                                                        604-329-6759
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
    
                                        <td valign="top" width="25%">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#175da1">&nbsp;</td>
                                                </tr>
                                            </table>
                                        </td>
    
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 00px 30px 00px 30px;">
    
                            </td>
    
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    
    </body>
    
    </html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: data.referred_agent_email, subject: subject, html: html });
        // console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};



mail.MailToAdminDoesNotRespondAgent = async (data) => {
    let subject = "Agent does not respond to a referral email.";
    let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet">
    <style type="text/css">
        p{
            font-size:16px;
        }
    </style>
    </head>
    <body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
    <tr>
        <td style="padding: 0 0 0 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
    
                    </tr>
                    </table>
                    </td>
                 
                </tr>
                <tr>
                    <td>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td valign="top"  width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                              
                                    </table>
                                </td>
                                <td width="50%">
                                
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 auto; width: 100%;margin-top: -160px;">
                                <tr>
                                    <td style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                        <img src="${process.env.image_logo}//rn-logo.png"  style="width: 200px;" alt="logo" >
                                        <h4 style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">Hello <span>Admin,</span>
                                        </h4>
                                        <p>
                                        You sent an email to ${data.agent_name} to verify his details but he didn't verify the information so please follow up that agent to get verify his/her information.
                                        </p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">Thanks,</p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">My Referral Network</p>
                                    </td>
                                </tr>
                            </table>
                                    
                                </td>
                                
                                <td valign="top" width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    </table>
                                </td>
    
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td  style="padding: 00px 30px 00px 30px;">
                        
                    </td>
                    
                </tr>
            </table>
        </td>
    </tr>
    </table>
    
    </body>
    </html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: [process.env.adminEmail], subject: subject, html: html });
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};


// mail.forgotPasswordMail = async (data) => {   // 22-08-2023 last changes
//     let subject = "Reset Password";
//     let html = ` <!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>
//         Password Reset <br>
//         If You have lost your password or wish to reset it, click the below button to get started.<br>
//          <br>
//         <a style="background-color:#EB7035;border:1px solid #EB7035;border-radius:3px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:16px;line-height:44px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;mso-hide:all;" target="_blank" href="${process.env.resetPasswordURL + data.token}" >Reset Password</a>
//         <br/><br/>Enjoy the use of our Site.<br><br>
//         Sincerely,<br/><br>
//         The My Referral Network Team
//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });

//         return true;
//     } catch (err) {
//         return false;
//     }
// };

// mail.forgotPasswordMail = async (data) => {
//     let subject = "Reset Password";
//     let html = `<!DOCTYPE html>
//     <html lang="en-US">
//     <head>
//         <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
//         <title>Reset Password Email Template</title>
//         <meta name="description" content="Reset Password Email Template.">
//         <style type="text/css">
//             a:hover {text-decoration: underline !important;}
//         </style>
//     </head>
//     <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
//         <!--100% body table-->
//         <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
//             style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
//             <tr>
//                 <td>
//                     <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
//                         align="center" cellpadding="0" cellspacing="0">
//                         <tr>
//                             <td style="height:80px;">&nbsp;</td>
//                         </tr>
//                         <tr>
//                             <td style="text-align:center;">
//                               <a title="logo" target="_blank">
//                                 <img src="${process.env.image_logo}//rn-logo.png"  style="width: 200px;" alt="logo" >
//                               </a>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td style="height:20px;">&nbsp;</td>
//                         </tr>
//                         <tr>
//                             <td>
//                                 <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
//                                     style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
//                                     <tr>
//                                         <td style="height:40px;">&nbsp;</td>
//                                     </tr>
//                                     <tr>
//                                         <td style="padding:0 35px;">
//                                             <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
//                                                 requested to reset your password</h1>
//                                             <span
//                                                 style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
//                                             <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
//                                                 We cannot simply send you your old password. A unique link to reset your
//                                                 password has been generated for you. To reset your password, click the
//                                                 following button and follow the instructions.
//                                             </p>
//                                             <a href="javascript:void(0);"
//                                                 style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;cursor:pointer" target="_blank" href="${process.env.resetPasswordURL + data.token}">Reset
//                                                 Password</a>
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td colspan="2" style="text-align: left;padding: 30px 35px 0 35px">Sincerely,</td>
                                        
//                                     </tr>
//                                     <tr>
//                                         <td colspan="2" style="text-align: left;padding: 0px 35px 0 35px">The My Referral Network Team</td>
//                                     </tr>
//                                     <tr>
//                                         <td style="height:40px;">&nbsp;</td>
//                                     </tr>
//                                 </table>
//                             </td>
//                         <tr>
//                             <td style="height:20px;">&nbsp;</td>
//                         </tr>
//                         <tr>
//                             <td style="height:80px;">&nbsp;</td>
//                         </tr>
//                     </table>
//                 </td>
//             </tr>
//         </table>
//     </body>
//     </html>`

//     // let html = ` <!DOCTYPE html>
//     // <html>
//     // <head>
//     //     <meta charset="utf-8">
//     //     <title></title>
//     // </head>
//     // <body>
//     //     Password Reset <br>
//     //     If You have lost your password or wish to reset it, click the below button to get started.<br>
//     //      <br>
//     //     <a style="background-color:#EB7035;border:1px solid #EB7035;border-radius:3px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:16px;line-height:44px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;mso-hide:all;" target="_blank" href="${process.env.resetPasswordURL + data.token}" >Reset Password</a>
//     //     <br/><br/>Enjoy the use of our Site.<br><br>
//     //     Sincerely,<br/><br>
//     //     The My Referral Network Team
//     // </body>
//     // </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });

//         return true;
//     } catch (err) {
//         return false;
//     }
// };


mail.forgotPasswordMail = async (data) => {
    console.log('forgotPasswordMail----------->',data);
    
    let subject = "Password Change Requested";
    let html = `<!DOCTYPE html>
    <html lang="en-US">
    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title>Reset Password Email Template</title>
        <meta name="description" content="Reset Password Email Template.">
        <style type="text/css">
            a:hover {text-decoration: underline !important;}
        </style>
    </head>
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
        <!--100% body table-->
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                              <a title="logo" target="_blank">
                                <img src="${process.env.image_logo}//rn-logo.png"  style="width: 200px;" alt="logo" >
                              </a>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; -webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h4
                                                style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                                Hello <span>${data.fullname},</span>
                                            </h4>
                                            <p style="color: #001328;">You have requested a password change. Go to the link below to update your password<br>
                                                Follow link to update your password
                                                <a href="javascript:void(0);" style="background:#20e277;text-decoration:none !important; font-weight:350; margin-top:30px; color:#fff;text-transform:uppercase; font-size:12px;padding:8px 18px;display:inline-block;border-radius:50px;cursor:pointer" target="_blank" href="${process.env.resetPasswordURL + data.token}">Click Here</a><br>
                                            </p>
                                            <p style="color: #001328;">If you have not requested the password to be changed you can disregard this notice.</p>                                        
                                            <p style="margin:0px 0px 0px 0px; font-size:16px;color: #001328;">Thank you,</p>
                                            <p style="margin:0px 0px 0px 0px; font-size:16px;color: #001328;">The My Referral Network Team </p><br><br>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`
    try {
        let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });

        return true;
    } catch (err) {
        return false;
    }
};


mail.passwordChangeSucessful = async (data) => {
    // console.log('passwordChangeSucessful----------->',data);
    let subject = "Password Change Sucessful";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;">
        <tr>
            <td style="padding: 0 0 0 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;"
                    style="border-collapse: collapse; width: 100%;">
                    <tr>
                        <td align="left" bgcolor="#175da1"
                            style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="left" bgcolor="#175da1"
                                        style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                                    <td align="left" bgcolor="#175da1"
                                        style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

                                </tr>
                            </table>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td valign="top" width="25%">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>

                                        </table>
                                    </td>
                                    <td width="50%">

                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:0 auto; width: 100%; padding: 10px;
                            background: #ffffff;">
                                            <tr>
                                                <td
                                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                                    <img src="${process.env.image_logo}//rn-logo.png"
                                                        style="width: 200px;" alt="logo">
                                                    <h4
                                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                                        Hello <span>${data.fullname},</span>
                                                    </h4>
                                                    <p style="color: #001328;">You have successfully changed your password. You can go to the login through this link or go to <a target="_blank" href="www.myreferralnetork.ca">www.myreferralnetork.ca</a> to login.
                                                    </p><a href="javascript:void(0);" style="background:#20e277;text-decoration:none !important; font-weight:350; color:#fff;text-transform:uppercase; font-size:12px;padding:6px 14px;display:inline-block;border-radius:50px;cursor:pointer" target="_blank" href="${data.loginLinke}">Click Here</a>
                                                    <p style="color: #001328;">If you have not requested your password and have received this email please contact <a target="_blank" href="info@myreferralnetwork.com">info@myreferralnetwork.com</a> as soon as possible.
                                                    </p>
                                                    <p style="margin:0px 0px 0px 0px; font-size:16px;color: #001328;">Thank you,</p>
                                                    <p style="margin:0px 0px 0px 0px; font-size:16px;color: #001328;">The My Referral Network Team </p><br><br>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td valign="top" width="25%">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </td>

                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 00px 30px 00px 30px;">
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
    try {
        let res = await transporter.sendMail({ from: from, to: data.email, subject: subject, html: html });

        return true;
    } catch (err) {
        return false;
    }
};


mail.realtorReferralWasDeclinedForAdmin = async (data) => { // new
    console.log('realtorReferralWasDeclined----------->',data);
    let subject = "A Realtor Referral was Declined.";
    let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet">
    <style type="text/css">
        p{
            font-size:16px;
        }
    </style>
    </head>
    <body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
    <tr>
        <td style="padding: 0 0 0 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
    
                    </tr>
                    </table>
                    </td>
                 
                </tr>
                <tr>
                    <td>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td valign="top"  width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                              
                                    </table>
                                </td>
                                <td width="50%">
                                
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 auto; width: 100%;margin-top: -160px;">
                                <tr>
                                    <td style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                        <img src="${process.env.image_logo}//rn-logo.png"  style="width: 200px;" alt="logo" >
                                        <h4 style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">Hello <span>Admin,</span></br>
                                        </h4>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">Your Choice of ${data.referring_agent_name}, to accept a referral of the following client was declined.</p><br>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">Name of Client: ${data.client_name}</p>
                                        <p style="margin:0px 0px 10px 0px; font-size:16px;">Client Phone: ${data.client_phone}</p>
                                        <p style="margin:0px 0px 10px 0px; font-size:16px;">Client Email: ${data.client_email}</p><br>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">Feel free to reach out to the ${data.receiving_agent_name} and give them a call at ${data.receiving_agent_phone}
                                            to see if declining was an error. If they don’t want to accept your referral then feel free to
                                            enter another realtor in the Send Referral form to accept your referral.
                                        </p>
                                        <p style="color: #001328;"><b>Sincerely,</b></p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">At your Service,</p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">The My Referral Network Team</p>
                                    </td>
                                </tr>
                            </table>
                                    
                                </td>
                                
                                <td valign="top" width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    </table>
                                </td>
    
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td  style="padding: 00px 30px 00px 30px;">
                        
                    </td>
                    
                </tr>
            </table>
        </td>
    </tr>
    </table>
    
    </body>
    </html>`
    try {
        let res = await transporter.sendMail({ from: from, to: process.env.adminEmail, subject: subject, html: html });

        return true;
    } catch (err) {
        return false;
    }
};

mail.yourReferralWasDeclinedForsenderRealtor = async (data) => { // new
    console.log('yourReferralWasDeclinedForsenderRealtor----------->',data);
    let subject = "Your Referral was Declined.";
    let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet">
    <style type="text/css">
        p{
            font-size:16px;
        }
    </style>
    </head>
    <body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;"> 
    <tr>
        <td style="padding: 0 0 0 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                    <td align="left" bgcolor="#175da1" style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
    
                    </tr>
                    </table>
                    </td>
                 
                </tr>
                <tr>
                    <td>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td valign="top"  width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                        <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                              
                                    </table>
                                </td>
                                <td width="50%">
                                
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 auto; width: 100%;margin-top: -160px;">
                                <tr>
                                    <td style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                        <img src="${process.env.image_logo}//rn-logo.png"  style="width: 200px;" alt="logo" >
                                        <h4 style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">Hello <span>Admin,</span></br>
                                        </h4>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">Your Choice of Realtor to accept a referral of the following client was declined.</p><br>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">Name of Client: ${data.client_name}</p>
                                        <p style="margin:0px 0px 10px 0px; font-size:16px;">Client Phone: ${data.client_phone}</p>
                                        <p style="margin:0px 0px 10px 0px; font-size:16px;">Client Email: ${data.client_email}</p><br>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">Feel free to reach out to the ${data.receiving_agent_name} and give them a call at ${data.receiving_agent_phone}
                                            to see if declining was an error. If they don’t want to accept your referral then feel free to
                                            enter another realtor in the Send Referral form to accept your referral.
                                        </p>
                                        <p style="color: #001328;"><b>Sincerely,</b></p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">At your Service,</p>
                                        <p style="margin:0px 0px 0px 0px; font-size:16px;">The My Referral Network Team</p>
                                    </td>
                                </tr>
                            </table>
                                    
                                </td>
                                
                                <td valign="top" width="25%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr> <td bgcolor="#175da1">&nbsp;</td></tr>
                                    <tr><td bgcolor="#175da1">&nbsp;</td> </tr>
                                    </table>
                                </td>
    
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td  style="padding: 00px 30px 00px 30px;">
                        
                    </td>
                    
                </tr>
            </table>
        </td>
    </tr>
    </table>
    
    </body>
    </html>`
    try {
        let res = await transporter.sendMail({ from: from, to: data.referring_agent_email, subject: subject, html: html });

        return true;
    } catch (err) {
        return false;
    }
};

mail.newReferralbetweenRealtors = async (data) => {
    console.log(data, 'ReferAClient---email')

    let subject = "New Referral between Realtors";
    let html = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>My Refferal Network</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
        rel="stylesheet">
    <style type="text/css">
        p {
            font-size: 16px;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color:#eef5fd;font-family: Roboto;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:100px;">
        <tr>
            <td style="padding: 0 0 0 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%;"
                    style="border-collapse: collapse; width: 100%;">
                    <tr>
                        <td align="left" bgcolor="#175da1"
                            style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height:80px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="left" bgcolor="#175da1"
                                        style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">
                                    <td align="left" bgcolor="#175da1"
                                        style="padding-left:25px; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Roboto, sans-serif; height: 80px;">

                                </tr>
                            </table>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td valign="top" width="25%">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>

                                        </table>
                                    </td>
                                    <td width="50%">

                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:0 auto; width: 100%; padding: 10px;
                            background: #ffffff;">
                                            <tr>
                                                <td
                                                    style="color: #001328; font-family: Roboto, sans-serif;background-color: #ffffff;text-align: left;padding: 20px;border-radius: 5px;font-size: 18px;line-height: 30px;">
                                                    <img src="${process.env.image_logo}//rn-logo.png"
                                                        style="width: 200px;" alt="logo">
                                                    <h4
                                                        style="font-weight:normal;margin-top:20px; margin-bottom:0px; padding: 0;font-size: 16px;font-size: 20px;font-weight: bold;">
                                                        Hello <span>Admin,</span>
                                                    </h4>
                                                    <p style="color: #001328;">${data.referring_agent_name} has sent a referral to ${data.receiving_agent_name}.</p>
                                                    <p style="color: #001328;">Another great connection is made. Check in with the Receiving Realtor and if they are signed in as a
                                                        partner or client.</p>
                                                    <p style="color: #001328;"><b>Sincerely,</b></p>
                                                    <p style="color: #001328;">
                                                        The My Referral Network Team
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                    <td valign="top" width="25%">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#175da1">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </td>

                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 00px 30px 00px 30px;">

                        </td>

                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>

</html>`;
    try {
        let res = await transporter.sendMail({ from: from, to: process.env.adminEmail, subject: subject, html: html });
        // console.log(res)
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
};


// mail.CreateRequest = async (data) => {
//     console.log('e', process.env.requetsPage + data.agent_id + '/' + data.req_id + '/1');

//     console.log(data,'CreateeeeeeeREQUEST-----------')
//     // Hello ${data.agent_name} <br>
//     //     You have new request for became Partner account by ${data.name}. <br><br>
//     //     <br/><br/>Regards,<br/>Team Refferal<br/>Thank you 

//     let subject = "New Request";
//     let html = `<!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title></title>
//     </head>
//     <body>

//         Hello ${data.agent_name}, <br>
//         Thanks for being part of My Referral Network. I have a client who would like you to reach out and connect with them to help them find a home in the Postal Code area ${data.fsa}. <br>
//          If you want the referral click the link Accept. If you do not want the referral click Decline. If you accept you will be sent the name, phone and email of the client right
//         away so you can reach out to them.They are looking for you to connect with them. <br>
//         By clicking Accept you will agree to pay the sender a 25% referral fee upon a successful transaction. Accepted referrals may not be passed on to another agent unless they are informed of the referral fee owed to the sender.<br>
//          <a href="${process.env.requetsPage + data.req_id + '/1'}" target="_blank">Accept </a> &nbsp;   <a href="${process.env.requetsPage + data.req_id + '/2'}" target="_blank">Decline </a>  <br><br>
//          Your Referral Network Partner, <br>Stewart Peddemors Personal Real Estate Corporation <br>
//          RE/MAX Colonial Pacific Realty Ltd <br>
//          604-329-6759  <br>
//          stewartp@remax.net <br><br>
//          <a style="color:#d33117" href="${ process.env.UnsubscribeURL + data.unsubscribe_agent }" target="_blank">Click here</a> no to receiving a referral from the system.


//     </body>
//     </html>`;
//     try {
//         let res = await transporter.sendMail({ from: from, to:  [process.env.adminEmail, data.agent_email], subject: subject, html: html });
//         console.log(res)
//         return true;
//     } catch (err) {
//         console.log(err)
//         return false;
//     }
// };


// ************************************************************************

module.exports = mail;