import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY not set in enviroment variable.");
}

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * ارسال ایمیل بازیابی رمز عبور
 * @param toEmail - ایمیل گیرنده
 * @param resetLink - لینک بازیابی
 */
export async function sendPasswordResetEmail(
  toEmail: string,
  resetLink: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await resend.emails.send({
      from: "Boilerplate <onboarding@resend.dev>",
      to: toEmail,
      subject: "بازیابی رمز عبور",
      html: getPasswordResetEmailTemplate(resetLink),
    });

    if (result.error) {
      return {
        success: false,
        error: result.error.message,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "خطای ناشناخته در ارسال ایمیل",
    };
  }
}

/**
 * قالب HTML ایمیل بازیابی
 */
function getPasswordResetEmailTemplate(resetLink: string): string {
  return `
        <!DOCTYPE html>
        <html lang="fa" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>بازیابی رمز عبور</title>
        </head>
        <body style="direction: rtl; margin: 0; padding: 0; font-family: Tahoma, Arial, sans-serif; background-color: #f4f4f4;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <!-- هدر -->
                <tr>
                    <td style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 30px 20px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">بازیابی رمز عبور</h1>
                    </td>
                </tr>
                
                <!-- محتوا -->
                <tr>
                    <td style="padding: 40px 30px;">
                        <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                            سلام!
                        </p>
                        <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                            ما یک درخواست برای بازیابی رمز عبور حساب شما دریافت کردیم.
                            برای تنظیم رمز جدید، روی دکمه زیر کلیک کنید:
                        </p>
                        
                        <!-- دکمه -->
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetLink}" 
                               style="display: inline-block; background-color: #2563eb; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: bold;">
                                بازیابی رمز عبور
                            </a>
                        </div>
                        
                        <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                            <strong>نکته امنیتی:</strong> این لینک فقط به مدت <strong>۱ ساعت</strong> اعتبار دارد.
                        </p>
                        
                        <p style="color: #666; font-size: 14px; line-height: 1.6;">
                            اگر شما این درخواست را ارسال نکرده‌اید، لطفاً این ایمیل را نادیده بگیرید
                            و رمز عبور خود را تغییر ندهید.
                        </p>
                    </td>
                </tr>
                
                <!-- فوتر -->
                <tr>
                    <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                            این ایمیل به‌صورت خودکار ارسال شده است. لطفاً به آن پاسخ ندهید.
                        </p>
                        <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0 0;">
                            © 2026 Boilerplate. تمامی حقوق محفوظ است.
                        </p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;
}

/**
 * ارسال ایمیل خوش آمدگویی به کاربر
 * @param toEmail - ایمیل کاربر
 * @param username - نام و نام خانوادگی کاربر
 */
export async function sendWelcomeEmail(
  toEmail: string,
  username: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await resend.emails.send({
      from: "Boilerplate <onboarding@resend.dev>",
      to: toEmail,
      subject: `خوش آمدید ${username}`,
      html: getWelcomeEmailTemplate(username),
    });

    if(result.error){
        return {success: false, error: result.error.message};
    }

    return {success: true};

  } catch (error) {
    return {
        success: false,
        error: error instanceof Error ? error.message : "خطای ناشناخته",
    }
  }
}

/**
 * قالب HTML ایمیل خوش‌آمدگویی
 */
function getWelcomeEmailTemplate(userName: string): string {
    return `
        <!DOCTYPE html>
        <html lang="fa" dir="rtl">
        <head>
            <meta charset="UTF-8">
        </head>
        <body style="margin: 0; padding: 0; font-family: Tahoma, Arial, sans-serif; background-color: #f4f4f4; direction: rtl;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                <!-- هدر سبز برای خوش‌آمدگویی -->
                <tr>
                    <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px 20px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">
                            🎉 خوش آمدید!
                        </h1>
                    </td>
                </tr>
                
                <tr>
                    <td style="padding: 40px 30px;">
                        <p style="color: #333; font-size: 16px; line-height: 1.6;">
                            سلام <strong>${userName}</strong> عزیز!
                        </p>
                        <p style="color: #333; font-size: 16px; line-height: 1.6;">
                            از اینکه به جمع ما پیوستید، بسیار خوشحالیم.
                            حساب کاربری شما با موفقیت ساخته شد.
                        </p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="http://localhost:3000/login" 
                               style="display: inline-block; background-color: #059669; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: bold;">
                                ورود به حساب
                            </a>
                        </div>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;
}
