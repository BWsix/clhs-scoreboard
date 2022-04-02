import { useLogout } from "src/hooks/useLogout";

export const useQueryAuthErrorHandler = () => {
  const toggleLogout = useLogout();

  return (error: any) => {
    if (error.data?.code === "UNAUTHORIZED") {
      return toggleLogout();
    }
  };
};
