import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { listProducts } from "@/lib/catalog.functions";
import { fromRow, type Product } from "@/lib/products";

export const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: () => listProducts(),
  staleTime: 60_000,
});

export function useProducts(): Product[] {
  const { data } = useSuspenseQuery(productsQuery);
  return data.map(fromRow);
}
