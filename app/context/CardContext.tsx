"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useSyncExternalStore,
} from "react";

import { Product } from "../services/api";

import {
  addToCart as addToCartStorage,
  increaseQuantity as increaseQuantityStorage,
  decreaseQuantity as decreaseQuantityStorage,
  removeFromCart as removeFromCartStorage,
  clearCart as clearCartStorage,
  getCartSnapshot,
  getCartServerSnapshot,
  subscribeToCart,
  CartItem,
} from "../services/cart";

interface CartContextType {
  cart: CartItem[];
  cartCount: number;

  addToCart: (product: Product) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartSnapshot = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getCartServerSnapshot,
  );

  const cart: CartItem[] = JSON.parse(cartSnapshot);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  function addToCart(product: Product) {
    addToCartStorage(product);
  }

  function increaseQuantity(productId: string) {
    increaseQuantityStorage(productId);
  }

  function decreaseQuantity(productId: string) {
    decreaseQuantityStorage(productId);
  }

  function removeFromCart(productId: string) {
    removeFromCartStorage(productId);
  }

  function clearCart() {
    clearCartStorage();
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }

  return context;
}
