-- Bookings table for Razorpay checkout
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  type TEXT NOT NULL CHECK (type IN ('astrology','tarot')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  -- astrology fields
  gender TEXT,
  dob DATE,
  birth_time TEXT,
  birth_place TEXT,
  current_residence TEXT,
  -- tarot fields
  contact_handle TEXT,
  -- cart + pricing
  items JSONB NOT NULL,
  promo_code TEXT,
  amount_inr INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  -- razorpay
  razorpay_order_id TEXT UNIQUE,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created','paid','failed'))
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Public can insert their own booking (anonymous checkout)
CREATE POLICY "Anyone can create a booking"
ON public.bookings FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No public read/update/delete — only service role (edge functions) can read/update.

CREATE INDEX idx_bookings_order ON public.bookings(razorpay_order_id);
CREATE INDEX idx_bookings_email ON public.bookings(email);
