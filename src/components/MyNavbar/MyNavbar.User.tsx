import {
  ActionIcon,
  Box,
  ColorSwatch,
  Group,
  Menu,
  ScrollArea,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useLogout } from "src/components/hooks";
import { COLORS } from "src/components/hooks/useColorScheme";
import { zIndexTable } from "src/components/zIndexTable";
import { Logout, Moon, Palette, Sun } from "tabler-icons-react";
import { Username } from "./MyNavbar.Username";

export const MyNavBar_User = () => {
  const theme = useMantineTheme();

  const toggleLogout = useLogout();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const isDark = colorScheme === "dark";

  return (
    <Box
      sx={{
        display: "block",
        width: "100%",
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
      }}
    >
      <Group>
        <Box sx={{ flex: 1 }}>
          <Username />
        </Box>

        <Group spacing="xs">
          <Menu
            transitionDuration={0}
            zIndex={zIndexTable.colorPicker}
            control={
              <ActionIcon
                variant={theme.other.variant}
                size="lg"
                radius="md"
                color={theme.primaryColor}
                component="button"
              >
                <Palette />
              </ActionIcon>
            }
          >
            <Menu.Label>主題顏色</Menu.Label>
            <ScrollArea style={{ height: "50vh" }}>
              {COLORS.map((color) => (
                <Menu.Item
                  key={color}
                  icon={<ColorSwatch color={theme.colors[color][6]} />}
                  //@ts-ignore
                  onClick={() => toggleColorScheme(undefined, color)}
                >
                  {color}
                </Menu.Item>
              ))}
            </ScrollArea>
          </Menu>

          <ActionIcon
            variant={theme.other.variant}
            size="lg"
            radius="md"
            color={theme.primaryColor}
            component="button"
            onClick={() => toggleColorScheme()}
          >
            {isDark ? <Sun /> : <Moon />}
          </ActionIcon>

          <ActionIcon
            variant={theme.other.variant}
            size="lg"
            radius="md"
            color={theme.primaryColor}
            onClick={() => toggleLogout()}
          >
            <Logout />
          </ActionIcon>
        </Group>
      </Group>
    </Box>
  );
};
