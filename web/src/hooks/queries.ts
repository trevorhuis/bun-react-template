import { useQuery } from "@tanstack/react-query";
import { GET } from "../api/utils";

export const useProtected = () => {
  return useQuery({
    queryKey: ["protected"],
    queryFn: () => GET("/api/protected"),
    retry: false,
  });
};
