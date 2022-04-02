import { useQueryAuthErrorHandler } from "src/components/useQueryAuthErrorHandler";
import { event } from "src/utils/gtag";
import { trpc } from "src/utils/trpc";

export const useTestDetailQuery = (url: string | undefined) => {
  const onError = useQueryAuthErrorHandler();

  const testDetailQuery = trpc.useQuery(["testDetail", { url: url || "" }], {
    enabled: !!url,
    onSuccess: (data) => {
      event({
        action: "testDetailQuery",
        category: "system",
        label: JSON.stringify(data),
      });
    },
    onError,
  });

  return testDetailQuery;
};
