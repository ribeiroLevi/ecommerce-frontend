import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import Button from "../components/button";
import { getImageUrl, Product } from "../services/api";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(product.price));

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full aspect-square rounded-2xl bg-[#E2B12C] p-6 flex items-center justify-center overflow-hidden">
        {product.categories && (
          <span className="absolute top-4 left-4 bg-white/90 text-stone-800 text-xs font-bold px-3 py-1 rounded-full uppercase shadow-xs">
            {product.categories.name}
          </span>
        )}

        <div className="relative w-11/12 h-11/12 overflow-hidden">
          {product.picture ? (
            <Image
              src={getImageUrl(product.picture)}
              alt={product.name}
              fill
              unoptimized
              loading="eager"
              className="object-contain size-10"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">
              Sem Imagem
            </div>
          )}
        </div>
      </div>

      <div className=" flex flex-col gap-1 ">
        <h3 className="font-bold text-stone-900 text-xl leading-tight line-clamp-2 uppercase">
          {product.name}
        </h3>
        <span className="text-md text-stone-500 font-medium">
          {product.quantity} em estoque
        </span>
      </div>
      <div>
        <div className="flex items-center justify-between border- mt-auto pt-2">
          <span className="text-2xl font-bold text-stone-900">
            {formattedPrice}
          </span>

          <Button
            title="Adicionar"
            variant="primary"
            icon={<ShoppingCart className="w-6 h-6" />}
            onClick={() => onAddToCart?.(product)}
            className="text-md px-4 py-2"
          />
        </div>
      </div>
    </div>
  );
}
