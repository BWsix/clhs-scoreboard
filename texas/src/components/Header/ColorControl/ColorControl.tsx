import { ColorSwatch, Group, Popover, useMantineTheme } from "@mantine/core";
import { IconCheck, IconPalette } from "@tabler/icons";
import React, { useState } from "react";
import { MyActionIcon } from "src/components/Shared/ActionIcon";

interface ColorControlProps {
  onChange(color: string): void;
}

export function ColorControl({ onChange }: ColorControlProps) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const colors = Object.keys(theme.colors).map((color) => ({
    swatch: theme.colors[color][6],
    color,
  }));

  const swatches = colors.map(({ color, swatch }) => (
    <ColorSwatch
      component="button"
      type="button"
      onClick={() => onChange(color)}
      key={color}
      color={swatch}
      size={22}
      style={{ color: theme.white, cursor: "pointer" }}
    >
      {theme.primaryColor === color && <IconCheck size={18} />}
    </ColorSwatch>
  ));

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      transitionDuration={0}
      target={
        <MyActionIcon onClick={() => setOpened((o) => !o)}>
          <IconPalette />
        </MyActionIcon>
      }
      styles={{
        body: {
          width: 152,
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
        },
        arrow: {
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
        },
      }}
      position="bottom"
      placement="end"
      withArrow
      arrowSize={3}
    >
      <Group spacing="xs">{swatches}</Group>
    </Popover>
  );
}
