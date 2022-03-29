import { useToggle } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "src/utils/trpc";
import { useUsername } from "./useUserName";

export const useLogout = () => {
  const [isLogout, toggleLogout] = useToggle(false, [false, true]);
  const router = useRouter();
  const logoutMutation = trpc.useMutation("logout", { retry: false });
  const { deleteUserName } = useUsername();

  useEffect(() => {
    if (!isLogout) return;

    logoutMutation.mutateAsync().then(() => {
      deleteUserName();
      router.push("/login");
    });
  }, [isLogout]);

  return toggleLogout;
};
