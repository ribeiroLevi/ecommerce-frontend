import { Product } from "./api";

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_KEY = "lado-a-cart";
const CART_EVENT = "cart-updated";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const cart = localStorage.getItem(CART_KEY);

  if (!cart) {
    return [];
  }

  return JSON.parse(cart);
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  window.dispatchEvent(new Event(CART_EVENT));
}

export function addToCart(product: Product) {
  const cart = getCart();

  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    if (existingItem.quantity >= product.quantity) {
      return;
    }

    existingItem.quantity += 1;
  } else {
    if (product.quantity <= 0) {
      return;
    }

    cart.push({
      product,
      quantity: 1,
    });
  }

  saveCart(cart);
}

export function increaseQuantity(productId: string) {
  const cart = getCart();

  const item = cart.find((item) => item.product.id === productId);

  if (!item) {
    return;
  }

  if (item.quantity >= item.product.quantity) {
    return;
  }

  item.quantity += 1;

  saveCart(cart);
}

export function decreaseQuantity(productId: string) {
  const cart = getCart();

  const item = cart.find((item) => item.product.id === productId);

  if (!item) {
    return;
  }

  if (item.quantity <= 1) {
    return;
  }

  item.quantity -= 1;

  saveCart(cart);
}

export function removeFromCart(productId: string) {
  const cart = getCart();

  const updatedCart = cart.filter((item) => item.product.id !== productId);

  saveCart(updatedCart);
}

export function clearCart() {
  saveCart([]);
}

export function subscribeToCart(callback: () => void) {
  window.addEventListener(CART_EVENT, callback);

  return () => {
    window.removeEventListener(CART_EVENT, callback);
  };
}

export function getCartSnapshot() {
  return localStorage.getItem(CART_KEY) ?? "[]";
}

export function getCartServerSnapshot() {
  return "[]";
}
