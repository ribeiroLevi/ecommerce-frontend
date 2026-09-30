"use client";

import Image from "next/image";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";

import Nav from "../components/nav";
import { useCart } from "../context/CardContext";
import { getImageUrl } from "../services/api";

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <Nav />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-amber-950 mb-8">Carrinho</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-start">
          {/* PRODUTOS */}
          <section className="flex flex-col gap-3">
            {cart.length === 0 ? (
              <div className="border border-stone-300 rounded-xl p-8 text-center text-stone-500">
                Seu carrinho está vazio.
              </div>
            ) : (
              cart.map((item) => {
                const price = Number(item.product.price);
                const subtotal = price * item.quantity;

                const reachedStockLimit =
                  item.quantity >= item.product.quantity;

                return (
                  <div
                    key={item.product.id}
                    className="border border-stone-400 rounded-xl p-3 flex items-center gap-4"
                  >
                    {/* IMAGEM */}
                    <div className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden bg-amber-400">
                      {item.product.picture ? (
                        <Image
                          src={getImageUrl(item.product.picture)}
                          alt={item.product.name}
                          fill
                          unoptimized
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-stone-500">
                          Sem imagem
                        </div>
                      )}
                    </div>

                    {/* PRODUTO */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-sm font-semibold text-stone-900 truncate">
                        {item.product.name}
                      </h2>

                      <p className="text-sm font-semibold text-amber-800 mt-4">
                        R$ {price.toFixed(2).replace(".", ",")}
                      </p>
                    </div>

                    {/* QUANTIDADE */}
                    <div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.product.id)}
                          disabled={item.quantity <= 1}
                          aria-label={`Diminuir quantidade de ${item.product.name}`}
                          className="w-8 h-8 border border-stone-300 rounded-md flex items-center justify-center text-stone-500 hover:bg-orange-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <Minus size={14} />
                        </button>

                        <p className="text-md text-neutral-800 min-w-4 text-center">
                          {item.quantity}
                        </p>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.product.id)}
                          disabled={reachedStockLimit}
                          aria-label={`Aumentar quantidade de ${item.product.name}`}
                          className="w-8 h-8 border border-stone-300 rounded-md flex items-center justify-center text-stone-700 hover:bg-orange-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {reachedStockLimit && (
                        <p className="text-[10px] text-amber-800 text-center mt-1">
                          Limite do estoque
                        </p>
                      )}
                    </div>

                    {/* SUBTOTAL */}
                    <div className="w-24 text-right">
                      <p className="text-sm font-bold text-stone-900">
                        R$ {subtotal.toFixed(2).replace(".", ",")}
                      </p>

                      <p className="text-xs text-stone-500">subtotal</p>
                    </div>

                    {/* EXCLUIR */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label={`Remover ${item.product.name} do carrinho`}
                      className="text-red-500 hover:text-red-700 cursor-pointer p-2"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                );
              })
            )}
          </section>

          {/* RESUMO */}
          <aside className="border border-stone-400 rounded-xl p-5">
            <h2 className="text-lg font-bold text-stone-800 mb-5">
              Resumo do pedido
            </h2>

            <div className="flex flex-col gap-3 mb-5">
              {cart.map((item) => {
                const subtotal = Number(item.product.price) * item.quantity;

                return (
                  <div
                    key={item.product.id}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span className="font-medium truncate text-stone-800">
                      {item.product.name} × {item.quantity}
                    </span>

                    <span className="text-stone-800 whitespace-nowrap">
                      R$ {subtotal.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                );
              })}
            </div>

            <hr className="border-stone-300" />

            <div className="flex justify-between items-center py-5">
              <span className="font-semibold text-stone-800">Total</span>

              <span className="font-bold text-stone-800">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>

            <button
              type="button"
              disabled={cart.length === 0}
              className="w-full h-12 rounded-full bg-amber-800 text-white text-sm font-medium flex items-center justify-center gap-3 hover:bg-amber-900 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Finalizar compra
              <ArrowRight size={17} />
            </button>

            <p className="text-xs text-stone-400 text-center mt-3">
              Você precisará fazer login
            </p>
          </aside>
        </div>
      </main>
    </div>
  );
}
