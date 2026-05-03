// ─────────────────────────────────────────────────────────────
//  FILE: app/api/contact/route.js
//
//  Required environment variables:
//    RESEND_API_KEY=re_xxxxxxxxxxxx
//    CONTACT_EMAIL=your@email.com
// ─────────────────────────────────────────────────────────────

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const IS_DEV = process.env.NODE_ENV === "development";

export async function POST(request) {
  try {
    const { name, email, phone, company, service, message } = await request.json();

    // ── Input Validation ────────────────────────────────────
    if (!name || !email) {
      return Response.json(
        { success: false, error: "Name and Email are required." },
        { status: 400 }
      );
    }

    // ── Notification Email → Firm Owner ────────────────────
    await resend.emails.send({
      from:    "SK Dwivedi Website <onboarding@resend.dev>",
      to:      process.env.CONTACT_EMAIL,
      subject: `New Enquiry: ${service || "General"} — ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">

          <div style="background:#0a1628;padding:24px 32px;">
            <h1 style="color:#c9a84c;margin:0;font-size:20px;letter-spacing:1px;">
              S K Dwivedi &amp; Associates
            </h1>
            <p style="color:#7a90b0;margin:6px 0 0;font-size:13px;">
              New Website Enquiry
            </p>
          </div>

          <div style="padding:24px 32px;border:1px solid #e8ecf0;border-top:none;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:35%;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999;">
                  Full Name
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:15px;color:#222;font-weight:600;">
                  ${name}
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999;">
                  Email
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                  <a href="mailto:${email}" style="color:#1a5fc8;font-size:15px;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999;">
                  Phone
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:15px;color:#222;">
                  ${phone || "—"}
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999;">
                  Company
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:15px;color:#222;">
                  ${company || "—"}
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999;">
                  Service
                </td>
                <td style="padding:10px 0;">
                  <span style="background:#e8f0fe;color:#1a5fc8;padding:3px 12px;border-radius:20px;font-size:13px;font-weight:600;">
                    ${service || "Not specified"}
                  </span>
                </td>
              </tr>
            </table>

            <div style="margin-top:20px;">
              <p style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999;margin-bottom:8px;">
                Message
              </p>
              <div style="background:#f8f9fb;border-left:3px solid #c9a84c;padding:14px;font-size:14px;color:#444;line-height:1.7;">
                ${message || "—"}
              </div>
            </div>

            <div style="margin-top:24px;text-align:center;">
              <a href="mailto:${email}"
                style="background:#1a5fc8;color:#fff;padding:12px 28px;border-radius:100px;text-decoration:none;font-size:14px;font-weight:600;display:inline-block;">
                Reply to ${name}
              </a>
            </div>
          </div>

          <div style="background:#f4f6f9;padding:14px 32px;text-align:center;font-size:12px;color:#aaa;">
            Sent from skdwivedi.com contact form
          </div>

        </div>
      `,
    });

    // ── Auto-reply Email → Client ───────────────────────────
    // In development, redirected to owner email for testing.
    // In production, sends directly to the client.
    await resend.emails.send({
      from:    "SK Dwivedi Website <onboarding@resend.dev>",
      to:      IS_DEV ? process.env.CONTACT_EMAIL : email,
      subject: IS_DEV
        ? `[DEV] Auto-reply preview for ${name} <${email}>`
        : `We received your enquiry — S K Dwivedi & Associates`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">

          ${IS_DEV ? `
          <div style="background:#fff3cd;border:1px solid #ffc107;padding:10px 20px;font-size:13px;color:#856404;">
            <strong>[DEV MODE]</strong> This email is intended for <strong>${email}</strong>.
            In production, it will be delivered directly to the client.
          </div>
          ` : ""}

          <div style="background:#0a1628;padding:24px 32px;">
            <h1 style="color:#c9a84c;margin:0;font-size:20px;letter-spacing:1px;">
              S K Dwivedi &amp; Associates
            </h1>
            <p style="color:#7a90b0;margin:6px 0 0;font-size:13px;">
              Company Secretaries · ICSI Registered · Est. 2001
            </p>
          </div>

          <div style="padding:32px;border:1px solid #e8ecf0;border-top:none;line-height:1.8;color:#333;font-size:15px;">
            <p>Dear <strong>${name}</strong>,</p>
            <p>
              Thank you for contacting <strong>S K Dwivedi &amp; Associates</strong>.
            </p>
            <p>
              We have received your enquiry regarding
              <strong style="color:#1a5fc8;">${service || "our services"}</strong>
              and our team will review it shortly.
            </p>

            <div style="background:#f0f4ff;border:1px solid #c8d8f0;border-radius:8px;padding:18px 20px;margin:24px 0;">
              <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#1a5fc8;text-transform:uppercase;letter-spacing:1px;">
                What happens next?
              </p>
              <p style="margin:6px 0;font-size:14px;color:#444;">✅ &nbsp;Our team will respond within <strong>1 business day</strong></p>
              <p style="margin:6px 0;font-size:14px;color:#444;">✅ &nbsp;We will carefully review your requirement</p>
              <p style="margin:6px 0;font-size:14px;color:#444;">✅ &nbsp;We will suggest the best solution for you</p>
            </div>

            <p>For immediate assistance:</p>
            <p>
              📞 &nbsp;<strong>+91 9699981283</strong><br/>
              💬 &nbsp;<a href="https://wa.me/9699981283" style="color:#1a5fc8;">WhatsApp Us</a><br/>
              📧 &nbsp;<a href="mailto:office@skdassociate.com" style="color:#1a5fc8;">info@skdwivedi.com</a>
            </p>

            <br/>
            <p style="margin:0;">Warm regards,</p>
            <p style="margin:6px 0 0;">
              <strong>S K Dwivedi &amp; Associates</strong><br/>
              <span style="color:#888;font-size:13px;">Company Secretaries | Mumbai</span>
            </p>
          </div>

          <div style="background:#f4f6f9;padding:14px 32px;text-align:center;font-size:12px;color:#aaa;">
            32 Bharadawadi Rd,Navneeth Colony, Andheri(W), Mumbai,Maharastra – 400053,India
          </div>

        </div>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("[Contact API] Unexpected error:", error);
    return Response.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}