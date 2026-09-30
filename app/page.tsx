"use client";

import { useEffect, useState } from "react";
import { Loader2, Search, Funnel } from "lucide-react";
import Nav from "./components/nav";
import ProductCard from "./components/disccard";
import { fetchDiscs, Product } from "./services/api";
import { useCart } from "./context/CardContext";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchDiscs();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#FFF9F2] p-6 md:p-12 text-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <header className="flex flex-col gap-1 border-stone-200 pb-4">
            <h1 className="text-5xl font-extrabold text-amber-950">Discos</h1>
            <p className="text-md text-stone-500">
              {products.length} produtos encontrados
            </p>
          </header>

          <section className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full bg-[#FAF3EA] border border-stone-300/60 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-stone-500 transition-colors"
              />
            </div>

            <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FAF3EA] border border-stone-300/60 rounded-lg text-sm text-stone-700 font-medium hover:bg-stone-200/50 transition-colors cursor-pointer">
              <Funnel className="w-4 h-4 text-stone-600" />
              Todas as categorias
            </button>
          </section>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-stone-500 gap-2">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Carregando discos...</span>
            </div>
          ) : (
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </section>
          )}
        </div>
      </main>
    </>
  );
}
