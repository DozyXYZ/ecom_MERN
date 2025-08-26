import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import type { IProduct } from "../types/Product";

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => (await apiClient.get<IProduct[]>(`api/products`)).data,
  });
