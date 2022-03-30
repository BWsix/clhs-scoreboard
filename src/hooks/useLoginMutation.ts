import { useRouter } from "next/router";
import { event } from "src/utils/gtag";
import { trpc } from "src/utils/trpc";
import { useUsername } from "./useUserName";

export const useLoginMutation = () => {
  const router = useRouter();
  const { updateUserName } = useUsername();

  const loginMutation = trpc.useMutation("login", {
    onSuccess: (data) => {
      event({ action: "login", category: "system" });

      updateUserName(data.name);
      router.push("/");
    },
  });

  return loginMutation;
};
