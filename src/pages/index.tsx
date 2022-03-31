import { Center, Text } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MyAppShell } from "src/components/MyAppShell";
import { ErrorFallback } from "src/components/Shared/ErrorFallback";
import { LoaderText } from "src/components/Shared/LoaderText";
import { useLogout } from "src/hooks/useLogout";
import { trpc } from "src/utils/trpc";

const Home: NextPage = () => {
  const toggleLogout = useLogout();
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
        <Text align="center">
          <LoaderText text="正在檢查登入狀態" />
        </Text>
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
