import { Title } from "@mantine/core";

interface Props {
  title: string;
}
export const AppShellContainerTitle: React.FC<Props> = ({ title }) => {
  return (
    <Title order={3} pb="sm">
      {title}
    </Title>
  );
};
