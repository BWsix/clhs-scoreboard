import { Divider, Navbar, Text } from "@mantine/core";
import React from "react";
import { LogoutButton } from "../Buttons/LogoutButton";
import { Username } from "../Shared/Username";
import { MyNavbar_Items } from "./MyNavbar.Items";

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

      <MyNavbar_Items closeSide={closeSide} />
    </Navbar>
  );
};
