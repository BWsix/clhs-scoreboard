import {
  Box,
  Button,
  Center,
  LoadingOverlay,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "src/utils/trpc";

const Login: NextPage = () => {
  const router = useRouter();

  const form = useForm({
    initialValues: { id: "", password: "" },
  });

  const loginMutation = trpc.useMutation("login", {
    onSuccess: () => {
      router.push("/");
    },
  });

  return (
    <Center style={{ height: "100vh", width: "100vw" }}>
      <Box sx={{ maxWidth: 300 }}>
        <form
          onSubmit={form.onSubmit(() => {
            loginMutation.mutate(form.values);
          })}
        >
          <Title order={3}>登入CLHS Scoreboard</Title>

          <div style={{ position: "relative" }}>
            <LoadingOverlay visible={loginMutation.isLoading} />

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

            <Button type="submit" mt="md" fullWidth>
              登入
            </Button>
          </div>

          <Text color="red" mt="md">
            {loginMutation.error?.message || ""}
          </Text>
        </form>
      </Box>
    </Center>
  );
};

export default Login;
