// Tipos espelhados do seu Schema Prisma

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  picture: string | null;
  quantity: number;
  category_id: string;
  categories?: Category;
}

export interface SaleProduct {
  sale_id: string;
  product_id: string;
  price: number;
  quantity: number;
  products?: Product;
}

export interface LoginData {
  login: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  login: string;
  adm: boolean;
}

export interface Sale {
  id: string;
  created_at: string;
  user_id: string;
  sale_products: SaleProduct[];
}

export interface AuthUser {
  id: string;
  login: string;
  adm: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export function getImageUrl(picture: string | null): string {
  if (!picture) {
    return "/images/placeholder.jpg";
  }

  return `${API_BASE_URL}${picture}`;
}

export async function fetchDiscs(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/product`);

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos da API");
  }

  return response.json();
}

export async function loginUser(data: LoginData): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Login ou senha inválidos");
    }

    throw new Error("Erro ao realizar login");
  }

  return response.json();
}

export async function getMe(): Promise<AuthUser | null> {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Erro ao verificar sessão");
  }

  return response.json();
}

export async function logout(): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Erro ao encerrar sessão");
  }
}
