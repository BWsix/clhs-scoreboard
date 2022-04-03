import {
  Button,
  LoadingOverlay,
  PasswordInput,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useLoginMutation } from "./useLoginMutation";

export const LoginPageForm = () => {
  const theme = useMantineTheme();

  const loginMutation = useLoginMutation();
  const form = useForm({
    initialValues: { id: "", password: "" },
  });

  return (
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

        <Button type="submit" mt="md" fullWidth variant={theme.other.variant}>
          登入
        </Button>
      </div>

      <Text color="red" mt="md">
        {loginMutation.error?.message || ""}
      </Text>
    </form>
  );
};
