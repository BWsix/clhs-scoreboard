import { useLogout } from "./useLogout";

export const useQueryAuthErrorHandler = () => {
  const toggleLogout = useLogout();

  return (error: any) => {
    if (error.data?.code === "UNAUTHORIZED") {
      return toggleLogout();
    }
  };
};
