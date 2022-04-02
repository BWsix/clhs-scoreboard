import {
  Box,
  Button,
  LoadingOverlay,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { NextPage } from "next";
import { MyHeader } from "src/components/MyHeader";
import { AppShellContainer } from "src/components/Others/AppShellContainer";
import { LoginInfoCard } from "src/components/Others/LoginInfoCard";
import { useLoginMutation } from "src/hooks/useLoginMutation";

const Login: NextPage = () => {
  const loginMutation = useLoginMutation();
  const form = useForm({
    initialValues: { id: "", password: "" },
  });

  return (
    <>
      <MyHeader opened={true} toggleSide={() => {}} />
      <AppShellContainer>
        <Box sx={{ maxWidth: 300 }} mx="auto">
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

          <ScheduleUpdate />
          <SecurityUpdate />
        </Box>
      </AppShellContainer>
    </>
  );
};

export default Login;

function ScheduleUpdate() {
  return (
    <LoginInfoCard title="2022/4/2 功能更新">
      加入了課表查詢功能以及學校官網公告查詢功能。
    </LoginInfoCard>
  );
}

function SecurityUpdate() {
  return (
    <LoginInfoCard title="2022/3/29 安全性更新">
      為了讓 CLHS Scoreboard 更加安全，用戶端自動登入功能已經被移除了。
      <br />
      <br />
      所有先前儲存在用戶端的資料皆刪除完畢 (
      不過這並不影響瀏覽器的密碼自動填入功能 )。
      <br />
      <br />
      往後使用 CLHS Scoreboard
      時會需要在大約閒置15~20分鐘後使用瀏覽器的密碼自動填入功能重新登入。
    </LoginInfoCard>
  );
}
