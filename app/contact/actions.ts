"use server";

export type FormState = {
  status: "idle" | "success" | "error" | "ready";
  message: string;
  emailPayload?: {
    subject: string;
    replyto: string;
    html: string;
  };
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

  /* ── 2. HAND OFF TO CLIENT FOR EMAIL DELIVERY ──
     Web3Forms sits behind Cloudflare, which challenges/blocks server-to-server
     requests (Node's fetch has a TLS fingerprint Cloudflare treats as bot
     traffic, regardless of headers/IP — confirmed happening identically on
     Vercel's IPs, not just local). Web3Forms' access key is designed to be
     public/client-safe for exactly this reason, so we validate + sync the CRM
     here on the server, then hand the composed email back to the browser to
     actually deliver it — a real browser's TLS fingerprint isn't challenged. */
  return {
    status: "ready",
    message: "",
    emailPayload: {
      subject: `[ACS Enquiry] ${name} — ${company} | ${bandsawType}`,
      replyto: email,
      html,
    },
  };
}