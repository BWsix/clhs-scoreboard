import { useQueryAuthErrorHandler } from "src/components/hooks/useQueryAuthErrorHandler";
import { event } from "src/utils/gtag";
import { trpc } from "src/utils/trpc";

export const useExamMetaQuery = (onSuccess: () => void) => {
  const onError = useQueryAuthErrorHandler();

  return trpc.useQuery(["exam.meta"], {
    onSuccess: () => {
      onSuccess();
      event({ action: "exam.meta" });
    },
    onError,
  });
};
