import { Divider, Navbar, ScrollArea, Text } from "@mantine/core";
import React from "react";
import { LogoutButton } from "../Buttons/LogoutButton";
import { Username } from "../Shared/Username";
import { MyNavbar_Items } from "./MyNavbar.Items";
import { MyNavbar_TestList } from "./MyNavbar.TestList";

interface Props {
  sideOpened: boolean;
  closeSide: () => void;
}

export const MyNavbar: React.FC<Props> = ({ sideOpened, closeSide }) => {
  return (
    <Navbar
      px="sm"
      hiddenBreakpoint="sm"
      hidden={!sideOpened}
      width={{ sm: 300, lg: 400 }}
    >
      <Navbar.Section
        m="sm"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Text my="auto">
          <Username />
        </Text>
        <LogoutButton />
      </Navbar.Section>

      <Divider mb="sm" />

      <Navbar.Section>
        <MyNavbar_Items closeSide={closeSide} />
      </Navbar.Section>

      <Divider my="sm" />

      <Navbar.Section grow component={ScrollArea}>
        <MyNavbar_TestList closeSide={closeSide} />
      </Navbar.Section>
    </Navbar>
  );
};
