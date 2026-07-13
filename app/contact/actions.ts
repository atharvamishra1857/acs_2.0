"use server";

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
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error("WEB3FORMS_ACCESS_KEY is not set in environment variables.");
    return { status: "error", message: "Server configuration error. Please contact us directly at sales@acs.co.in" };
  }

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

  /* ── 2. SEND VIA WEB3FORMS (Email) ──
     Web3Forms accepts a plain JSON POST — no SDK, no domain verification
     needed on their side. We keep your existing branded HTML template as
     the message body and let Web3Forms handle delivery + spam filtering. */
  try {
    const web3formsRes = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Node's default fetch sends a bare/missing User-Agent, which Cloudflare
        // (sitting in front of api.web3forms.com) can flag as bot traffic and
        // respond with a "Just a moment..." challenge page instead of the API.
        // A normal browser-like UA avoids that.
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[ACS Enquiry] ${name} — ${company} | ${bandsawType}`,
        from_name: "ACS Quote Form",
        replyto: email,
        // Web3Forms renders this as the email body when `html` styling isn't parsed by
        // their default template — we pass our own full HTML via the "message" field.
        message: html,
      }),
    });

    // TEMP (testing): read as text first — if Web3Forms (or something in between,
    // like a proxy/firewall) returns an HTML error page instead of JSON, .json()
    // would crash with an unhelpful "Unexpected token '<'" error. This way we log
    // the actual raw response so we can see what really came back.
    const rawBody = await web3formsRes.text();
    let web3formsData: { success?: boolean; message?: string };
    try {
      web3formsData = JSON.parse(rawBody);
    } catch {
      console.error("Web3Forms returned a non-JSON response:", {
        status: web3formsRes.status,
        statusText: web3formsRes.statusText,
        bodyPreview: rawBody.slice(0, 300),
      });
      throw new Error(
        `Web3Forms request failed (status ${web3formsRes.status}). The response wasn't JSON — likely a network/DNS/firewall issue reaching api.web3forms.com, not a form rejection.`
      );
    }

    if (!web3formsRes.ok || !web3formsData.success) {
      // TEMP (testing): logs the actual reason Web3Forms rejected the request —
      // e.g. invalid access key, unverified key, or bad payload. Check your
      // server/terminal logs (or Vercel function logs) after a failed submit.
      console.error("Web3Forms rejected submission:", {
        status: web3formsRes.status,
        response: web3formsData,
      });
      throw new Error(web3formsData.message || "Web3Forms rejected the submission.");
    }

    return { status: "success", message: "Your enquiry has been sent. Our engineering team will respond within 24 hours." };
  } catch (err) {
    console.error("Mail send failed:", err);
    return { status: "error", message: "Failed to send your enquiry. Please try again or contact us directly." };
  }
}