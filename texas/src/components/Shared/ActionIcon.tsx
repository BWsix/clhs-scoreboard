import { ActionIcon } from "@mantine/core";

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
}

export const MyActionIcon: React.FC<Props> = ({ onClick, children }) => {
  return (
    <ActionIcon
      onClick={onClick}
      size="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color:
          theme.colorScheme === "dark"
            ? theme.colors[theme.primaryColor][4]
            : theme.colors[theme.primaryColor][6],
      })}
    >
      {children}
    </ActionIcon>
  );
};
