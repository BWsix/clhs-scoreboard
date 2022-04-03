import { Box } from "@mantine/core";
import { MyHeader } from "src/components/MyHeader";
import { AppShellContainer } from "src/components/Others/AppShellContainer";
import { LoginPageForm } from "./LoginPage.Form";
import { Updates } from "./Updates";

export const LoginPage: React.FC = () => {
  return (
    <>
      <MyHeader noMenu opened toggleSide={() => {}} />

      <AppShellContainer>
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <LoginPageForm />
          <Updates />
        </Box>
      </AppShellContainer>
    </>
  );
};
