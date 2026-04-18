import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, X, ShoppingBag, Tag, CheckCircle, Loader2 } from "lucide-react";
import { useCart, VALID_PROMOS } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  const { items, removeItem, clearCart, promoCode, setPromoCode, promoApplied, applyPromo } = useCart();
  const location = useLocation();
  const cartType = items.length > 0 ? items[0].type : (location.state?.type || "astrology");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [currentResidence, setCurrentResidence] = useState("");
  const [contactHandle, setContactHandle] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const discount = promoApplied ? (VALID_PROMOS[promoCode.toUpperCase()] || 0) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-booking-request", {
        body: {
          type: cartType,
          name,
          email,
          message,
          gender,
          dob,
          birthTime,
          birthPlace,
          currentResidence,
          contactHandle,
          items,
          promoCode: promoApplied ? promoCode : undefined,
          discountPercent: discount,
        },
      });

      if (error || !data?.ok) {
        throw new Error(error?.message || "Could not send booking request");
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast({ title: "Something went wrong", description: String(err), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };


  if (submitted) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="font-heading text-4xl font-light text-foreground mb-4">Booking Received</h1>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Thank you, <span className="text-primary">{name}</span>. Your booking request has been sent. You'll receive payment instructions and next steps at <span className="text-primary">{email}</span> shortly.
          </p>
          <Link
            to="/"
            onClick={() => clearCart()}
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-background min-h-screen">
      {/* Header */}
      <div className="border-b border-border/20 px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            to={cartType === "tarot" ? "/tarot" : "/astrology"}
            className="flex items-center gap-2 font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span className="font-body text-sm text-foreground">{items.length} item{items.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-4xl md:text-5xl font-light text-foreground mb-10"
        >
          Your <span className="italic text-primary">Cart</span>
        </motion.h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="font-body text-muted-foreground">Your cart is empty.</p>
            <Link to="/" className="font-body text-sm text-primary mt-4 inline-block hover:underline">
              Browse services →
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start justify-between gap-3 p-4 rounded-xl border border-border/20 bg-card/30"
                >
                  <div className="min-w-0">
                    {item.parentName && (
                      <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 block mb-1">
                        {item.parentName}
                      </span>
                    )}
                    <h4 className="font-heading text-lg font-light text-foreground truncate">{item.name}</h4>
                    <span className="font-body text-xs text-primary">{item.price}</span>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="shrink-0 w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}

              {/* Promo Code */}
              <div className="p-4 rounded-xl border border-border/20 bg-card/30">
                <label className="font-body text-xs tracking-widest uppercase text-muted-foreground/60 flex items-center gap-2 mb-3">
                  <Tag className="w-3 h-3" /> Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    disabled={promoApplied}
                    className="flex-1 bg-secondary/50 border border-border/20 rounded-lg px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40"
                  />
                  <button
                    onClick={applyPromo}
                    disabled={promoApplied || !promoCode}
                    className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg font-body text-xs tracking-widest uppercase text-primary hover:bg-primary/20 transition-colors disabled:opacity-40"
                  >
                    {promoApplied ? "Applied" : "Apply"}
                  </button>
                </div>
                {promoApplied && (
                  <p className="font-body text-xs text-primary mt-2">🎉 {discount}% discount applied!</p>
                )}
                {promoCode && !promoApplied && (
                  <p className="font-body text-[10px] text-muted-foreground/50 mt-2">Try: STARS10, INTUITIVE20, FIRSTREAD</p>
                )}
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
              <h3 className="font-heading text-2xl font-light text-foreground mb-2">Your Details</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-xs text-muted-foreground/60 tracking-wide uppercase block mb-1">Name *</label>
                  <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-secondary/50 border border-border/20 rounded-lg px-3 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40" />
                </div>
                <div>
                  <label className="font-body text-xs text-muted-foreground/60 tracking-wide uppercase block mb-1">Email *</label>
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-secondary/50 border border-border/20 rounded-lg px-3 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40" />
                </div>
              </div>

              {cartType === "astrology" && (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs text-muted-foreground/60 tracking-wide uppercase block mb-1">Gender *</label>
                      <select required value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-secondary/50 border border-border/20 rounded-lg px-3 py-2.5 font-body text-sm text-foreground focus:outline-none focus:border-primary/40">
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="prefer-not">Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-body text-xs text-muted-foreground/60 tracking-wide uppercase block mb-1">Date of Birth *</label>
                      <input required type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full bg-secondary/50 border border-border/20 rounded-lg px-3 py-2.5 font-body text-sm text-foreground focus:outline-none focus:border-primary/40" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-body text-xs text-muted-foreground/60 tracking-wide uppercase block mb-1">Time of Birth *</label>
                      <input required type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} className="w-full bg-secondary/50 border border-border/20 rounded-lg px-3 py-2.5 font-body text-sm text-foreground focus:outline-none focus:border-primary/40" />
                    </div>
                    <div>
                      <label className="font-body text-xs text-muted-foreground/60 tracking-wide uppercase block mb-1">Place of Birth *</label>
                      <input required value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} placeholder="City, Country" className="w-full bg-secondary/50 border border-border/20 rounded-lg px-3 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40" />
                    </div>
                    <div>
                      <label className="font-body text-xs text-muted-foreground/60 tracking-wide uppercase block mb-1">Current Residence *</label>
                      <input required value={currentResidence} onChange={(e) => setCurrentResidence(e.target.value)} placeholder="City, Country" className="w-full bg-secondary/50 border border-border/20 rounded-lg px-3 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40" />
                    </div>
                  </div>
                </>
              )}

              {cartType === "tarot" && (
                <div>
                  <label className="font-body text-xs text-muted-foreground/60 tracking-wide uppercase block mb-1">WhatsApp / Instagram Username *</label>
                  <input required value={contactHandle} onChange={(e) => setContactHandle(e.target.value)} placeholder="@username or phone number" className="w-full bg-secondary/50 border border-border/20 rounded-lg px-3 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40" />
                </div>
              )}

              <div>
                <label className="font-body text-xs text-muted-foreground/60 tracking-wide uppercase block mb-1">
                  Message / Backstory <span className="text-muted-foreground/30">(optional)</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Share any context or specific questions you have..."
                  className="w-full bg-secondary/50 border border-border/20 rounded-lg px-3 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send Booking Request"}
              </button>

              <p className="font-body text-[10px] text-muted-foreground/40 text-center">
                Your request will be sent to our team. We'll reply with payment instructions and next steps.
              </p>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
