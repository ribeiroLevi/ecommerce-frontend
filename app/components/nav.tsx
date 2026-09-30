"use client";

import { usePathname, useRouter } from "next/navigation";
import { Disc3, ShoppingCartIcon, UserRound, LogOut } from "lucide-react";

import Button from "../components/button";
import { useCart } from "../context/CardContext";
import { useAuth } from "../context/AuthContext";

interface NavProps {
  empty?: boolean;
}

export default function Nav({ empty = false }: NavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { cartCount } = useCart();
  const { user, loading, logout } = useAuth();

  const isStore = pathname === "/";
  const isCart = pathname === "/cart";
  const isPurchases = pathname === "/purchases";
  const isProfile = pathname === "/profile";
  const isAdminHome = pathname === "/";

  const variant = !user ? "guest" : user.adm ? "admin" : "user";

  return (
    <nav className="bg-orange-50 h-20 border-b-3 border-stone-300 flex justify-between items-center px-8">
      <button
        type="button"
        onClick={() => router.push("/")}
        className="flex flex-row gap-1 items-center cursor-pointer"
      >
        <Disc3 className="text-amber-950" />

        <p className="text-amber-950 text-xl font-bold">
          LADO A{variant === "admin" && " - ADMIN"}
        </p>
      </button>

      {!empty && !loading && (
        <>
          {variant === "guest" && (
            <div className="flex gap-5 items-center">
              <Button
                title="Loja"
                variant={isStore ? "secondary" : "ghost"}
                onClick={() => router.push("/")}
              />

              <Button
                title="Carrinho"
                variant={isCart ? "secondary" : "ghost"}
                icon={<ShoppingCartIcon className="w-5 h-5 text-[#5C2303]" />}
                badge={cartCount}
                onClick={() => router.push("/cart")}
              />

              <Button
                title="Entrar"
                variant="primary"
                icon={<UserRound className="w-5 h-5 text-white" />}
                onClick={() => router.push("/login")}
              />
            </div>
          )}

          {variant === "user" && (
            <div className="flex gap-5 items-center">
              <Button
                title="Loja"
                variant={isStore ? "secondary" : "ghost"}
                onClick={() => router.push("/")}
              />

              <Button
                title="Carrinho"
                variant={isCart ? "secondary" : "ghost"}
                icon={<ShoppingCartIcon className="w-5 h-5 text-[#5C2303]" />}
                badge={cartCount}
                onClick={() => router.push("/cart")}
              />

              <Button
                title="Minhas compras"
                variant={isPurchases ? "secondary" : "ghost"}
                onClick={() => router.push("/purchases")}
              />

              <Button
                title="Meus dados"
                variant={isProfile ? "secondary" : "ghost"}
                onClick={() => router.push("/profile")}
              />

              <Button
                title="Sair"
                variant="ghost"
                icon={<LogOut className="w-4 h-4 text-[#5C2303]" />}
              />
            </div>
          )}

          {variant === "admin" && (
            <div className="flex gap-5 items-center">
              <Button
                title="Início"
                variant={isAdminHome ? "secondary" : "ghost"}
                onClick={() => router.push("/")}
              />

              <Button
                title="Meus dados"
                variant={isProfile ? "secondary" : "ghost"}
                onClick={() => router.push("/profile")}
              />

              <Button title="Exportar relatórios" variant="primary" />

              <Button
                title="Sair"
                variant="ghost"
                icon={<LogOut className="w-4 h-4 text-[#5C2303]" />}
                onClick={async () => {
                  await logout();
                  router.push("/");
                }}
              />
            </div>
          )}
        </>
      )}
    </nav>
  );
}
