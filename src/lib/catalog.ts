import { queryOptions } from "@tanstack/react-query";
import { products, type Product } from "@/lib/products";

export const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: async () => products,
  staleTime: Infinity,
});

export function useProducts(): Product[] {
  return products;
}
