import { Container } from "@mantine/core";
// import { LoginPageForm } from "./Login.Form";
import { Updates } from "./Login.Updates";

export const Login: React.FC = () => {
  return (
    <Container size="xs">
      {/* <LoginPageForm /> */}
      <Updates />
    </Container>
  );
};
