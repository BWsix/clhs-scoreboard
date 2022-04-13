import { ExamMetaType } from "@clhs-scoreboard/lappland/lib/schemas/examMeta.schema";
import { createStyles, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import React, { Dispatch, SetStateAction, useState } from "react";

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    transition: "background-color 150ms ease",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[opened ? 5 : 6]
        : opened
        ? theme.colors.gray[0]
        : theme.white,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },

  icon: {
    transition: "transform 150ms ease",
    transform: opened ? "rotate(180deg)" : "rotate(0deg)",
  },
}));

interface Props {
  data: ExamMetaType[];
  setSelected: Dispatch<SetStateAction<ExamMetaType | null>>;
}
export function Picker({ data, setSelected }: Props) {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });

  const items = data.map((item) => (
    <Menu.Item onClick={() => setSelected(item)} key={item.url}>
      <Text size="sm" weight={500} sx={{ whiteSpace: "nowrap" }}>
        {item.displayName}
      </Text>
    </Menu.Item>
  ));

  return (
    <Menu
      size="lg"
      transition="pop"
      transitionDuration={150}
      placement="end"
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      control={
        <UnstyledButton className={classes.control}>
          <Group pr="sm">
            <span className={classes.label}>考試清單</span>
          </Group>
          <IconChevronDown size={16} className={classes.icon} />
        </UnstyledButton>
      }
    >
      {items}
    </Menu>
  );
}
