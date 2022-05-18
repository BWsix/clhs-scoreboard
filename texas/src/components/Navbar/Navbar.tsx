import { ActionIcon, Box, Navbar, UnstyledButton } from "@mantine/core";
import {
  IconBook,
  IconCalendarEvent,
  IconDownload,
  IconExternalLink,
  IconApps,
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
import { useStyles } from "./Navbar.style";
import { Username } from "./UserName/Username";

const data = [
  { link: "/exams", label: "考試成績", icon: IconFile },
  { link: "/semester", label: "學期成績", icon: IconList },
  { link: "/timetable", label: "課表", icon: IconBook },
  { link: "/news", label: "官網公告", icon: IconSpeakerphone },
  { link: "/calendar", label: "行事曆", icon: IconCalendarEvent },
  { link: "/installation", label: "安裝教學", icon: IconDownload },
  { link: "/resources", label: "社群資源", icon: IconApps },
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
      <Navbar.Section grow>
        {links}

        <Box
          className={cx(classes.link)}
          style={{ cursor: "pointer" }}
          onClick={() => {
            closeSide();

            window.open("https://eschool.clhs.tyc.edu.tw/online/", "_blank");
          }}
        >
          <IconExternalLink className={classes.linkIcon} />
          <span>學校成績查詢系統</span>
        </Box>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
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
