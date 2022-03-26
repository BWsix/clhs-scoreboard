import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "src/utils/trpc";

export interface Credentials {
  id: string;
  password: string;
  session: string;
  userName: string;
  updatedAt: number;
}

const Login: NextPage = () => {
  const router = useRouter();

  const [cred, setCred] = useLocalStorage<Credentials>({
    key: "cred",
  });

  const form = useForm({
    initialValues: {
      id: cred?.id || "",
      password: cred?.password || "",
    },
  });

  const session = trpc.useMutation("session");
  useEffect(() => {
    if (!session.data) {
      return;
    }
    if (session.data?.error) {
      form.setFieldError("password", session.data.message);

      return;
    }
    if (!session.data?.cookie) {
      form.setFieldError("password", "Unexpected Error Occurred.");

      return;
    }

    setCred({
      id: form.values.id,
      password: form.values.password,
      session: session.data.cookie,
      userName: session.data.userName,
      updatedAt: Date.now(),
    });

    router.push("/");
  }, [session.data]);

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto" pt="md" px="sm">
      <form
        onSubmit={form.onSubmit(() => {
          console.log(form.values);

          session.mutate(form.values);
        })}
      >
        <Title order={3}>登入壢中成績查詢2.0</Title>

        <div style={{ position: "relative" }}>
          <LoadingOverlay visible={session.isLoading} />

          <TextInput
            required
            label="學號"
            placeholder="420420"
            mt="md"
            {...form.getInputProps("id")}
          />

          <PasswordInput
            required
            label="身分證字號 (開頭字母大寫)"
            placeholder="A123456789"
            mt="md"
            {...form.getInputProps("password")}
          />
        </div>

        <Group position="right" mt="md">
          <Button type="submit" fullWidth>
            登入
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Login;
