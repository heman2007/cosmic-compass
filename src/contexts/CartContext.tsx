import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  parentName?: string;
  price: string;
  type: "astrology" | "tarot";
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoApplied: boolean;
  applyPromo: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const VALID_PROMOS: Record<string, number> = {
  STARS10: 10,
  INTUITIVE20: 20,
  FIRSTREAD: 15,
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode("");
    setPromoApplied(false);
  };

  const applyPromo = () => {
    if (VALID_PROMOS[promoCode.toUpperCase()]) {
      setPromoApplied(true);
    }
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, promoCode, setPromoCode, promoApplied, applyPromo }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export { VALID_PROMOS };
