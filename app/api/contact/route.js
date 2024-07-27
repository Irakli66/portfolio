import { mailOptions, transporter } from '@/app/config/nodemailer';
import { NextResponse } from 'next/server';

const CONTACT_MESSAGE_FIELDS = {
  firstname: 'Firstname',
  lastname: 'Lastname',
  email: 'Email',
  phone: 'Phone',
  description: 'Description',
};

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, value]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${value}} \n \n`),
    ''
  );

  const htmlData = Object.entries(data).reduce(
    (str, [key, value]) =>
      (str += `<h1 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h1> <pclass="form-answer" align="left">${value}</p>`),
    ''
  );

  return {
    text: stringData,
    html: `<!DOCTYPE html><html><head><title></title><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge"><style type="text/css">a,body,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table{border-collapse:collapse!important}body{height:100%!important;margin:0!important;padding:0!important;width:100%!important}@media screen and (max-width:525px){.wrapper{width:100%!important;max-width:100%!important}.responsive-table{width:100%!important}.padding{padding:10px 5% 15px 5%!important}.section-padding{padding:0 15px 50px 15px!important}}.form-container{margin-bottom:24px;padding:20px;border:1px dashed #ccc}.form-heading{color:#2a2a2a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:400;text-align:left;line-height:20px;font-size:18px;margin:0 0 8px;padding:0}.form-answer{color:#2a2a2a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;text-align:left;line-height:20px;font-size:16px;margin:0 0 24px;padding:0}div[style*='margin: 16px 0;']{margin:0!important}</style></head><body style="margin:0!important;padding:0!important;background:#fff"><div style="display:none;font-size:1px;color:#fefefe;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden"></div><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td bgcolor="#ffffff" align="center" style="padding:10px 15px 30px 15px" class="section-padding"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:500px" class="responsive-table"><tr><td><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td style="padding:0;font-size:16px;line-height:25px;color:#232323" class="padding message-content"><h2>New Contact Message</h2><div class="form-container">${htmlData}</div></td></tr></table></td></tr></table></td></tr></table></td></tr></table></body></html>`,
  };
};

// To handle a GET request to /api
// export async function GET(req, res) {
//   console.log(req.body);
//   return NextResponse.json({ message: 'Hello World' }, { status: 200 });
// }

// To handle a POST request to /api
export async function POST(req, res) {
  const data = await req.json();
  console.log(data);

  try {
    await transporter.sendMail({
      ...mailOptions,
      ...generateEmailContent(data),
      subject: data.subject,
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }

  // return NextResponse.json({ message: 'Bad request' }, { status: 200 });
}
