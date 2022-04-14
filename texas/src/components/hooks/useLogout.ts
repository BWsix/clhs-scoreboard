import { useToggle } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { event } from "src/utils/gtag";
import { trpc } from "src/utils/trpc";

export const useLogout = (toHamePage?: boolean) => {
  const [isLogout, toggleLogout] = useToggle(false, [false, true]);
  const router = useRouter();
  const logoutMutation = trpc.useMutation("logout", { retry: false });
  const deleteUserName = () => localStorage.removeItem("sb-username");

  useEffect(() => {
    if (!isLogout) return;

    logoutMutation.mutateAsync().then(() => {
      event({ action: "logout", category: "system" });

      deleteUserName();
      if (toHamePage) {
        router.push("/");
      } else {
        router.push(`/login?redirectTo=${router.pathname}`);
      }
    });
  }, [isLogout]);

  return toggleLogout;
};
