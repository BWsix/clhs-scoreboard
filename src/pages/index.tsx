import { Center, Text } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { MyAppShell } from "src/components/MyAppShell";
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
    interval.start();

    return interval.stop;
  }, []);

  const [ticks, setTicks] = useState(0);
  const interval = useInterval(() => setTicks((s) => s + 1), 500);

  if (!meMutation.isSuccess) {
    return (
      <Center style={{ width: "100vw", height: "100vh" }}>
        <Text align="center">正在檢查登入狀態{".".repeat(ticks % 4)}</Text>
      </Center>
    );
  }

  return <MyAppShell />;
};

export default Home;
