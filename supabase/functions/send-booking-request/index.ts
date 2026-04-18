import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

interface CartItem {
  id: string;
  name: string;
  price: string;
  type: "astrology" | "tarot";
  parentName?: string;
}

interface Payload {
  type: "astrology" | "tarot";
  name: string;
  email: string;
  message?: string;
  gender?: string;
  dob?: string;
  birthTime?: string;
  birthPlace?: string;
  currentResidence?: string;
  contactHandle?: string;
  items: CartItem[];
  promoCode?: string;
  discountPercent?: number;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );

const row = (label: string, value?: string) =>
  value
    ? `<tr><td style="padding:6px 12px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">${escapeHtml(
        label
      )}</td><td style="padding:6px 12px;color:#111;font-size:14px;">${escapeHtml(value)}</td></tr>`
    : "";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body: Payload = await req.json();
    if (!body.name || !body.email || !body.items?.length || !body.type) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const recipient =
      body.type === "tarot"
        ? "thatintuitivereader@gmail.com"
        : "thatintuitivespeaker@gmail.com";

    const brand = body.type === "tarot" ? "That Intuitive Reader" : "That Intuitive Speaker";

    const itemsHtml = body.items
      .map(
        (i) =>
          `<li style="margin-bottom:6px;color:#111;font-size:14px;">${escapeHtml(
            i.name
          )} — <strong>${escapeHtml(i.price)}</strong></li>`
      )
      .join("");

    const promoHtml = body.promoCode
      ? `<p style="margin:8px 0;color:#111;font-size:14px;">Promo: <strong>${escapeHtml(
          body.promoCode
        )}</strong> (${body.discountPercent ?? 0}% off)</p>`
      : "";

    const detailsRows = [
      row("Name", body.name),
      row("Email", body.email),
      row("Gender", body.gender),
      row("Date of Birth", body.dob),
      row("Time of Birth", body.birthTime),
      row("Place of Birth", body.birthPlace),
      row("Current Residence", body.currentResidence),
      row("WhatsApp / Instagram", body.contactHandle),
    ].join("");

    const html = `<!doctype html>
<html><body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:24px;margin:0;">
  <div style="max-width:620px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eee;">
    <div style="background:#0B1120;color:#C5942A;padding:24px;">
      <h1 style="margin:0;font-size:22px;font-weight:300;letter-spacing:0.05em;">New Booking Request</h1>
      <p style="margin:6px 0 0;color:#aaa;font-size:13px;">${escapeHtml(brand)}</p>
    </div>
    <div style="padding:24px;">
      <h2 style="margin:0 0 12px;font-size:16px;color:#111;">Client Details</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">${detailsRows}</table>

      <h2 style="margin:0 0 12px;font-size:16px;color:#111;">Selected Services</h2>
      <ul style="padding-left:20px;margin:0 0 16px;">${itemsHtml}</ul>
      ${promoHtml}

      ${
        body.message
          ? `<h2 style="margin:24px 0 8px;font-size:16px;color:#111;">Message / Backstory</h2>
             <p style="white-space:pre-wrap;color:#333;font-size:14px;line-height:1.6;margin:0;">${escapeHtml(
               body.message
             )}</p>`
          : ""
      }
    </div>
    <div style="padding:16px 24px;background:#fafafa;color:#888;font-size:12px;border-top:1px solid #eee;">
      Reply directly to <a href="mailto:${escapeHtml(body.email)}" style="color:#C5942A;">${escapeHtml(
      body.email
    )}</a> to follow up.
    </div>
  </div>
</body></html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${brand} Bookings <onboarding@resend.dev>`,
        to: [recipient],
        reply_to: body.email,
        subject: `New booking request from ${body.name}`,
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend error:", data);
      return new Response(JSON.stringify({ error: "Failed to send", details: data }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
