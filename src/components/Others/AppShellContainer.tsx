import { Container } from "@mantine/core";

export const AppShellContainer: React.FC = ({ children }) => {
  return (
    <Container p="xs" sx={{ height: "100%" }}>
      {children}
    </Container>
  );
};
