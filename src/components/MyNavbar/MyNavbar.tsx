import { Divider, Navbar, ScrollArea } from "@mantine/core";
import { MyNavbar_Items } from "./MyNavbar.Items";
import { MyNavBar_User } from "./MyNavbar.User";

interface Props {
  sideOpened: boolean;
  closeSide: () => void;
}

export const MyNavbar: React.FC<Props> = ({ sideOpened, closeSide }) => {
  return (
    <Navbar
      p="sm"
      hiddenBreakpoint="sm"
      hidden={!sideOpened}
      width={{ sm: 300, lg: 400 }}
    >
      <Navbar.Section grow component={ScrollArea}>
        <MyNavbar_Items closeSide={closeSide} />
      </Navbar.Section>

      <Divider mb="sm" />

      <Navbar.Section>
        <MyNavBar_User />
      </Navbar.Section>
    </Navbar>
  );
};
