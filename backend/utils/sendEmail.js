import nodemailer from 'nodemailer'

const sendOrderEmail = async (orderData) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        const itemsList = orderData.items
            .map(item => `<tr>
                <td style="padding:8px;border-bottom:1px solid #eee">${item.name}</td>
                <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td>
                <td style="padding:8px;border-bottom:1px solid #eee;text-align:left">${item.price} ₪</td>
            </tr>`)
            .join('')

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: '🛒 הזמנה חדשה התקבלה - Interproduct',
            html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;direction:rtl">
                    
                    <div style="background:#1A1A1A;padding:20px;text-align:center">
                        <h1 style="color:#ffffff;margin:0;font-size:24px">הזמנה חדשה התקבלה</h1>
                        <p style="color:#C0001A;margin:5px 0 0">Interproduct</p>
                    </div>

                    <div style="padding:24px;background:#f9f9f9">

                        <h2 style="color:#1A1A1A;border-bottom:2px solid #C0001A;padding-bottom:8px">פרטי לקוח</h2>
                        <table style="width:100%;margin-bottom:24px">
                            <tr>
                                <td style="padding:6px 0;color:#8C8C8C;width:140px">שם מלא:</td>
                                <td style="padding:6px 0;font-weight:bold">${orderData.address.firstName} ${orderData.address.lastName}</td>
                            </tr>
                            <tr>
                                <td style="padding:6px 0;color:#8C8C8C">אימייל:</td>
                                <td style="padding:6px 0">${orderData.address.email}</td>
                            </tr>
                            <tr>
                                <td style="padding:6px 0;color:#8C8C8C">טלפון:</td>
                                <td style="padding:6px 0">${orderData.address.phone}</td>
                            </tr>
                            <tr>
                                <td style="padding:6px 0;color:#8C8C8C">כתובת:</td>
                                <td style="padding:6px 0">${orderData.address.street}, ${orderData.address.city}</td>
                            </tr>
                        </table>

                        <h2 style="color:#1A1A1A;border-bottom:2px solid #C0001A;padding-bottom:8px">פרטי הזמנה</h2>
                        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
                            <thead>
                                <tr style="background:#1A1A1A;color:white">
                                    <th style="padding:10px;text-align:right">מוצר</th>
                                    <th style="padding:10px;text-align:center">כמות</th>
                                    <th style="padding:10px;text-align:left">מחיר</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itemsList}
                            </tbody>
                        </table>

                        <div style="background:#1A1A1A;color:white;padding:16px;border-radius:8px;text-align:left">
                            <span style="font-size:18px;font-weight:bold">סה"כ לתשלום: ${orderData.amount} ₪</span>
                        </div>

                        <p style="color:#8C8C8C;font-size:12px;margin-top:24px;text-align:center">
                            תאריך הזמנה: ${new Date().toLocaleDateString('he-IL')}
                        </p>
                    </div>

                </div>
            `
        }

        await transporter.sendMail(mailOptions)
        console.log('Order notification email sent')

    } catch (error) {
        console.log('Email error:', error.message)
        // Don't throw — email failure shouldn't block the order
    }
}

export default sendOrderEmail