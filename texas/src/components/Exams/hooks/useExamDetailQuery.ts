import { useQueryAuthErrorHandler } from "src/components/hooks/useQueryAuthErrorHandler";
import { event } from "src/utils/gtag";
import { trpc } from "src/utils/trpc";

export const useExamDetailQuery = (url: string | undefined) => {
  const onError = useQueryAuthErrorHandler();

  return trpc.useQuery(["exam.detail", { url: url || "" }], {
    enabled: !!url,
    onSuccess: () => {
      event({ action: "exam.detail" });
    },
    onError,
  });
};
