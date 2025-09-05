import nodemailer from 'nodemailer'

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

interface SendPasswordResetEmailProps {
  email: string
  name: string
  resetToken: string
}

export async function sendPasswordResetEmail({
  email,
  name,
  resetToken,
}: SendPasswordResetEmailProps) {
  const transporter = createTransporter()
  
  // Create reset URL - adjust this based on your domain in production
  const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:5000'}/reset-password?token=${resetToken}`
  
  const mailOptions = {
    from: `"ProposalAI" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: 'Reset Your ProposalAI Password',
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password - ProposalAI</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <div style="display: inline-flex; align-items: center; gap: 12px; color: white; font-size: 28px; font-weight: bold;">
                <div style="background: rgba(255, 255, 255, 0.2); padding: 8px; border-radius: 8px;">
                  📄
                </div>
                ProposalAI
              </div>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h1 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 600; color: #1a1a1a;">
                Reset Your Password
              </h1>
              
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #4a4a4a;">
                Hi ${name},
              </p>
              
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #4a4a4a;">
                We received a request to reset the password for your ProposalAI account. If you didn't make this request, you can safely ignore this email.
              </p>
              
              <p style="margin: 0 0 30px 0; font-size: 16px; color: #4a4a4a;">
                To reset your password, click the button below:
              </p>
              
              <!-- Reset Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Reset Password
                </a>
              </div>
              
              <p style="margin: 30px 0 20px 0; font-size: 14px; color: #666;">
                Or copy and paste this link into your browser:
              </p>
              
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; word-break: break-all; font-size: 14px; color: #666;">
                ${resetUrl}
              </div>
              
              <p style="margin: 30px 0 0 0; font-size: 14px; color: #666;">
                This link will expire in 1 hour for security reasons.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eee;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
                This email was sent by ProposalAI
              </p>
              <p style="margin: 0; font-size: 12px; color: #999;">
                If you didn't request a password reset, please ignore this email or contact our support team.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Hi ${name},

We received a request to reset the password for your ProposalAI account.

To reset your password, visit this link:
${resetUrl}

This link will expire in 1 hour.

If you didn't request a password reset, please ignore this email.

Best regards,
ProposalAI Team
    `,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Password reset email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending password reset email:', error)
    throw error
  }
}