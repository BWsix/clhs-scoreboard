import { useRouter } from "next/router";
import { useUsername } from "src/components/hooks/useUserName";
import { event } from "src/utils/gtag";
import { trpc } from "src/utils/trpc";

export const useLoginMutation = (redirectTo?: string) => {
  const router = useRouter();
  const { updateUserName } = useUsername();

  const loginMutation = trpc.useMutation("login", {
    onSuccess: (data) => {
      event({ action: "login", category: "system" });

      updateUserName(data.name);
      router.push(redirectTo || "/exams");
    },
  });

  return loginMutation;
};
