import { Container } from "@mantine/core";

export const AppShellContainer: React.FC = ({ children }) => {
  return (
    <Container my="sm" px="xs">
      {children}
    </Container>
  );
};
