import { useRouter } from "next/router";
import { event } from "src/utils/gtag";
import { trpc } from "src/utils/trpc";

export const useLoginMutation = (redirectTo?: string) => {
  const router = useRouter();
  const updateUserName = (name: string) =>
    localStorage.setItem("sb-username", name);

  const loginMutation = trpc.useMutation("auth.login", {
    onSuccess: (data) => {
      event({ action: "auth.login", category: "system" });

      updateUserName(data.name);
      router.push(redirectTo || "/exams");
    },
  });

  return loginMutation;
};
