import { event } from "src/utils/gtag";
import { trpc } from "src/utils/trpc";
import { useLogout } from "./useLogout";

export const useTestDetailQuery = (url: string | undefined) => {
  const toggleLogout = useLogout();

  const testDetailQuery = trpc.useQuery(["testDetail", { url: url || "" }], {
    enabled: !!url,
    onSuccess: () => {
      event({ action: "testDetailQuery", category: "system" });
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        return toggleLogout();
      }
    },
  });

  return testDetailQuery;
};
