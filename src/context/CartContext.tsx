import { createContext, useState, ReactNode } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  type: "service" | "design";
  service: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {

    setCart(prev => {

      // Replace design if same service
      if (item.type === "design") {

        const filtered = prev.filter(
          i => !(i.type === "design" && i.service === item.service)
        );

        return [...filtered, item];
      }

      // Prevent duplicate service
      if (item.type === "service") {

        const exists = prev.find(
          i => i.type === "service" && i.service === item.service
        );

        if (exists) return prev;

        return [...prev, item];
      }

      return [...prev, item];

    });

  };

  const removeFromCart = (id: number) => {

    setCart(prev => prev.filter(item => item.id !== id));

  };

  const clearCart = () => {

    setCart([]);

  };

  return (

    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>

  );

};