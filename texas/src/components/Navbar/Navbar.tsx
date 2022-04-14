import { Box, createStyles, Navbar, UnstyledButton } from "@mantine/core";
import {
  IconBook,
  IconCalendarEvent,
  IconDownload,
  IconExternalLink,
  IconFile,
  IconList,
  IconLogout,
  IconSpeakerphone,
  IconUser,
} from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useLogout } from "src/components/hooks/useLogout";
import { Username } from "./UserName/Username";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");

  const linkNoHover = {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
  };

  return {
    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    linkNoHover,

    link: {
      ...theme.fn.focusStyles(),
      ...linkNoHover,
      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color:
          theme.colorScheme === "dark"
            ? theme.white
            : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color:
            theme.colors[theme.primaryColor][
              theme.colorScheme === "dark" ? 5 : 7
            ],
        },
      },
    },
  };
});

const data = [
  { link: "/exams", label: "考試成績", icon: IconFile },
  { link: "/examOverall", label: "學期總成績", icon: IconList },
  { link: "/timetable", label: "課表", icon: IconBook },
  { link: "/news", label: "官網公告", icon: IconSpeakerphone },
  { link: "/calendar", label: "行事曆", icon: IconCalendarEvent },
  { link: "/installation", label: "安裝教學", icon: IconDownload },
];

interface Props {
  opened: boolean;
  closeSide: () => void;
}
export function MyNavbar({ opened, closeSide }: Props) {
  const router = useRouter();
  const logout = useLogout(true);
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(router.pathname);

  const links = data.map((item) => (
    <Link key={item.label} href={item.link} passHref>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: item.link === active,
        })}
        onClick={() => {
          setActive(item.link);
          closeSide();
        }}
      >
        <item.icon className={classes.linkIcon} />
        <span>{item.label}</span>
      </a>
    </Link>
  ));

  return (
    <Navbar width={{ sm: 250 }} p="md" hiddenBreakpoint="sm" hidden={!opened}>
      <Navbar.Section grow>{links}</Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Box className={classes.linkNoHover}>
          壢中成績查詢網站 <IconExternalLink color="gray" />
        </Box>

        <Box className={classes.linkNoHover}>
          <IconUser className={classes.linkIcon} />
          <Username />
        </Box>

        <UnstyledButton
          className={classes.link}
          sx={{ width: "100%" }}
          onClick={() => logout()}
        >
          <IconLogout className={classes.linkIcon} />

          <span>登出</span>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
}
