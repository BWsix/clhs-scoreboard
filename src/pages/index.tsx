import { Center, Loader } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import ms from "ms";
import type { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MyAppShell } from "src/components/MyAppShell";
import { Credentials } from "src/pages/login";
import { trpc } from "src/utils/trpc";

const Home: NextPage = () => {
  const router = useRouter();

  const [cred, setCred] = useLocalStorage<Credentials>({ key: "cred" });
  const sessionMutation = trpc.useMutation("session");

  useEffect(() => {
    if (!cred?.id || !cred?.password) {
      router.push("/login");
      return;
    }

    if (Date.now() - cred.updatedAt < ms("10m")) {
      sessionMutation.data = {
        error: false,
        message: "",
        userName: cred.userName,
        cookie: cred.session,
      };

      return;
    }

    sessionMutation.mutate({ id: cred.id, password: cred.password });
  }, []);

  useEffect(() => {
    if (!sessionMutation.data?.cookie) {
      return;
    }

    setCred({
      ...cred,
      session: sessionMutation.data.cookie,
      updatedAt: Date.now(),
    });
  }, [sessionMutation.data]);

  if (sessionMutation.data?.error) {
    return <Error statusCode={500} title={sessionMutation.data.message} />;
  }

  if (!cred?.session)
    return (
      <Center style={{ width: "100vw", height: "100vh" }}>
        <Loader />
      </Center>
    );

  return <MyAppShell session={cred.session} />;
};

export default Home;
