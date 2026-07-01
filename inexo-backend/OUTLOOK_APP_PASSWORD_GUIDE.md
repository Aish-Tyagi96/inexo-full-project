# How to Generate an App Password for Microsoft Outlook / Office 365

When configuring the backend to send emails using your Outlook account (e.g., `pravin@inexocast.in` or `suresh@inexocast.in`), you cannot use your regular login password if Multi-Factor Authentication (MFA) is enabled. You must use an **App Password**.

## Prerequisites
1. You must have an Office 365 / Microsoft 365 account.
2. **Two-Step Verification (Multi-Factor Authentication - MFA)** must be enabled on your account. If it's not enabled, you cannot generate an App Password.

## Steps to Generate an App Password

1. **Sign In**: Go to your [Microsoft Account Security page](https://account.microsoft.com/security) or your organization's [My Sign-Ins page](https://mysignins.microsoft.com/security-info) and sign in with your email (`pravin@inexocast.in` or `suresh@inexocast.in`).
2. **Access Advanced Security**: Click on **Advanced security options** (or "Security info").
3. **App Passwords**: Scroll down to the **App passwords** section. 
   *(Note: If you don't see this section, it means Two-Step Verification is either turned off or your organization's admin has disabled the ability to create app passwords. Contact your IT admin if needed.)*
4. **Create a New App Password**: Click on **Create a new app password**.
5. **Copy the Password**: A randomly generated 16-character password will appear on the screen. **Copy this password immediately**. You will not be able to see it again.

## Troubleshooting
- **SMTP Authentication Error**: If the application fails to send emails and logs an authentication error, ensure that **SMTP AUTH** is enabled for your specific mailbox in the Microsoft 365 Admin Center. (Admin Center > Users > Active users > Mail > Manage email apps > Check "Authenticated SMTP").
- **No App Passwords Option**: Your admin might have enforced Modern Authentication and disabled Basic Authentication. In this case, you may need to use Microsoft Graph API instead of standard SMTP, but using an App Password is the standard way for traditional SMTP if allowed by your admin.
