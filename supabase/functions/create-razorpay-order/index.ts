import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.0";

interface CartItem {
  id: string;
  name: string;
  price: string;
  type: "astrology" | "tarot";
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

// Parse "₹1,500 / $19.99" → 1500 INR
const parseInr = (price: string): number => {
  const m = price.match(/₹\s*([\d,]+)/);
  if (!m) return 0;
  return parseInt(m[1].replace(/,/g, ""), 10);
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const keyId = Deno.env.get("RAZORPAY_KEY_ID");
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!keyId || !keySecret) {
      return new Response(JSON.stringify({ error: "Razorpay keys not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body: Payload = await req.json();
    if (!body.name || !body.email || !body.items?.length) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const subtotalInr = body.items.reduce((sum, i) => sum + parseInr(i.price), 0);
    const discountPct = body.discountPercent ?? 0;
    const totalInr = Math.max(1, Math.round(subtotalInr * (1 - discountPct / 100)));
    const amountPaise = totalInr * 100;

    // Create Razorpay order
    const auth = btoa(`${keyId}:${keySecret}`);
    const rpRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt: `r_${Date.now()}`,
        notes: { email: body.email, type: body.type },
      }),
    });

    const order = await rpRes.json();
    if (!rpRes.ok) {
      console.error("Razorpay order error:", order);
      return new Response(JSON.stringify({ error: "Failed to create order", details: order }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Persist booking with service role
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbErr } = await supabase.from("bookings").insert({
      type: body.type,
      name: body.name,
      email: body.email,
      message: body.message ?? null,
      gender: body.gender ?? null,
      dob: body.dob || null,
      birth_time: body.birthTime ?? null,
      birth_place: body.birthPlace ?? null,
      current_residence: body.currentResidence ?? null,
      contact_handle: body.contactHandle ?? null,
      items: body.items,
      promo_code: body.promoCode ?? null,
      amount_inr: totalInr,
      razorpay_order_id: order.id,
      status: "created",
    });

    if (dbErr) console.error("DB insert error:", dbErr);

    return new Response(
      JSON.stringify({
        orderId: order.id,
        amount: amountPaise,
        currency: "INR",
        keyId,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
