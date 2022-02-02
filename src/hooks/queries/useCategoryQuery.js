import { useQuery } from "react-query";
import { QueryService } from "../../lib/QueryService";
import API_ENDPOINTS from "../../utils/endpoints";

const categoryQueryServices = new QueryService(API_ENDPOINTS.CATEGORIES);

export const fetchCategories = async () => {
  const { data } = await categoryQueryServices.findAll();
  return data;
};

export const useCategoryQuery = () => {
  return useQuery(API_ENDPOINTS.CATEGORIES, fetchCategories);
};
