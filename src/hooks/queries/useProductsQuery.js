import { useInfiniteQuery } from "react-query";
import { QueryService } from "../../lib/QueryService";
import API_ENDPOINTS from "../../utils/endpoints";

const productsQueryServices = new QueryService(API_ENDPOINTS.PRODUCTS);

export const fetchProducts = async ({ queryKey, pageParam }) => {
  const params = queryKey[1];
  let fetchedData;
  if (pageParam) {
    fetchedData = await productsQueryServices.get(pageParam);
  } else {
    fetchedData = await productsQueryServices.find(params);
  }
  const { data, links } = fetchedData;

  return { data, links };
};

export const useProductsQuery = params => {
  return useInfiniteQuery([API_ENDPOINTS.PRODUCTS, params], fetchProducts, {
    getNextPageParam: ({ links }) => {
      return links.next ?? undefined;
    },
  });
};
