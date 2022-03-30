import { Center, Text } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MyAppShell } from "src/components/MyAppShell";
import { ErrorFallback } from "src/components/Shared/ErrorFallback";
import { useLoaderAnimatedText } from "src/hooks/useLoaderAnimatedText";
import { useLogout } from "src/hooks/useLogout";
import { trpc } from "src/utils/trpc";

const Home: NextPage = () => {
  const toggleLogout = useLogout();
  const loaderText = useLoaderAnimatedText("正在檢查登入狀態");
  const meMutation = trpc.useMutation(["me"], {
    onError: () => {
      return toggleLogout();
    },
  });

  useEffect(() => {
    meMutation.mutate();
  }, []);

  if (!meMutation.isSuccess) {
    return (
      <Center style={{ width: "100vw", height: "100vh" }}>
        <Text align="center">{loaderText}</Text>
      </Center>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <MyAppShell />
    </ErrorBoundary>
  );
};

export default Home;
