import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const usePreviousPage = () => {
  const router = useRouter();

  const [previousPage, setPreviousPage] = useLocalStorage({
    key: "sb-previous-page",
    defaultValue: "/",
  });

  useEffect(() => {
    const path = router.pathname;
    if (!path) return;
    if (path === "/goToPrev") return;

    setPreviousPage(path);
  }, [router.pathname]);

  const goToPrev = () => {
    router.push(previousPage);
  };

  return { goToPrev };
};
