import { event } from "src/utils/gtag";
import { trpc } from "src/utils/trpc";
import { useLogout } from "./useLogout";

export const useTestDetailQuery = (url: string | undefined) => {
  const toggleLogout = useLogout();

  const testDetailQuery = trpc.useQuery(["testDetail", { url: url || "" }], {
    enabled: !!url,
    onSuccess: (data) => {
      event({
        action: "testDetailQuery",
        category: "system",
        label: JSON.stringify(data),
      });
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        return toggleLogout();
      }
    },
  });

  return testDetailQuery;
};
