"use server";

export type FormState = {
  status: "idle" | "success" | "error" | "ready";
  message: string;
  emailPayload?: {
    subject: string;
    replyto: string;
    fields: Record<string, string>;
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
     here on the server, then hand the composed fields back to the browser to
     actually deliver it — a real browser's TLS fingerprint isn't challenged.

     NOTE: we send individual fields, not the custom `html` blob above. Web3Forms'
     free-tier template doesn't render custom HTML — it drops it in as literal
     text, which both looks broken to the recipient AND reads as spam-flagged
     garbage to filters (raw unrendered markup tags are a strong spam signal).
     Passing plain key/value fields lets Web3Forms auto-generate its own clean,
     properly rendered table — that's the officially supported usage pattern. */
  return {
    status: "ready",
    message: "",
    emailPayload: {
      subject: `[ACS Enquiry] ${name} — ${company} | ${bandsawType}`,
      replyto: email,
      fields: {
        "Full Name": name,
        Phone: phone,
        "Business Email": email,
        Company: company,
        "Bandsaw Type": bandsawType,
        Quantity: quantity,
        "Machine Type": machineType,
        "Material Shape(s)": materialSize.join(", "),
        "Width (mm)": materialWidth || "—",
        "Height (mm)": materialHeight || "—",
        "Length (mm)": materialLength || "—",
        "Additional Size Info": additionalDimensions || "—",
        "Material Type(s)": materialType.join(", "),
        "Purpose of Enquiry": enquiryPurpose || "Not specified",
        Requirements: requirement || "—",
      },
    },
  };
}