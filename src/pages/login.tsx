import {
  Alert,
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
import { useLoginMutation } from "src/hooks/useLoginMutation";
import { AlertCircle } from "tabler-icons-react";

const Login: NextPage = () => {
  const loginMutation = useLoginMutation();
  const form = useForm({
    initialValues: { id: "", password: "" },
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

        <Alert
          title="3/29 重大更新"
          radius="md"
          icon={<AlertCircle size={16} />}
          variant="outline"
          mt="md"
        >
          為了讓 CLHS Scoreboard 更加安全，用戶端自動登入功能已經被移除了。
          <br />
          <br />
          所有先前儲存在用戶端的資料皆刪除完畢 (
          不過這並不影響瀏覽器的密碼自動填入功能 )。
          <br />
          <br />
          往後使用 CLHS Scoreboard
          時會需要在大約閒置15~20分鐘後使用瀏覽器的密碼自動填入功能重新登入。
        </Alert>
      </Box>
    </Center>
  );
};

export default Login;
