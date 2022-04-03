import { Group, UnstyledButton, useMantineTheme } from "@mantine/core";
import { Icon as IconType } from "tabler-icons-react";

export const ItemRow: React.FC<{ onClick: () => void; Icon: IconType }> = ({
  children,
  Icon,
  onClick: _onClick,
}) => {
  const theme = useMantineTheme();

  return (
    <UnstyledButton
      onClick={_onClick}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <Icon color={theme.colors[theme.primaryColor][5]} />
        {children}
      </Group>
    </UnstyledButton>
  );
};
