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
import { useRouter } from "next/router";
import { useLoginMutation } from "./hooks/useLoginMutation";

export const LoginPageForm = () => {
  const theme = useMantineTheme();

  const router = useRouter();
  const redirectTo = router.query.redirectTo as string;

  const loginMutation = useLoginMutation(redirectTo);
  const form = useForm({
    initialValues: { id: "", password: "" },
    validationRules: {
      id: (value) => value === "" || /^\d{6}$/.test(value),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(() => {
        loginMutation.mutate(form.values);
      })}
    >
      <Title order={3}>登入壢中Scoreboard</Title>
      <div style={{ position: "relative" }}>
        <LoadingOverlay visible={loginMutation.isLoading} />

        <TextInput
          label="學號"
          placeholder="420420"
          mt="md"
          {...form.getInputProps("id")}
        />

        <PasswordInput
          label="密碼 (預設是身分證字號，開頭字母大寫)"
          placeholder="A123456789"
          mt="md"
          {...form.getInputProps("password")}
        />

        <Button type="submit" mt="md" fullWidth variant={theme.other.variant}>
          {form.values.id === "" && form.values.password === ""
            ? "訪客登入"
            : "登入"}
        </Button>
      </div>

      <Text color="red" mt="md">
        {loginMutation.error?.message || ""}
      </Text>
    </form>
  );
};
