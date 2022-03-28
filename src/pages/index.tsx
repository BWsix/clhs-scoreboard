import { Anchor, Center, Text } from "@mantine/core";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MyAppShell } from "src/components/MyAppShell";
import { trpc } from "src/utils/trpc";

const Home: NextPage = () => {
  const router = useRouter();

  const keepLoggedInMutation = trpc.useMutation("refresh", {
    onError: (error: any) => {
      if (error?.message === "sessionError") {
        router.push("/login");
        return;
      }
    },
  });

  useEffect(() => {
    keepLoggedInMutation.mutate();
  }, []);

  if (!keepLoggedInMutation.isSuccess)
    return (
      <Center style={{ width: "100vw", height: "100vh" }}>
        <div>
          <Text align="center">正在登入... </Text>
          <Anchor
            component="button"
            align="center"
            color="gray"
            onClick={() => {
              keepLoggedInMutation.mutate();
            }}
          >
            (卡住了嗎? 點我重試)
          </Anchor>
        </div>
      </Center>
    );

  return <MyAppShell />;
};

export default Home;
