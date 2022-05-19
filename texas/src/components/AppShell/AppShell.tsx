import {
  AppShell,
  ColorSchemeProvider,
  Container,
  MantineProvider,
} from "@mantine/core";
import { useDisclosure, useScrollLock } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { MyHeader } from "src/components/Header/Header";
import { useColorScheme } from "src/components/hooks/useColorScheme";
import { usePreviousPage } from "src/components/hooks/usePreviousPage";
import { usePrimaryColor } from "src/components/hooks/usePrimaryColor";
import { MyNavbar } from "src/components/Navbar/Navbar";

interface Props {
  path: string;
  children: React.ReactNode;
}

export const PATHS_WITHOUT_APP_SHELL = ["/", "/goToPrev"];

export const MyAppShell: React.FC<Props> = ({ path, children }) => {
  usePreviousPage();

  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { primaryColor, setPrimaryColor } = usePrimaryColor();
  const [opened, { close, toggle }] = useDisclosure(false);
  const [_scrollLocked, setScrollLocked] = useScrollLock();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  useEffect(() => {
    setScrollLocked(opened);
  }, [opened]);

  const noAppShell = PATHS_WITHOUT_APP_SHELL.includes(path);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: mounted ? colorScheme : undefined,
          primaryColor: mounted ? primaryColor : undefined,
          other: { variant: colorScheme === "dark" ? "filled" : "outline" },
        }}
      >
        {noAppShell ? (
          <>{children}</>
        ) : (
          <AppShell
            padding="md"
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            header={
              <MyHeader
                opened={opened}
                toggleSide={toggle}
                setPrimaryColor={setPrimaryColor}
              />
            }
            navbar={<MyNavbar opened={opened} closeSide={close} />}
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
          >
            <Container p="xs" sx={{ height: "100%" }}>
              {children}
            </Container>
          </AppShell>
        )}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
