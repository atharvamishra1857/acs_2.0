"use server";

import { Resend } from "resend";

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitQuoteForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  /* ── pull every field ── */
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;

  const bandsawType = formData.get("bandsawType") as string;
  const quantity = formData.get("quantity") as string;
  const machineType = formData.get("machineType") as string;

  const materialSize = formData.getAll("materialSize") as string[];
  const materialWidth = formData.get("materialWidth") as string;
  const materialHeight = formData.get("materialHeight") as string;
  const materialLength = formData.get("materialLength") as string;
  const additionalDimensions = formData.get("additionalDimensions") as string;
  const materialType = formData.getAll("materialType") as string[];

  const enquiryPurpose = formData.get("enquiryPurpose") as string;
  const requirement = formData.get("requirement") as string;

  /* ── basic server-side guard ── */
  if (!name || !phone || !email || !company || !bandsawType || !machineType) {
    return { status: "error", message: "Please fill in all required fields." };
  }
  if (materialSize.length === 0 || materialType.length === 0) {
    return {
      status: "error",
      message: "Please select at least one material shape and material type.",
    };
  }

  /* ── compose HTML email ── */
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #1a1a1a;">
      <div style="background:#1a1a1a; padding:20px 28px; border-left:4px solid #ff5a00;">
        <h1 style="color:#fff; font-size:20px; margin:0; letter-spacing:2px; text-transform:uppercase;">
          New Machine Enquiry — ACS
        </h1>
      </div>

      <div style="padding:28px; background:#f9f9f9; border:1px solid #eee;">
        <h2 style="font-size:13px; text-transform:uppercase; letter-spacing:2px; color:#ff5a00; margin:0 0 16px;">
          01 · Contact Details
        </h2>
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr><td style="padding:6px 0; color:#666; width:180px;">Full Name</td><td style="padding:6px 0; font-weight:600;">${name}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Phone</td><td style="padding:6px 0; font-weight:600;">${phone}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Business Email</td><td style="padding:6px 0; font-weight:600;">${email}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Company</td><td style="padding:6px 0; font-weight:600;">${company}</td></tr>
        </table>

        <hr style="border:none; border-top:1px solid #e5e5e5; margin:20px 0;" />

        <h2 style="font-size:13px; text-transform:uppercase; letter-spacing:2px; color:#ff5a00; margin:0 0 16px;">
          02 · Machine Details
        </h2>
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr><td style="padding:6px 0; color:#666; width:180px;">Bandsaw Type</td><td style="padding:6px 0; font-weight:600;">${bandsawType}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Quantity</td><td style="padding:6px 0; font-weight:600;">${quantity}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Machine Type</td><td style="padding:6px 0; font-weight:600;">${machineType}</td></tr>
        </table>

        <hr style="border:none; border-top:1px solid #e5e5e5; margin:20px 0;" />

        <h2 style="font-size:13px; text-transform:uppercase; letter-spacing:2px; color:#ff5a00; margin:0 0 16px;">
          03 · Material Information
        </h2>
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr><td style="padding:6px 0; color:#666; width:180px;">Shape(s)</td><td style="padding:6px 0; font-weight:600;">${materialSize.join(", ")}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Width (mm)</td><td style="padding:6px 0; font-weight:600;">${materialWidth || "—"}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Height (mm)</td><td style="padding:6px 0; font-weight:600;">${materialHeight || "—"}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Length (mm)</td><td style="padding:6px 0; font-weight:600;">${materialLength || "—"}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Material Type(s)</td><td style="padding:6px 0; font-weight:600;">${materialType.join(", ")}</td></tr>
          ${additionalDimensions ? `<tr><td style="padding:6px 0; color:#666;">Additional Info</td><td style="padding:6px 0;">${additionalDimensions}</td></tr>` : ""}
        </table>

        <hr style="border:none; border-top:1px solid #e5e5e5; margin:20px 0;" />

        <h2 style="font-size:13px; text-transform:uppercase; letter-spacing:2px; color:#ff5a00; margin:0 0 16px;">
          04 · Enquiry Details
        </h2>
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr><td style="padding:6px 0; color:#666; width:180px;">Purpose</td><td style="padding:6px 0; font-weight:600;">${enquiryPurpose || "Not specified"}</td></tr>
        </table>
        ${
          requirement
            ? `<div style="margin-top:12px; padding:14px; background:#fff; border:1px solid #e5e5e5; border-radius:3px; font-size:14px; line-height:1.6;">${requirement}</div>`
            : ""
        }
      </div>

      <div style="padding:16px 28px; background:#1a1a1a; font-size:12px; color:#666; text-align:center;">
        Submitted via ACS Website · Accurate Cutting Systems, Pune
      </div>
    </div>
  `;

  /* ── Guard: catch missing env var before it becomes an opaque crash ── */
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set in environment variables.");
    return { status: "error", message: "Server configuration error. Please contact us directly at sales@acs.co.in" };
  }

  const resend = new Resend(apiKey);

  /* ── 1. SEND TO SALES CRM (Randar OS) ── */
  // Only attempt CRM sync when a real API URL is configured (skipped on Vercel if not set)
  const crmBaseUrl = process.env.CRM_API_URL;
  if (crmBaseUrl) {
    try {
      let mappedMachineType = "MANUAL";
      if (machineType === "Automatic") mappedMachineType = "AUTOMATIC";
      if (machineType === "Semi Automatic") mappedMachineType = "SEMI_AUTOMATIC";

      const crmPayload = {
        client_name: `${name} (${company})`,
        phone_number: phone,
        job_material: materialType.join(", "),
        job_dimension: `${materialSize.join(", ")} | W:${materialWidth || 0} H:${materialHeight || 0} L:${materialLength || 0}`,
        machine_type: mappedMachineType,
        quantity: parseInt(quantity) || 1,
      };

      const crmResponse = await fetch(`${crmBaseUrl}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(crmPayload),
      });

      if (!crmResponse.ok) {
        console.error("CRM Sync Warning: Server returned", crmResponse.status);
      }
    } catch (crmError) {
      // Non-fatal: if the CRM is down, the email backup still goes through
      console.error("CRM Sync Error:", crmError);
    }
  } else {
    console.warn("CRM_API_URL not set — skipping CRM sync. Set this env var to enable it.");
  }

  /* ── 2. SEND VIA RESEND (Email) ── */
  // NOTE: onboarding@resend.dev only works when sending TO your own verified email.
  // If acs.co.in domain is verified in Resend, switch `from` to: "ACS Quote Form <noreply@acs.co.in>"
  // Until then, keep `to` as your verified personal email.
  try {
    await resend.emails.send({
      from: "ACS Quote Form <onboarding@resend.dev>",
      to: "sales@acs.co.in",
      replyTo: email,
      subject: `[ACS Enquiry] ${name} — ${company} | ${bandsawType}`,
      html,
    });

    return { status: "success", message: "Your enquiry has been sent. Our engineering team will respond within 24 hours." };
  } catch (err) {
    console.error("Mail send failed:", err);
    return { status: "error", message: "Failed to send your enquiry. Please try again or contact us directly." };
  }
}