import { useQueryAuthErrorHandler } from "src/components/hooks/useQueryAuthErrorHandler";
import { event } from "src/utils/gtag";
import { trpc } from "src/utils/trpc";

export const useExamDetailQuery = (url: string | undefined) => {
  const onError = useQueryAuthErrorHandler();

  const examDetailQuery = trpc.useQuery(["exam.detail", { url: url || "" }], {
    enabled: !!url,
    onSuccess: (data) => {
      event({
        action: "examDetailQuery",
        category: "system",
        label: JSON.stringify(data),
      });
    },
    onError,
  });

  return examDetailQuery;
};
